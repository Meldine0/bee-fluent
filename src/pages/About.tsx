import { motion } from 'motion/react';
import { Quote, Heart, BookOpen, MessageCircle } from 'lucide-react';

export function About() {
  return (
    <div className="bg-[#FDFCF8]">
      {/* Hero */}
      <div className="py-12 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-0">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:pr-8 lg:pt-4 flex flex-col justify-center"
              >
                <div className="lg:max-w-lg">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                    Pourquoi Bee Fluent
                  </h2>
                  <p className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-[var(--color-bee-black)] sm:text-4xl lg:text-5xl leading-tight">
                    L'anglais pour tous — du CP au monde professionnel.
                  </p>

                  <div className="mt-6 sm:mt-10 space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-gray-600">
                    <p>
                      J'accompagne des enfants dès 7 ans, des ados qui préparent leur brevet ou leur bac, des étudiants en école de commerce, et des adultes qui veulent progresser dans leur carrière ou partir à l'étranger. Ce qui les relie ? Ils veulent tous parler — vraiment parler — et pas juste cocher des cases.
                    </p>
                    <p>
                      J'ai créé Bee Fluent parce que le système scolaire apprend à analyser la langue, pas à la vivre. Peu importe l'âge, la méthode est la même : on parle, on pratique, on construit des automatismes. Ce qui change, c'est le rythme, le ton et les exercices — adaptés à chaque profil.
                    </p>
                    <p className="font-medium text-[var(--color-bee-black)] border-l-4 border-[var(--color-bee-yellow)] pl-6">
                      Je ne suis pas là pour noter. Je suis là pour donner confiance — que vous ayez 8 ans ou 45 ans.
                    </p>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 ring-2 ring-[var(--color-bee-yellow)] ring-offset-2">
                        <img
                          src="/sarah.jpeg"
                          alt="Sarah Beale, Fondatrice"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-xl text-[var(--color-bee-black)]">Sarah Beale</p>
                        <p className="text-gray-500">Coach & Fondatrice de Bee Fluent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center lg:justify-end relative"
              >
                <div className="relative w-full max-w-lg">
                  {/* Decorative shape behind photo */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-[2.5rem] -rotate-2" />

                  <div className="relative aspect-[3/4] rounded-[2rem] bg-gray-50 object-cover shadow-2xl overflow-hidden border border-gray-100 img-zoom">
                    <img
                      src="/sarah.jpeg"
                      alt="Professeure d'anglais"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Floating Quote */}
                  <div className="absolute -bottom-10 -left-10 bg-[var(--color-bee-black)] text-white p-8 rounded-[2rem] shadow-xl max-w-xs hidden sm:block">
                    <Quote className="h-8 w-8 text-[var(--color-bee-yellow)] mb-4 opacity-50" />
                    <p className="font-heading font-bold text-2xl mb-2 leading-snug">
                      Si vous ne faites pas d'erreurs, vous n'apprenez pas.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 block">La différence Bee Fluent</span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[var(--color-bee-black)]">
              Pas un cours standard. Un coaching sur-mesure.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "On parle dès la 1ère minute",
                desc: "Enfants, ados, adultes — tout le monde parle dès qu'on commence. Pas de slides, pas de théorie. On apprend en faisant.",
              },
              {
                icon: Heart,
                title: "Zéro jugement, quel que soit l'âge",
                desc: "Un enfant de 8 ans ou un adulte de 50 ans — tout le monde a le droit de se tromper, d'hésiter, de recommencer. C'est ça qui fait progresser.",
              },
              {
                icon: BookOpen,
                title: "Adapté à chaque profil",
                desc: "Bac, TOEIC, entretien, voyage, curiosité — le programme change selon l'objectif. L'âge n'est jamais un obstacle.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-50 mb-6 group-hover:bg-[var(--color-bee-yellow)] transition-colors duration-300">
                  <value.icon className="h-7 w-7 text-yellow-700 group-hover:text-[var(--color-bee-black)] transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[var(--color-bee-black)] mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
