import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { cn } from '../components/ui/Button';
import { Check, Video, MapPin, BadgePercent, ShieldCheck, Zap } from 'lucide-react';

const tiers = [
  {
    name: 'Séance Découverte',
    id: 'tier-single',
    href: '/reservation?pack=single',
    price: '60',
    cesuPrice: '30',
    unit: '/ séance',
    description: 'Idéal pour tester, pour un besoin ponctuel ou pour un enfant qui commence.',
    features: ['1 heure de coaching oral', 'Diagnostic de niveau', 'Correction en temps réel', 'Compte-rendu de séance'],
    mostPopular: false,
  },
  {
    name: 'Pack Intensif',
    id: 'tier-pack5',
    href: '/reservation?pack=5',
    price: '200',
    cesuPrice: '100',
    unit: '/ 5 séances',
    description: 'Ados, étudiants, adultes : la progression visible en moins d\'un mois.',
    features: [
      '5 heures de coaching',
      'Programme personnalisé selon l\'âge & l\'objectif',
      'Exercices ciblés entre chaque séance',
      'Suivi de progression détaillé',
      'Accès prioritaire aux créneaux',
    ],
    mostPopular: true,
  },
  {
    name: 'Immersion Totale',
    id: 'tier-full',
    href: '/reservation?pack=full',
    price: '380',
    cesuPrice: '190',
    unit: '/ 10 séances',
    description: 'Pour changer vraiment de niveau, à tout âge, avec ou sans bases.',
    features: [
      '10 heures de coaching',
      'Bilan initial approfondi',
      'Prépa exam, entretien ou voyage',
      'Ressources audio & écrit dédiées',
      'Disponible sur WhatsApp entre les séances',
    ],
    mostPopular: false,
  },
];

