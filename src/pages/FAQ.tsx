import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "Comment se déroulent les séances de coaching ?",
    answer: "Les séances se font en visioconférence (Zoom ou Google Meet) partout en France, ou en présentiel dans les Alpes-Maritimes. Elles sont 100% personnalisées et axées sur la pratique orale, avec des corrections en temps réel pour vous faire progresser rapidement."
  },
  {
    question: "Quelle est la méthode utilisée ?",
    answer: "Notre méthode est basée sur l'immersion et la pratique active. Fini les listes de vocabulaire interminables et la grammaire rébarbative, nous privilégions des mises en situation réelles pour vous faire parler dès la première séance."
  },
  {
    question: "Combien de temps faut-il pour voir des résultats ?",
    answer: "Les premiers blocages sautent souvent dès les 3 premières séances. Pour une progression significative et durable, nous recommandons un accompagnement régulier sur 2 à 3 mois."
  },
  {
    question: "Quel niveau faut-il avoir pour commencer ?",
    answer: "Nos coachings s'adaptent à tous les niveaux, du grand débutant à l'utilisateur avancé souhaitant perfectionner son accent, sa fluidité ou son vocabulaire professionnel."
  },
  {
    question: "Puis-je annuler ou reporter une séance ?",
    answer: "Oui, vous pouvez reporter une séance gratuitement jusqu'à 24h à l'avance en nous contactant par email."
  },
  {
    question: "Est-ce que la formation est éligible au CPF ?",
    answer: "Pour le moment, nos coachings ne sont pas éligibles au CPF. Ce choix nous permet de garder une flexibilité totale sur notre méthode et nos tarifs, sans les contraintes administratives imposées par l'État."
  },
  {
    question: "Préparez-vous aux examens comme le TOEIC ou le TOEFL ?",
    answer: "Absolument. Nous pouvons axer les séances sur la préparation spécifique de ces examens, en travaillant la méthodologie, la gestion du temps et les compétences requises."
  },
  {
    question: "Faites-vous de la préparation aux entretiens d'embauche ?",
    answer: "Oui, c'est l'une de nos spécialités. Nous faisons des simulations d'entretiens, travaillons votre pitch de présentation et anticipons les questions pièges en anglais pour vous donner confiance le jour J."
  },
  {
    question: "Dois-je faire des devoirs entre les séances ?",
    answer: "Rien n'est obligatoire, mais nous le recommandons fortement pour maximiser vos résultats. Nous vous fournissons des ressources ciblées (podcasts, articles, vidéos courtes) pour maintenir une immersion quotidienne de 10 à 15 minutes."
  },
  {
    question: "Enseignez-vous l'anglais britannique ou américain ?",
    answer: "Nos coachs maîtrisent les deux accents et vocabulaires. Nous nous adaptons à vos objectifs : si vous travaillez principalement avec des Américains, nous privilégierons l'anglais US."
  },
  {
    question: "Puis-je enregistrer les séances ?",
    answer: "Oui, avec l'accord de votre coach, vous pouvez enregistrer les séances sur Zoom ou Google Meet. C'est un excellent moyen de vous réécouter, de noter vos erreurs et de travailler votre prononciation."
  },
  {
    question: "Comment se passe le paiement ?",
    answer: "Le paiement s'effectue en ligne de manière totalement sécurisée par carte bancaire (via Stripe). Pour les packs de plusieurs séances, un paiement en plusieurs fois sans frais est possible."
  },
  {
    question: "Puis-je changer de coach si le feeling ne passe pas ?",
    answer: "Bien sûr. L'alliance pédagogique (le 'feeling') est cruciale pour progresser et oser parler. Si besoin, nous vous proposerons un autre coach de notre équipe sans aucun frais supplémentaire."
  },
  {
    question: "Fournissez-vous du matériel pédagogique ?",
    answer: "Oui, tous les supports de cours, fiches de vocabulaire personnalisées et exercices vous sont partagés via un espace Notion dédié auquel vous avez accès à vie."
  },
  {
    question: "Est-ce que je peux prendre des cours le week-end ?",
    answer: "Nos coachs ont des plannings très flexibles. Certains proposent des créneaux le samedi matin ou en fin de journée, selon leurs disponibilités et votre fuseau horaire."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FDFCF8] min-h-screen pt-20 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-extrabold text-[var(--color-bee-black)] mb-6"
          >
            Foire Aux Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Tout ce que vous devez savoir sur nos cours et notre méthode.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto mb-12"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent shadow-sm transition-all"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
          />
        </motion.div>

        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">Aucune question ne correspond à votre recherche.</p>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'border-[var(--color-bee-yellow)] shadow-md shadow-yellow-500/5'
                    : 'border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="flex items-center gap-4">
                    <span className={`font-heading text-sm font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      openIndex === index
                        ? 'bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)]'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-heading font-semibold text-lg text-[var(--color-bee-black)]">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-all duration-300 flex-shrink-0 ml-4 ${
                      openIndex === index ? 'rotate-180 text-[var(--color-bee-yellow)]' : 'group-hover:text-gray-600'
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pl-[4.5rem] text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-white rounded-3xl p-10 border border-gray-100 shadow-sm"
        >
          <MessageCircle className="h-10 w-10 text-[var(--color-bee-yellow)] mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold text-[var(--color-bee-black)] mb-3">
            Vous n'avez pas trouvé votre réponse ?
          </h3>
          <p className="text-gray-600 mb-6">Contactez-nous directement, on vous répond sous 24h.</p>
          <Link to="mailto:hello@beefluent.fr">
            <Button variant="outline" className="rounded-full px-8">
              Nous écrire
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
