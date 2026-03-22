import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, ChevronRight, BookOpen, Target, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { questions } from '../data/questions';
import { saveLead } from '../lib/supabase';

type Step = 'intro' | 'quiz' | 'result';

const LEVEL_DATA = {
  'A1/A2': {
    label: 'A1/A2',
    name: 'Beginner',
    color: 'blue',
    title: 'You are A1/A2 – Beginner',
    explanation: 'Tu connais quelques mots, mais la grammaire et les structures de base restent fragiles. C\'est le meilleur moment pour construire des fondations solides, sans mauvaises habitudes.',
    trigger: 'La bonne nouvelle ? Avec la bonne méthode, les progrès à ce niveau arrivent vite. Vraiment vite. 🚀',
    pack: '/reservation?pack=full',
    packLabel: 'Démarrer l\'Immersion Totale',
  },
  'B1': {
    label: 'B1',
    name: 'Intermediate',
    color: 'yellow',
    title: 'You are B1 – Intermediate',
    explanation: 'Tu peux te débrouiller en anglais, mais les erreurs de grammaire et les expressions peu naturelles trahissent encore ton niveau. Tu es plus proche du B2 que tu ne le crois.',
    trigger: 'Tu es beaucoup plus proche du niveau suivant que tu ne le crois… 👀',
    pack: '/reservation?pack=5',
    packLabel: 'Démarrer le Pack Intensif',
  },
  'B2': {
    label: 'B2',
    name: 'Upper-Intermediate',
    color: 'orange',
    title: 'You are B2 – Upper-Intermediate',
    explanation: 'Tu maîtrises bien l\'anglais. Mais à l\'oral, il manque encore ce petit quelque chose : la fluidité, le naturel, l\'aisance spontanée. C\'est exactement là qu\'on intervient.',
    trigger: 'Le C1 est à portée de main. Il suffit de travailler les bons points. 🎯',
    pack: '/reservation?pack=5',
    packLabel: 'Démarrer le Pack Intensif',
  },
  'C1': {
    label: 'C1',
    name: 'Advanced',
    color: 'green',
    title: 'You are C1 – Advanced',
    explanation: 'Excellent niveau ! Tu maîtrises l\'anglais avec aisance. Quelques séances suffiront pour peaufiner ton accent, ta spontanéité et tes expressions idiomatiques.',
    trigger: 'Même les meilleurs ont une marge de progression. Et on adore travailler avec les bons niveaux 😉',
    pack: '/reservation?pack=single',
    packLabel: 'Réserver une séance découverte',
  },
};

function getLevel(score: number) {
  if (score <= 3) return LEVEL_DATA['A1/A2'];
  if (score <= 6) return LEVEL_DATA['B1'];
  if (score <= 8) return LEVEL_DATA['B2'];
  return LEVEL_DATA['C1'];
}

async function sendResultEmail(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  score: number,
  levelLabel: string,
  weakPoints: string[]
) {
  try {
    await fetch('https://formsubmit.co/ajax/contact@beefluent.fr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `🎯 Test de niveau — ${firstName} ${lastName} — ${levelLabel}`,
        Prénom: firstName,
        Nom: lastName,
        Email: email,
        Téléphone: phone || 'Non renseigné',
        Score: `${score}/10`,
        Niveau: levelLabel,
        'Points à travailler': weakPoints.join(', '),
        _template: 'table',
        _captcha: 'false',
      }),
    });
  } catch {
    // Silent fail — data already saved in Supabase
  }
}