export function Offers() {
  return (
    <div className="bg-[#FDFCF8] py-12 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
              Investissement
            </h2>
            <p className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[var(--color-bee-black)] sm:text-5xl lg:text-6xl leading-tight">
              Un programme pour chaque âge.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-300">Un tarif pour chaque budget.</span>
            </p>
          </motion.div>
        </div>

        {/* CESU intro badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl mb-12"
        >
          <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="bg-green-100 rounded-xl p-2 flex-shrink-0">
              <BadgePercent className="h-6 w-6 text-green-700" />
            </div>
            <p className="text-green-800 text-sm leading-relaxed">
              <span className="font-bold">L'État prend en charge 50 % de vos séances.</span> Grâce au CESU et à l'avance immédiate du crédit d'impôt, vous ne payez que la moitié du prix — directement, sans attendre le remboursement.
            </p>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: tierIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                tier.mostPopular
                  ? 'bg-[var(--color-bee-black)] text-white shadow-2xl lg:scale-105 z-10'
                  : 'bg-white text-[var(--color-bee-black)] border border-gray-100 shadow-sm hover:shadow-lg',
                'rounded-[2rem] p-6 sm:p-10 relative flex flex-col hover:-translate-y-1 transition-all duration-300'
              )}
            >
              {tier.mostPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] px-6 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm whitespace-nowrap">
                  Le plus choisi
                </div>
              )}

              <div className="mb-6">
                <h3 id={tier.id} className="font-heading text-2xl font-bold mb-3">
                  {tier.name}
                </h3>
                <p className={cn(tier.mostPopular ? 'text-gray-400' : 'text-gray-500', 'text-sm leading-relaxed')}>
                  {tier.description}
                </p>
              </div>

              {/* Price block */}
              <div className="mb-6 pb-6 border-b border-opacity-20" style={{ borderColor: tier.mostPopular ? 'rgba(255,255,255,0.1)' : '#e5e7eb' }}>
                {/* Full price */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={cn(tier.mostPopular ? 'text-gray-500' : 'text-gray-400', 'text-lg line-through')}>
                    {tier.price}€
                  </span>
                  <span className={cn(tier.mostPopular ? 'text-gray-400' : 'text-gray-400', 'text-xs')}>
                    {tier.unit}
                  </span>
                </div>
                {/* CESU price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.cesuPrice}€</span>
                  <span className={cn(tier.mostPopular ? 'text-gray-400' : 'text-gray-500', 'text-sm')}>{tier.unit}</span>
                </div>
                {/* CESU label */}
                <div className={cn(
                  'mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full',
                  tier.mostPopular
                    ? 'bg-green-900/40 text-green-400'
                    : 'bg-green-50 text-green-700'
                )}>
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Après crédit d'impôt (avance immédiate)
                </div>
              </div>

              <ul role="list" className="space-y-3 text-sm leading-6 flex-1 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3 items-center">
                    <Check className={cn(
                      tier.mostPopular ? 'text-[var(--color-bee-yellow)]' : 'text-green-500',
                      'h-4 w-4 flex-shrink-0'
                    )} />
                    <span className={cn(tier.mostPopular ? 'text-gray-300' : 'text-gray-600')}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to={tier.href} aria-describedby={tier.id} className="mt-auto block w-full">
                <Button
                  variant={tier.mostPopular ? 'primary' : 'outline'}
                  className={cn(
                    'w-full h-14 text-lg rounded-full',
                    tier.mostPopular
                      ? 'shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30'
                      : 'hover:bg-[var(--color-bee-black)] hover:text-white'
                  )}
                >
                  Réserver
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CESU explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mx-auto max-w-4xl"
        >
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[var(--color-bee-yellow)] rounded-xl p-2">
                    <Zap className="h-5 w-5 text-[var(--color-bee-black)]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[var(--color-bee-black)]">
                    Pourquoi vous ne payez que la moitié ?
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nos cours sont déclarés via le <strong className="text-[var(--color-bee-black)]">CESU (Chèque Emploi Service Universel)</strong>, le dispositif officiel de l'État pour les services à la personne. À ce titre, vous bénéficiez d'un crédit d'impôt de <strong className="text-[var(--color-bee-black)]">50 % sur toutes vos séances</strong>.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Grâce à l'<strong className="text-[var(--color-bee-black)]">avance immédiate</strong>, ce crédit est déduit directement au moment du paiement. Vous ne faites pas l'avance des frais : vous réglez uniquement votre part nette, sans attendre votre déclaration d'impôts.
                </p>
              </div>
              <div className="sm:w-64 flex-shrink-0 w-full">
                <div className="bg-[#FDFCF8] rounded-2xl p-6 border border-gray-100 space-y-3">
                  {[
                    { label: 'Vous ne payez que', value: '50 %' },
                    { label: "Crédit d'impôt immédiat", value: '50 %' },
                    { label: 'Sans avance de frais', value: '✓' },
                    { label: 'Sans démarche', value: '✓' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-bold text-[var(--color-bee-black)]">{item.value}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Dispositif légal — article 199 sexdecies du Code général des impôts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 variantes marketing */}
            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Vous ne payez que…', example: '30€ la séance au lieu de 60€' },
                { label: "Après crédit d'impôt…", example: '100€ pour 5 séances complètes' },
                { label: 'Votre coût réel…', example: '190€ pour 10h de coaching' },
              ].map((v, i) => (
                <div key={i} className={cn(
                  'rounded-2xl p-4 text-center border',
                  i === 0
                    ? 'bg-[var(--color-bee-black)] border-transparent'
                    : i === 1
                    ? 'bg-yellow-50 border-yellow-100'
                    : 'bg-green-50 border-green-100'
                )}>
                  <p className={cn('text-xs font-bold uppercase tracking-wider mb-2', i === 0 ? 'text-[var(--color-bee-yellow)]' : i === 1 ? 'text-yellow-700' : 'text-green-700')}>
                    {v.label}
                  </p>
                  <p className={cn('text-sm font-semibold', i === 0 ? 'text-white' : 'text-gray-800')}>
                    {v.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Formats Section */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-xl sm:text-3xl font-bold text-[var(--color-bee-black)]">
                Où que vous soyez, on s'adapte
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                En visio depuis votre canapé ou en face à face dans les Alpes-Maritimes. La qualité du coaching est la même.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-64 w-full relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=800"
                  alt="Coaching en visioconférence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 text-sm font-medium shadow-sm">
                  <Video className="h-4 w-4 text-blue-600" />
                  Toute la France
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-3">Visioconférence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Disponible partout en France. Depuis votre bureau, votre salon ou en déplacement. On se connecte sur Zoom ou Google Meet, c'est aussi efficace qu'en présentiel et beaucoup plus flexible.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-64 w-full relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                  alt="Coaching en présentiel"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 text-sm font-medium shadow-sm">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Alpes-Maritimes
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-3">Présentiel</h3>
                <p className="text-gray-600 leading-relaxed">
                  Réservé aux Alpes-Maritimes. Si vous préférez le contact humain et la dynamique d'une vraie conversation face à face, c'est l'option faite pour vous.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
