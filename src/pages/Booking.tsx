import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays, startOfToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Video, MapPin, Clock, CheckCircle2, Sparkles, Loader2, X, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { saveBooking, getBookedSlots } from '../lib/supabase';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_TIMES = ['09:00', '10:30', '14:00', '15:30', '17:00'];

const PACKS: Record<string, { name: string; sessions: number; price: string; cesuPrice: string; unit: string; description: string; features: string[]; popular: boolean }> = {
  single: {
    name: 'Séance Découverte',
    sessions: 1,
    price: '60€',
    cesuPrice: '30€',
    unit: '/ séance',
    description: 'Pour tester, ou pour un besoin ponctuel.',
    features: ['1 heure de coaching oral', 'Diagnostic de niveau', 'Correction en direct', 'Compte-rendu de séance'],
    popular: false,
  },
  '5': {
    name: 'Pack Intensif',
    sessions: 5,
    price: '200€',
    cesuPrice: '100€',
    unit: '/ 5 séances',
    description: 'Des résultats visibles en moins d\'un mois.',
    features: ['5 heures de coaching', 'Programme personnalisé', 'Exercices entre séances', 'Suivi de progression'],
    popular: true,
  },
  full: {
    name: 'Immersion Totale',
    sessions: 10,
    price: '380€',
    cesuPrice: '190€',
    unit: '/ 10 séances',
    description: 'Pour changer vraiment de niveau.',
    features: ['10 heures de coaching', 'Bilan initial complet', 'Prépa exam / entretien', 'WhatsApp entre les séances'],
    popular: false,
  },
};

interface DaySlot {
  date: Date;
  times: string[];
}

interface SelectedSlot {
  date: Date;
  time: string;
}