export function LevelTest() {
  const [step, setStep] = useState<Step>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongCategories, setWrongCategories] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleStart = (e: FormEvent) => {
    e.preventDefault();
    setStep('quiz');
  };

  const handleAnswer = async (selectedIndex: number) => {
    const q = questions[currentIndex];
    const isCorrect = selectedIndex === q.correct;
    const newScore = isCorrect ? score + 1 : score;
    const newWrong = isCorrect ? wrongCategories : [...wrongCategories, q.category];

    if (currentIndex < questions.length - 1) {
      setScore(newScore);
      setWrongCategories(newWrong);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Last question — compute result and save
      setScore(newScore);
      setWrongCategories(newWrong);
      setSubmitting(true);
      const level = getLevel(newScore);
      const weakPoints = [...new Set(newWrong)].slice(0, 3);

      try {
        await saveLead({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          score: newScore,
          total: questions.length,
          level: `${level.label} – ${level.name}`,
        });
      } catch { /* silent */ }

      await sendResultEmail(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        newScore,
        `${level.label} – ${level.name}`,
        weakPoints
      );

      setSubmitting(false);
      setStep('result');
    }
  };

  const level = getLevel(score);
  const weakPoints = [...new Set(wrongCategories)].slice(0, 3);
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 flex items-start sm:items-center justify-center relative">
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-yellow-50/40 rounded-full blur-3xl" />

      <div className="max-w-3xl w-full relative z-10">
        <AnimatePresence mode="wait">

          {/* INTRO */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl border border-gray-100"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-50 mb-6">
                  <BookOpen className="h-8 w-8 text-yellow-700" />
                </div>
                <div className="inline-flex items-center gap-2 bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] px-4 py-1 rounded-full text-xs font-bold mb-4">
                  GRATUIT
                </div>
                <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-[var(--color-bee-black)] mb-3">
                  Testez votre niveau d'anglais
                </h1>
                <p className="text-gray-500 text-base sm:text-lg mb-4 max-w-xl mx-auto">
                  10 questions pour savoir exactement où vous en êtes, et ce qu'il faut travailler.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5"><Target className="h-4 w-4" /> 10 questions</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> ~3 minutes</span>
                </div>
              </div>

              <form onSubmit={handleStart} className="space-y-4 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData(f => ({ ...f, firstName: e.target.value }))}
                      placeholder="Jean"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData(f => ({ ...f, lastName: e.target.value }))}
                      placeholder="Dupont"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    placeholder="jean.dupont@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone <span className="text-gray-400 font-normal">(optionnel)</span></label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none text-sm"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-full shadow-lg shadow-yellow-500/15 mt-2">
                  Commencer mon test GRATUIT <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-center text-gray-400">
                  Vos résultats vous seront envoyés par email. Données sécurisées, jamais partagées.
                </p>
              </form>
            </motion.div>
          )}

          {/* QUIZ */}
          {step === 'quiz' && (
            <motion.div
              key={`quiz-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2rem] p-5 sm:p-8 md:p-12 shadow-xl border border-gray-100"
            >
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-3">
                  <span className="font-heading font-semibold">
                    Question {currentIndex + 1} <span className="text-gray-400 font-normal">sur {questions.length}</span>
                  </span>
                  <span className="bg-yellow-50 text-yellow-800 px-3 py-0.5 rounded-full text-xs font-bold">
                    {questions[currentIndex].category}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-[var(--color-bee-yellow)] to-yellow-500 h-2 rounded-full"
                    animate={{ width: `${(currentIndex / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-bee-black)] mb-6 leading-tight">
                {questions[currentIndex].question}
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => !submitting && handleAnswer(idx)}
                    disabled={submitting}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-xl border-2 border-gray-100 hover:border-[var(--color-bee-yellow)] hover:bg-yellow-50/50 transition-all duration-200 text-left group disabled:opacity-50"
                  >
                    <span className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[var(--color-bee-yellow)] text-gray-500 group-hover:text-[var(--color-bee-black)] flex items-center justify-center text-sm font-bold transition-colors duration-200 flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-[var(--color-bee-black)]">
                        {option}
                      </span>
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[var(--color-bee-yellow)] flex-shrink-0 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {submitting && (
                <p className="text-center text-sm text-gray-400 mt-6 animate-pulse">
                  Analyse de vos résultats…
                </p>
              )}
            </motion.div>
          )}

          {/* RESULT */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2rem] p-5 sm:p-8 md:p-10 shadow-xl border border-gray-100"
            >
              {/* Score + Level header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-8 pb-8 border-b border-gray-100">
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Votre score</span>
                  <div className="relative inline-flex items-center justify-center w-28 h-28">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#F3F4F6" strokeWidth="6" />
                      <motion.circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke="#FACC15"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: '0 264' }}
                        animate={{ strokeDasharray: `${percentage * 2.64} 264` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </svg>
                    <span className="font-heading text-3xl font-extrabold text-[var(--color-bee-black)]">
                      {score}<span className="text-base text-gray-400">/{questions.length}</span>
                    </span>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5 mb-3">
                    <span className="font-heading font-extrabold text-yellow-800">{level.label}</span>
                    <span className="text-yellow-700 text-sm">— {level.name}</span>
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-bee-black)] mb-2">
                    {level.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {level.explanation}
                  </p>
                </div>
              </div>

              {/* Weak points */}
              {weakPoints.length > 0 && (
                <div className="mb-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-bold text-gray-700">Your weak points :</span>
                  </div>
                  <ul className="space-y-1.5">
                    {weakPoints.map((wp, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        {wp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Psycho trigger */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/40 rounded-2xl p-5 mb-8 border border-yellow-100 text-center">
                <p className="font-heading font-bold text-[var(--color-bee-black)] text-base sm:text-lg">
                  {level.trigger}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={level.pack} className="flex-1">
                  <Button size="lg" className="w-full h-14 rounded-full shadow-lg shadow-yellow-500/15">
                    {level.packLabel} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/offres">
                  <Button variant="outline" size="lg" className="w-full h-14 px-6 rounded-full">
                    Voir tous les programmes
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-center text-gray-400 mt-5">
                Vos résultats ont été envoyés à votre adresse email.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
