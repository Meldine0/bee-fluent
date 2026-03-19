import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { cn } from '../components/ui/Button';
import { Check, Video, MapPin } from 'lucide-react';

const tiers = [
  {
    name: 'Séance Individuelle',
    id: 'tier-single',
    href: '/reservation?pack=single',
    price: '45',
    unit: '/ séance',
    description: 'Bilan de niveau, préparation d\'entretien ou besoin ponctuel.',
    features: ['1 heure de cours', 'Bilan de niveau', 'Correction en direct', 'Support de cours PDF'],
    mostPopular: false,
  },
  {
    name: 'Pack Intensif',
    id: 'tier-pack5',
    href: '/reservation?pack=5',
    price: '200',
    unit: '/ 5 séances',
    description: 'Le format parfait pour une progression régulière sur un mois.',
    features: [
      '5 heures de cours',
      'Programme personnalisé',
      'Exercices inter-séances',
      'Suivi de progression',
      'Support prioritaire',
    ],
    mostPopular: true,
  },
  {
    name: 'Immersion',
    id: 'tier-full',
    href: '/reservation?pack=full',
    price: '380',
    unit: '/ 10 séances',
    description: 'Une immersion totale pour franchir un cap décisif.',
    features: [
      '10 heures de cours',
      'Bilan initial complet',
      'Simulations d\'examens/entretiens',
      'Ressources exclusives',
      'Disponibilité WhatsApp 7j/7',
    ],
    mostPopular: false,
  },
];

export function Offers() {
  return (
    <div className="bg-[#FDFCF8] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
              Investissement
            </h2>
            <p className="mt-2 font-heading text-5xl font-extrabold tracking-tight text-[var(--color-bee-black)] sm:text-6xl leading-tight">
              Des tarifs simples. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-300">Sans engagement.</span>
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
                'rounded-[2rem] p-10 relative flex flex-col hover:-translate-y-1 transition-all duration-300'
              )}
            >
              {tier.mostPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] px-6 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm">
                  Le plus choisi
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
              <h2 className="font-heading text-3xl font-bold text-[var(--color-bee-black)]">
                Deux formats, la même exigence
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Choisissez le format qui s'adapte le mieux à votre quotidien.
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
                  Idéal pour les emplois du temps chargés, partout en France. Connectez-vous d'où vous voulez via Zoom ou Google Meet. Les sessions sont tout aussi interactives qu'en présentiel grâce à nos outils collaboratifs.
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
                  Pour une immersion totale et un contact humain privilégié. Retrouvez votre coach dans les Alpes-Maritimes pour une session d'échange naturel en face à face.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
