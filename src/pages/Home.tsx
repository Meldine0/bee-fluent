import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { ArrowRight, Star, Users, Award, TrendingUp, Globe, BookMarked, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FDFCF8] px-4 pt-12 pb-24 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-100/30 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-bee-yellow)] bg-yellow-50/50 px-4 py-1.5 text-sm font-medium text-yellow-900 mb-6 shadow-sm">
                <Star className="h-4 w-4 fill-current text-[var(--color-bee-yellow)]" />
                <span>Enfants · Ados · Étudiants · Adultes</span>
              </div>
              <p className="font-heading text-lg sm:text-xl italic text-gray-400 mb-4 tracking-wide">
                Let your English fly ✨
              </p>
              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[var(--color-bee-black)] sm:text-6xl lg:text-[5.5rem] mb-6 leading-[1.05]">
                L'anglais pour <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-bee-yellow)] to-yellow-600">
                  tout le monde.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed font-medium">
                Peu importe l'âge, le niveau ou l'objectif : scolaire, pro, voyage ou simple confiance à l'oral. Chaque élève a son propre programme, construit rien que pour lui.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/reservation">
                  <Button size="lg" className="w-full sm:w-auto gap-2 h-14 px-8 text-lg rounded-full shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 hover:-translate-y-0.5 transition-all duration-300">
                    Réserver ma séance <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/test-niveau">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full hover:-translate-y-0.5 transition-all duration-300">
                    Tester mon niveau
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative border border-gray-100 img-zoom">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200"
                  alt="Femme confiante en milieu professionnel"
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white font-heading text-2xl font-semibold leading-snug">
                    "Mon fils a eu 18 à son oral du bac. Il détestait l'anglais avant."
                  </p>
                  <p className="text-white/80 mt-2 text-sm font-medium">— Caroline, maman de Lucas, 17 ans</p>
                </div>
              </div>

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -left-6 top-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 hidden lg:flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-bee-black)]">+94%</p>
                  <p className="text-xs text-gray-500">de confiance à l'oral</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '200+', label: 'Élèves de tous âges accompagnés', icon: Users },
              { value: '98%', label: 'Satisfaits dès la 1ère séance', icon: Star },
              { value: '4.9/5', label: 'Note moyenne', icon: Award },
              { value: '+94%', label: 'Gagnent en confiance à l\'oral', icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-yellow-50 mb-4 group-hover:bg-[var(--color-bee-yellow)] transition-colors duration-300">
                  <stat.icon className="h-5 w-5 text-yellow-700 group-hover:text-[var(--color-bee-black)] transition-colors duration-300" />
                </div>
                <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-[var(--color-bee-black)]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <div className="bg-[var(--color-bee-black)] py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
              Offre de lancement
            </span>
            <p className="text-white font-heading text-lg sm:text-xl font-bold text-center sm:text-left">
              Première séance :{' '}
              <span className="line-through text-gray-500">60€</span>{' '}
              <span className="text-[var(--color-bee-yellow)]">→ 30€ seulement</span>
            </p>
          </div>
          <Link to="/reservation?pack=single" className="flex-shrink-0">
            <Button size="sm" className="rounded-full px-6 whitespace-nowrap">
              J'en profite <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full overflow-hidden bg-[var(--color-bee-yellow)] py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              {['Pratique orale', 'Confiance', 'Régularité', 'Immersion', 'Sur-mesure'].map((text, j) => (
                <span key={j} className="flex items-center gap-8">
                  <span className="font-heading font-bold text-base sm:text-2xl text-[var(--color-bee-black)] uppercase tracking-wider">
                    {text}
                  </span>
                  <span className="text-[var(--color-bee-black)]/40 text-xl">&#9670;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Method Section */}
      <section className="py-16 sm:py-32 bg-[#FDFCF8] relative grain">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 block">Comment ça marche</span>
                <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[var(--color-bee-black)] sm:text-5xl mb-4 sm:mb-6 leading-tight">
                  Adapté à chacun. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-300">Efficace pour tous.</span>
                </h2>
                <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Que ce soit pour préparer un bac, décrocher un stage, partir à l'étranger ou juste gagner en confiance : la méthode s'adapte à l'objectif et à l'âge de chaque élève.
                </p>
                <Link to="/presentation" className="group inline-flex items-center gap-2 font-bold text-[var(--color-bee-black)] text-lg">
                  <span className="border-b-2 border-[var(--color-bee-black)] group-hover:border-[var(--color-bee-yellow)] transition-colors pb-1">Voir la méthode complète</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              {[
                {
                  num: "01",
                  title: "On part de là où vous en êtes",
                  desc: "Enfant qui débute, ado qui prépare un exam, adulte qui veut progresser au travail : on cerne votre niveau et votre objectif dès la première séance."
                },
                {
                  num: "02",
                  title: "On parle. Beaucoup.",
                  desc: "80% du temps, c'est l'élève qui parle. On corrige en temps réel, sans mettre mal à l'aise, pour que les bons réflexes s'installent naturellement."
                },
                {
                  num: "03",
                  title: "On progresse à son rythme",
                  desc: "Pas de programme rigide imposé. On avance au rythme de l'élève, avec des exercices adaptés à son âge et ses centres d'intérêt."
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.15 }}
                  className="editorial-divider py-8 first:pt-0 last:border-0 flex flex-col sm:flex-row gap-6 sm:gap-12 group cursor-default"
                >
                  <span className="font-heading text-5xl font-extrabold text-gray-200 group-hover:text-[var(--color-bee-yellow)] transition-colors duration-500">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[var(--color-bee-black)] mb-3 group-hover:translate-x-1 transition-transform duration-300">{step.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 block">Ils nous font confiance</span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[var(--color-bee-black)] sm:text-5xl">
              Ils ont passé le cap.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Ma fille avait 8/20 en anglais en seconde. Après 2 mois avec Sarah, elle est montée à 15. Elle prend même plaisir à parler maintenant.",
                name: "Isabelle M.",
                role: "Maman de Chloé, 16 ans",
                stars: 5,
              },
              {
                quote: "J'avais un entretien en anglais 3 semaines après la première séance. Je l'ai eu. Je ne pensais pas que c'était possible aussi vite.",
                name: "Thomas R.",
                role: "Entrepreneur, 34 ans",
                stars: 5,
              },
              {
                quote: "Mon fils de 10 ans attendait ses séances avec impatience. Sarah sait exactement comment s'adapter aux enfants. C'est vraiment rare.",
                name: "Karim B.",
                role: "Papa de Yanis, 10 ans",
                stars: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-[#FDFCF8] rounded-2xl p-5 sm:p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[var(--color-bee-yellow)] text-[var(--color-bee-yellow)]" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">"{testimonial.quote}"</p>
                <div>
                  <p className="font-heading font-bold text-[var(--color-bee-black)]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn French Section */}
      <section className="py-16 sm:py-24 bg-[var(--color-bee-black)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 bg-yellow-500/10 text-[var(--color-bee-yellow)] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-6">
                <Globe className="h-3.5 w-3.5" /> Nouveau service
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                Apprenez le français<br />
                <span className="text-[var(--color-bee-yellow)]">comme une seconde langue.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                Vous vivez en France, vous accueillez des proches étrangers, ou vous souhaitez apprendre le français ? Sarah propose également des cours de français langue étrangère (FLE), pour enfants, ados et adultes.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Même méthode : 100% oral, sur-mesure, bienveillant. La même exigence, dans l'autre langue.
              </p>
              <Link to="/reservation">
                <Button size="lg" className="h-14 px-8 rounded-full shadow-lg shadow-yellow-500/20">
                  Réserver un cours de français <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Globe, title: 'Pour non-francophones', desc: 'Étrangers en France qui veulent s\'intégrer et communiquer au quotidien.' },
                { icon: BookMarked, title: 'Pour les familles', desc: 'Enfants ou parents qui souhaitent progresser en français à leur rythme.' },
                { icon: Star, title: 'Même méthode', desc: '100% oral, zéro jugement, sur-mesure selon votre objectif et votre niveau.' },
                { icon: TrendingUp, title: 'Résultats rapides', desc: 'Les premières améliorations se ressentent dès la 2e ou 3e séance.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                  <item.icon className="h-6 w-6 text-[var(--color-bee-yellow)] mb-3" />
                  <p className="font-heading font-bold text-white text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Monthly Subscription Section */}
      <section className="py-16 sm:py-24 bg-[#FDFCF8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-50 to-white rounded-3xl p-8 sm:p-12 border border-yellow-100 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 bg-[var(--color-bee-yellow)] text-[var(--color-bee-black)] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-6">
                  <FolderOpen className="h-3.5 w-3.5" /> Abonnement mensuel
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[var(--color-bee-black)] mb-4 leading-tight">
                  En plus de vos séances,<br />
                  un accès à toutes vos ressources.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  En vous abonnant mensuellement, vous débloquez un espace Google Drive personnel avec des dizaines de ressources soigneusement choisies pour booster votre progression entre les séances.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Fiches de grammaire claires et illustrées',
                    'Vocabulaire thématique (business, voyage, quotidien, examens)',
                    'Exercices de prononciation et d\'intonation',
                    'Podcasts et vidéos recommandés par niveau',
                    'Nouvelles ressources ajoutées chaque mois',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-bee-yellow)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Star className="h-3 w-3 text-[var(--color-bee-black)]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/offres">
                  <Button size="lg" className="h-14 px-8 rounded-full shadow-lg shadow-yellow-500/15">
                    Voir les programmes <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="lg:w-72 w-full flex-shrink-0">
                <div className="bg-[var(--color-bee-black)] rounded-3xl p-8 text-center shadow-xl">
                  <FolderOpen className="h-12 w-12 text-[var(--color-bee-yellow)] mx-auto mb-4" />
                  <p className="font-heading font-extrabold text-white text-4xl mb-2">∞</p>
                  <p className="text-white font-bold text-lg mb-1">Accès illimité</p>
                  <p className="text-gray-400 text-sm mb-6">à toutes les ressources du Drive</p>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-[var(--color-bee-yellow)] text-xs font-bold uppercase tracking-wide mb-1">Inclus avec</p>
                    <p className="text-white text-sm font-medium">Tout abonnement mensuel</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-32 bg-[var(--color-bee-black)] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-8 text-white">
              Un cours pour chaque élève. Vraiment.
            </h2>
            <p className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Enfant, ado, étudiant ou adulte : il y a un programme fait pour vous. Le nombre de places est limité pour garantir un suivi de qualité.
            </p>
            <Link to="/offres">
              <Button size="lg" className="h-14 px-8 sm:px-12 text-lg sm:text-xl rounded-full shadow-xl shadow-yellow-500/20 glow-yellow hover:-translate-y-0.5 transition-all duration-300">
                Choisir mon programme
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: 200%;
        }
      `}</style>
    </div>
  );
}