export function Booking() {
  const [searchParams] = useSearchParams();
  const initialPackKey = searchParams.get('pack');

  const [packKey, setPackKey] = useState<string>(initialPackKey || 'single');
  const pack = PACKS[packKey] || PACKS.single;

  // Step 0 = choix du forfait, 1 = calendrier, 2 = confirmation, 3 = succès
  const [step, setStep] = useState<0 | 1 | 2 | 3>(initialPackKey ? 1 : 0);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [sessionType, setSessionType] = useState<'visio' | 'presentiel'>('visio');
  const [formFields, setFormFields] = useState({ firstName: '', lastName: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [slots, setSlots] = useState<DaySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const allSlotsFilled = selectedSlots.length >= pack.sessions;

  // Set de créneaux sélectionnés pour lookup rapide
  const selectedSet = useMemo(
    () => new Set(selectedSlots.map((s) => `${format(s.date, 'yyyy-MM-dd')}_${s.time}`)),
    [selectedSlots]
  );

  useEffect(() => {
    loadSlots();
  }, [weekOffset]);

  async function loadSlots() {
    setLoading(true);
    setLoadError(false);
    const today = startOfToday();
    const start = addDays(today, weekOffset * 7);
    const end = addDays(start, 6);

    const startStr = format(start, 'yyyy-MM-dd');
    const endStr = format(end, 'yyyy-MM-dd');

    let booked: { session_date: string; session_time: string }[] = [];
    try {
      booked = await getBookedSlots(startStr, endStr);
    } catch (err) {
      console.error('Error loading slots:', err);
      setLoadError(true);
    }

    const bookedSet = new Set(
      booked.map((b) => `${b.session_date}_${b.session_time}`)
    );

    const days: DaySlot[] = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(start, i);
      const dayOfWeek = date.getDay();
      const dateStr = format(date, 'yyyy-MM-dd');
      const isPast = date < today;

      if (dayOfWeek === 0 || dayOfWeek === 6 || isPast) {
        days.push({ date, times: [] });
      } else {
        const now = new Date();
        const isToday = dateStr === format(now, 'yyyy-MM-dd');

        const availableTimes = DEFAULT_TIMES.filter((time) => {
          if (bookedSet.has(`${dateStr}_${time}`)) return false;
          if (isToday) {
            const [h, m] = time.split(':').map(Number);
            const slotMinutes = h * 60 + m;
            const nowMinutes = now.getHours() * 60 + now.getMinutes();
            if (slotMinutes - nowMinutes < 120) return false;
          }
          return true;
        });
        days.push({ date, times: availableTimes });
      }
    }
    setSlots(days);
    setLoading(false);
  }

  const handleSlotToggle = (date: Date, time: string) => {
    const key = `${format(date, 'yyyy-MM-dd')}_${time}`;

    if (selectedSet.has(key)) {
      // Désélectionner
      setSelectedSlots((prev) =>
        prev.filter((s) => `${format(s.date, 'yyyy-MM-dd')}_${s.time}` !== key)
      );
    } else if (!allSlotsFilled) {
      // Sélectionner
      setSelectedSlots((prev) => [...prev, { date, time }]);
    }
  };

  const removeSlot = (index: number) => {
    setSelectedSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedSlots.length === 0) return;
    setSaving(true);
    try {
      // Enregistrer chaque créneau
      for (const slot of selectedSlots) {
        await saveBooking({
          first_name: formFields.firstName,
          last_name: formFields.lastName,
          email: formFields.email,
          session_date: format(slot.date, 'yyyy-MM-dd'),
          session_time: slot.time,
          format: sessionType,
        });
      }
      // Retirer les créneaux localement
      const bookedKeys = new Set(
        selectedSlots.map((s) => `${format(s.date, 'yyyy-MM-dd')}_${s.time}`)
      );
      setSlots((prev) =>
        prev.map((day) => ({
          ...day,
          times: day.times.filter(
            (t) => !bookedKeys.has(`${format(day.date, 'yyyy-MM-dd')}_${t}`)
          ),
        }))
      );
    } catch (err) {
      console.error('Booking save error:', err);
    } finally {
      setSaving(false);
      setStep(3);
    }
  };

  // Trier les créneaux sélectionnés par date/heure
  const sortedSlots = [...selectedSlots].sort((a, b) => {
    const da = format(a.date, 'yyyy-MM-dd') + a.time;
    const db = format(b.date, 'yyyy-MM-dd') + b.time;
    return da.localeCompare(db);
  });

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-6 pt-24 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Step 0 — Choix du forfait */}
        <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-8 sm:mb-10">
              <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-bee-black)] mb-3 sm:mb-4">
                Choisissez votre programme
              </h1>
              <p className="text-lg text-gray-500">Sélectionnez le forfait qui vous correspond avant de choisir vos créneaux.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {(Object.entries(PACKS) as [string, typeof PACKS[string]][]).map(([key, p]) => {
                const isSelected = packKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPackKey(key)}
                    className={`relative text-left rounded-3xl p-5 sm:p-8 border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-[var(--color-bee-yellow)] bg-[var(--color-bee-black)] text-white shadow-xl'
                        : 'border-gray-200 bg-white hover:border-yellow-300 hover:shadow-md'
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] text-xs font-bold px-4 py-1 rounded-full">
                        Le plus choisi
                      </span>
                    )}
                    <div className="mb-4">
                      <h3 className={`font-heading text-xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-[var(--color-bee-black)]'}`}>
                        {p.name}
                      </h3>
                      <p className={`text-sm ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>{p.description}</p>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`text-4xl font-extrabold font-heading ${isSelected ? 'text-[var(--color-bee-yellow)]' : 'text-[var(--color-bee-black)]'}`}>
                          {p.cesuPrice}
                        </span>
                        <span className={`text-sm ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>{p.unit}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        <span className={`text-sm line-through ${isSelected ? 'text-gray-500' : 'text-gray-400'}`}>{p.price}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700'}`}>
                          après crédit d'impôt
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-[var(--color-bee-yellow)]' : 'text-green-500'}`} />
                          <span className={isSelected ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {isSelected && (
                      <div className="mt-6 flex items-center gap-2 text-[var(--color-bee-yellow)] text-sm font-bold">
                        <CheckCircle2 className="h-4 w-4" /> Forfait sélectionné
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => { setSelectedSlots([]); setStep(1); }}
                className="h-14 px-12 text-lg rounded-full shadow-lg shadow-yellow-500/15"
              >
                Choisir mes créneaux →
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {step > 0 && (
        <>
        {/* Pack info + bouton modifier */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex flex-col items-center gap-1">
            <span className="inline-flex items-center gap-2 bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] px-5 py-2 rounded-full text-sm font-bold shadow-sm">
              {pack.name} — {pack.sessions} {pack.sessions > 1 ? 'séances' : 'séance'}
            </span>
            <span className="text-xs text-gray-500">
              <span className="line-through text-gray-400">{pack.price}</span>
              {' '}→ <span className="font-bold text-green-600">{pack.cesuPrice}</span> après crédit d'impôt
            </span>
          </div>
          {step < 3 && (
            <button
              onClick={() => { setStep(0); setSelectedSlots([]); }}
              className="text-sm text-gray-400 hover:text-gray-700 underline transition-colors"
            >
              Changer
            </button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= s
                  ? 'bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)]'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-0.5 rounded-full transition-all duration-300 ${
                  step > s ? 'bg-[var(--color-bee-yellow)]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">

          {/* Left Column - Profile + Selected Slots */}
          <div className="md:w-1/3 bg-gradient-to-b from-gray-50 to-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
            <div className="h-48 w-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                alt="Session de coaching"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h2 className="font-heading text-2xl font-bold">Sarah Beale</h2>
                  <p className="text-sm font-medium opacity-90">Professeure d'anglais certifiée</p>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1">
              <div className="w-full space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-xl">
                    <Video className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Visioconférence</p>
                    <p className="text-xs text-gray-500 mt-0.5">Toute la France</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-red-50 p-2 rounded-xl">
                    <MapPin className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Présentiel</p>
                    <p className="text-xs text-gray-500 mt-0.5">Alpes-Maritimes (06)</p>
                  </div>
                </div>
              </div>

              {/* Selected slots recap */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm font-bold text-[var(--color-bee-black)] mb-3">
                  Créneaux choisis ({selectedSlots.length}/{pack.sessions})
                </p>
                {selectedSlots.length === 0 ? (
                  <p className="text-xs text-gray-400">Aucun créneau sélectionné</p>
                ) : (
                  <div className="space-y-2">
                    {sortedSlots.map((slot, i) => (
                      <div key={i} className="flex items-center justify-between bg-yellow-50 rounded-lg px-3 py-2 text-sm">
                        <span className="text-yellow-900 font-medium capitalize">
                          {format(slot.date, 'EEE d MMM', { locale: fr })} — {slot.time}
                        </span>
                        {step === 1 && (
                          <button
                            onClick={() => removeSlot(selectedSlots.indexOf(slot))}
                            className="text-yellow-600 hover:text-red-500 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[var(--color-bee-yellow)] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(selectedSlots.length / pack.sessions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Flow */}
          <div className="md:w-2/3 p-4 sm:p-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-2xl font-bold text-[var(--color-bee-black)]">
                    {allSlotsFilled
                      ? 'Tous les créneaux sont choisis !'
                      : `Choisissez ${pack.sessions > 1 ? 'vos' : 'votre'} ${pack.sessions > 1 ? pack.sessions + ' créneaux' : 'créneau'}`
                    }
                  </h3>
                </div>
                {pack.sessions > 1 && (
                  <p className="text-sm text-gray-500 mb-6">
                    Sélectionnez {pack.sessions} créneaux sur une ou plusieurs semaines. Vous pouvez naviguer entre les semaines.
                  </p>
                )}
                {pack.sessions === 1 && <div className="mb-6" />}

                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => weekOffset > 0 && setWeekOffset(w => w - 1)}
                    disabled={weekOffset === 0}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="font-heading font-semibold text-gray-900 capitalize">
                    {slots.length > 0 && format(slots[0].date, 'MMMM yyyy', { locale: fr })}
                  </span>
                  <button
                    onClick={() => setWeekOffset(w => w + 1)}
                    disabled={weekOffset >= 4}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {loadError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    Impossible de charger les réservations existantes. Certains créneaux affichés peuvent déjà être pris.
                  </div>
                )}

                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    <span className="ml-3 text-gray-500">Chargement des disponibilités...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-1 sm:gap-2">
                    {slots.map((day, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                          {format(day.date, 'EEE', { locale: fr })}
                        </div>
                        <div className="text-sm font-bold text-gray-900 mb-4">
                          {format(day.date, 'dd')}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          {day.times.length > 0 ? (
                            day.times.map((time) => {
                              const key = `${format(day.date, 'yyyy-MM-dd')}_${time}`;
                              const isSelected = selectedSet.has(key);
                              const isDisabled = allSlotsFilled && !isSelected;

                              return (
                                <button
                                  key={time}
                                  onClick={() => handleSlotToggle(day.date, time)}
                                  disabled={isDisabled}
                                  className={`py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    isSelected
                                      ? 'bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] shadow-sm ring-2 ring-yellow-400'
                                      : isDisabled
                                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                      : 'bg-yellow-50 text-yellow-800 hover:bg-[var(--color-bee-yellow)] hover:text-[var(--color-bee-black)] hover:shadow-sm'
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })
                          ) : (
                            <div className="text-xs text-gray-300 text-center py-2">—</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Continue button */}
                <div className="mt-8">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!allSlotsFilled}
                    className={`w-full h-12 text-lg rounded-xl transition-all duration-300 ${
                      allSlotsFilled ? 'shadow-lg shadow-yellow-500/10' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    Continuer ({selectedSlots.length}/{pack.sessions})
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-6 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" /> Modifier les créneaux
                </button>

                <h3 className="font-heading text-2xl font-bold text-[var(--color-bee-black)] mb-2">
                  Confirmer la réservation
                </h3>

                <div className="mb-6 space-y-2">
                  {sortedSlots.map((slot, i) => (
                    <div key={i} className="flex items-center gap-2 text-yellow-800 font-medium bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="capitalize text-sm">{format(slot.date, 'EEEE d MMMM', { locale: fr })} à {slot.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleConfirm} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format du cours</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setSessionType('visio')}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all duration-200 ${
                          sessionType === 'visio'
                            ? 'border-[var(--color-bee-yellow)] bg-yellow-50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Video className={`h-6 w-6 ${sessionType === 'visio' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium">Visioconférence</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSessionType('presentiel')}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all duration-200 ${
                          sessionType === 'presentiel'
                            ? 'border-[var(--color-bee-yellow)] bg-yellow-50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <MapPin className={`h-6 w-6 ${sessionType === 'presentiel' ? 'text-red-500' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium">Présentiel</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input type="text" id="firstName" required value={formFields.firstName} onChange={e => setFormFields(f => ({...f, firstName: e.target.value}))} className="w-full rounded-xl border-gray-200 border p-3 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input type="text" id="lastName" required value={formFields.lastName} onChange={e => setFormFields(f => ({...f, lastName: e.target.value}))} className="w-full rounded-xl border-gray-200 border p-3 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none transition-all" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" required value={formFields.email} onChange={e => setFormFields(f => ({...f, email: e.target.value}))} className="w-full rounded-xl border-gray-200 border p-3 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none transition-all" />
                  </div>

                  <Button type="submit" disabled={saving} className="w-full h-12 text-lg rounded-xl shadow-lg shadow-yellow-500/10">
                    {saving ? 'Enregistrement...' : `Valider ${pack.sessions > 1 ? `les ${pack.sessions} séances` : 'la réservation'}`}
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                  <Sparkles className="h-5 w-5 text-[var(--color-bee-yellow)] absolute -top-1 -right-1" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-[var(--color-bee-black)] mb-4">
                  Réservation confirmée !
                </h3>
                <p className="text-gray-600 max-w-md mb-4">
                  {pack.sessions > 1
                    ? `Vos ${pack.sessions} séances ont bien été réservées :`
                    : 'Votre cours est programmé :'
                  }
                </p>
                <div className="space-y-1 mb-6">
                  {sortedSlots.map((slot, i) => (
                    <p key={i} className="text-gray-900 font-medium capitalize">
                      {format(slot.date, 'EEEE d MMMM', { locale: fr })} à {slot.time}
                    </p>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mb-8">
                  Vous recevrez un email de confirmation dans les prochaines heures avec tous les détails.
                </p>
                <Button onClick={() => window.location.href = '/'} variant="outline" className="rounded-full px-8">
                  Retour à l'accueil
                </Button>
              </motion.div>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
