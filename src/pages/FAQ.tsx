import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "Comment se passe une séance concrètement ?",
    answer: "On se connecte sur Zoom ou Google Meet (ou on se retrouve en Alpes-Maritimes pour le présentiel). Pas de slides ni de théorie. On parle. Je vous propose des situations réelles — entretien, réunion, voyage, quotidien — et je vous corrige en temps réel, avec bienveillance. Chaque séance est différente parce qu'elle est construite autour de ce dont vous avez besoin ce jour-là."
  },
  {
    question: "C'est quoi la méthode Bee Fluent ?",
    answer: "Simple : vous parlez, je corrige. 80% du temps c'est vous qui êtes à l'oral. On reproduit des situations concrètes, on travaille vos automatismes, on déconstruit vos blocages. Zéro liste de vocabulaire à apprendre par cœur, zéro grammaire à recopier. On apprend comme on a appris sa langue maternelle : en pratiquant."
  },
  {
    question: "Combien de temps avant de voir des résultats ?",
    answer: "La plupart des élèves ressentent un déclic dès la 2e ou 3e séance. Pas une révolution, mais une vraie différence : on hésite moins, on cherche moins ses mots, on se lance. Pour une progression solide et durable, comptez 6 à 10 séances régulières."
  },
  {
    question: "À partir de quel âge peut-on commencer ?",
    answer: "On accompagne des enfants dès 7 ans. Les séances pour les plus jeunes sont courtes (30 à 45 min), dynamiques, et basées sur le jeu et l'écoute — pas de grammaire imposée. Pour les ados, on s'adapte à leurs centres d'intérêt pour que les séances ne ressemblent pas à un cours classique."
  },
  {
    question: "Je suis débutant, est-ce que c'est fait pour moi ?",
    answer: "Oui, complètement. Que vous ayez 10 ans ou 50 ans, que vous partiez de zéro ou que vous ayez des bases à consolider — on part de là où vous en êtes. Aucun niveau minimum requis."
  },
  {
    question: "Puis-je annuler ou décaler une séance ?",
    answer: "Oui, sans problème jusqu'à 24h avant la séance. Au-delà, la séance est considérée comme effectuée. On est flexibles, on vous demande juste de prévenir à temps."
  },
  {
    question: "Est-ce éligible au CPF ?",
    answer: "Pas pour l'instant. Ce choix nous permet de rester libres sur notre méthode et nos tarifs, sans alourdir notre fonctionnement avec des dossiers administratifs. En contrepartie, nos prix restent accessibles et sans engagement."
  },
  {
    question: "Vous préparez au TOEIC, TOEFL, IELTS ?",
    answer: "Oui. On peut dédier des séances entières à la préparation de ces examens : méthodologie, gestion du temps, exercices types, écoute. Précisez-le lors de votre réservation et on construit votre programme autour de ça."
  },
  {
    question: "Vous préparez aussi aux entretiens d'embauche en anglais ?",
    answer: "C'est même l'une des choses qu'on fait le mieux. Simulation complète d'entretien, travail du pitch, anticipation des questions difficiles, correction de l'accent. Les élèves qui passent par cette prépa arrivent beaucoup plus sereins le jour J."
  },
  {
    question: "Est-ce que les séances aident pour les examens scolaires ?",
    answer: "Oui. On peut préparer le brevet, le bac (oral et écrit), un oral de lycée ou un contrôle important. Pour les plus jeunes, on travaille aussi sur le programme de l'école pour renforcer ce qui est vu en classe. Les parents constatent généralement une amélioration des notes en 4 à 6 semaines."
  },
  {
    question: "Est-ce qu'il y a du travail entre les séances ?",
    answer: "Ce n'est pas obligatoire — surtout pour les plus jeunes. On propose des petites ressources adaptées à l'âge : une chanson, une vidéo courte, un jeu en ligne. Pour les ados et adultes, des podcasts ou articles courts pour garder l'anglais dans le quotidien, sans que ça devienne une corvée."
  },
  {
    question: "Mon enfant est timide et n'ose pas parler anglais. Est-ce que ça peut quand même marcher ?",
    answer: "C'est exactement le profil qu'on aide le mieux. Les enfants timides ont souvent peur du jugement — et c'est justement ce qu'on élimine dès la première séance. Sarah a une façon de mettre les enfants à l'aise très rapidement. En général, après 2 ou 3 séances, même les plus réservés commencent à se lancer."
  },
  {
    question: "Anglais britannique ou américain ?",
    answer: "Les deux. On s'adapte à votre contexte. Si vous travaillez avec des Américains, on part sur l'anglais US. Si vous visez un poste en Angleterre, on travaille l'accent britannique. Vous choisissez, on s'aligne."
  },
  {
    question: "Puis-je enregistrer les séances ?",
    answer: "Oui. C'est même recommandé. Se réécouter quelques semaines plus tard, c'est l'un des meilleurs moyens de mesurer sa progression — et d'entendre concrètement là où on s'est amélioré."
  },
  {
    question: "Comment je paye ?",
    answer: "En ligne, par carte bancaire, de façon sécurisée. Pour les packs 5 ou 10 séances, on peut s'arranger pour un paiement en deux fois. Contactez-nous si vous avez besoin d'un aménagement."
  },
  {
    question: "Et si le feeling ne passe pas avec le coach ?",
    answer: "Ça arrive, et c'est humain. La relation pédagogique c'est crucial pour avoir envie de parler. Si ça ne se passe pas bien, on vous propose un autre coach sans frais et sans question."
  },
  {
    question: "Est-ce que vous fournissez des supports de cours ?",
    answer: "Oui. Après chaque séance, vous recevez un récap des points travaillés, les corrections importantes et les ressources pour aller plus loin. Tout est accessible via un espace Notion personnel, à vie."
  },
  {
    question: "Vous proposez des créneaux le soir et le week-end ?",
    answer: "Oui. On a des créneaux tôt le matin, tard le soir et le samedi pour s'adapter aux actifs. Les disponibilités varient selon les semaines — regardez le calendrier en ligne pour voir ce qui vous convient."
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
    <div className="bg-[#FDFCF8] min-h-screen pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-bee-black)] mb-4 sm:mb-6"
          >
            Vos questions, nos réponses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            On répond franchement aux questions qu'on nous pose le plus souvent.
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
                  className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="flex items-center gap-4">
                    <span className={`font-heading text-sm font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      openIndex === index
                        ? 'bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)]'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-heading font-semibold text-sm sm:text-lg text-[var(--color-bee-black)]">
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
                      <div className="px-4 pb-4 pl-12 sm:px-6 sm:pb-5 sm:pl-[4.5rem] text-sm sm:text-base text-gray-600 leading-relaxed">
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
          className="mt-12 sm:mt-20 text-center bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm"
        >
          <MessageCircle className="h-10 w-10 text-[var(--color-bee-yellow)] mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold text-[var(--color-bee-black)] mb-3">
            Votre question n'est pas là ?
          </h3>
          <p className="text-gray-600 mb-6">Écrivez-nous, on répond sous 24h — souvent bien moins.</p>
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
