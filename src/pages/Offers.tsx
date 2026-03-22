import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { cn } from '../components/ui/Button';
import { Check, Video, MapPin } from 'lucide-react';

const tiers = [
  {
    name: 'Séance Découverte',
    id: 'tier-single',
    href: '/reservation?pack=single',
    price: '30',
    originalPrice: '60',
    unit: '/ séance',
    description: 'Idéal pour tester, pour un besoin ponctuel ou pour un enfant qui commence.',
    features: ['1 heure de coaching oral', 'Diagnostic de niveau', 'Correction en temps réel', 'Compte-rendu de séance'],
    mostPopular: false,
    promo: 'Offre de lancement',
  },
  {
    name: 'Pack Intensif',
    id: 'tier-pack5',
    href: '/reservation?pack=5',
    price: '200',
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
    unit: '/ 10 séances',
    description: 'Pour changer vraiment de niveau — à tout âge, avec ou sans bases.',
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
        <div className="mx-auto max-w-3xl text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
              Investissement
            </h2>
            <p className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[var(--color-bee-black)] sm:text-5xl lg:text-6xl leading-tight">
              Un programme pour chaque âge. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-300">Un tarif pour chaque budget.</span>
            </p>
          </motion.div>
        </div>

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
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] px-6 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm">
                  Le plus choisi
                </div>
              )}
              {'promo' in tier && tier.promo && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm whitespace-nowrap">
                  {tier.promo}
                </div>
              )}

              <div className="mb-8">
                <h3 id={tier.id} className="font-heading text-2xl font-bold mb-4">
                  {tier.name}
                </h3>
                <p className={cn(tier.mostPopular ? 'text-gray-400' : 'text-gray-500', "text-sm leading-relaxed h-12")}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-8 editorial-divider pb-8 border-opacity-20">
                {'originalPrice' in tier && tier.originalPrice && (
                  <span className={cn(tier.mostPopular ? 'text-gray-500' : 'text-gray-400', "line-through text-2xl mr-2")}>{tier.originalPrice}€</span>
                )}
                <span className="text-5xl font-extrabold tracking-tight">{tier.price}€</span>
                <span className={cn(tier.mostPopular ? 'text-gray-500' : 'text-gray-400', "text-sm ml-2")}>{tier.unit}</span>
              </div>

              <ul role="list" className="space-y-4 text-sm leading-6 flex-1 mb-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3 items-center">
                    <Check className={cn(
                      tier.mostPopular ? 'text-[var(--color-bee-yellow)]' : 'text-green-500',
                      "h-4 w-4 flex-shrink-0"
                    )} />
                    <span className={cn(tier.mostPopular ? 'text-gray-300' : 'text-gray-600')}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to={tier.href}
                aria-describedby={tier.id}
                className="mt-auto block w-full"
              >
                <Button
                  variant={tier.mostPopular ? 'primary' : 'outline'}
                  className={cn(
                    "w-full h-14 text-lg rounded-full",
                    tier.mostPopular ? "shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30" : "hover:bg-[var(--color-bee-black)] hover:text-white"
                  )}
                >
                  Réserver
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Formats Section */}
        <div className="mt-32">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-xl sm:text-3xl font-bold text-[var(--color-bee-black)]">
                Où que vous soyez, on s'adapte
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                En visio depuis votre canapé ou en face à face dans les Alpes-Maritimes — la qualité du coaching est la même.
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
                  Disponible partout en France. Depuis votre bureau, votre salon ou en déplacement. On se connecte sur Zoom ou Google Meet — c'est aussi efficace qu'en présentiel, et beaucoup plus flexible.
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
