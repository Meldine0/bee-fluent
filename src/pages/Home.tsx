import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react';
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
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-bee-yellow)] bg-yellow-50/50 px-4 py-1.5 text-sm font-medium text-yellow-900 mb-8 shadow-sm">
                <Star className="h-4 w-4 fill-current text-[var(--color-bee-yellow)]" />
                <span>Places limitées pour ce mois</span>
              </div>
              <h1 className="font-heading text-6xl font-extrabold tracking-tight text-[var(--color-bee-black)] sm:text-7xl lg:text-[5.5rem] mb-8 leading-[1.05]">
                Osez parler. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-bee-yellow)] to-yellow-600">
                  Vraiment.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                L'anglais n'est pas une matière scolaire. C'est une compétence.
                Débloquez votre oral avec un accompagnement premium, sur-mesure et sans jugement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/reservation">
                  <Button size="lg" className="w-full sm:w-auto gap-2 h-14 px-8 text-lg rounded-full shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 hover:-translate-y-0.5 transition-all duration-300">
                    Votre premier cours <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/presentation">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full hover:-translate-y-0.5 transition-all duration-300">
                    Découvrir la méthode
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
                    "J'ai enfin arrêté de traduire dans ma tête avant de parler."
                  </p>
                  <p className="text-white/80 mt-2 text-sm font-medium">— Sarah, Directrice Marketing</p>
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
              { value: '200+', label: 'Élèves accompagnés', icon: Users },
              { value: '98%', label: 'Taux de satisfaction', icon: Star },
              { value: '4.9/5', label: 'Note moyenne', icon: Award },
              { value: '+94%', label: 'Confiance à l\'oral', icon: TrendingUp },
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
                <p className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--color-bee-black)]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="w-full overflow-hidden bg-[var(--color-bee-yellow)] py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              {['Pratique orale', 'Confiance', 'Régularité', 'Immersion', 'Sur-mesure'].map((text, j) => (
                <span key={j} className="flex items-center gap-8">
                  <span className="font-heading font-bold text-2xl text-[var(--color-bee-black)] uppercase tracking-wider">
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
      <section className="py-32 bg-[#FDFCF8] relative grain">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 block">Notre approche</span>
                <h2 className="font-heading text-4xl font-extrabold text-[var(--color-bee-black)] sm:text-5xl mb-6 leading-tight">
                  Une méthode qui <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-300">change la donne.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Oubliez les listes de vocabulaire interminables et la grammaire théorique.
                  Nous nous concentrons sur ce qui compte vraiment : votre capacité à communiquer.
                </p>
                <Link to="/presentation" className="group inline-flex items-center gap-2 font-bold text-[var(--color-bee-black)] text-lg">
                  <span className="border-b-2 border-[var(--color-bee-black)] group-hover:border-[var(--color-bee-yellow)] transition-colors pb-1">Lire notre manifeste</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              {[
                {
                  num: "01",
                  title: "Diagnostic précis",
                  desc: "On ne traite pas un problème qu'on ne comprend pas. La première séance sert à identifier vos blocages exacts et vos objectifs réels."
                },
                {
                  num: "02",
                  title: "Immersion active",
                  desc: "80% de temps de parole pour vous. Je vous corrige en temps réel, avec bienveillance, pour créer de nouveaux automatismes."
                },
                {
                  num: "03",
                  title: "Suivi millimétré",
                  desc: "Entre chaque séance, des ressources ciblées (podcasts, articles) pour maintenir le contact avec la langue au quotidien."
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
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 block">Témoignages</span>
            <h2 className="font-heading text-4xl font-extrabold text-[var(--color-bee-black)] sm:text-5xl">
              Ils ont franchi le cap.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "En 3 mois, j'ai réussi à animer ma première réunion en anglais sans stress. Un vrai déclic.",
                name: "Marine L.",
                role: "Product Manager",
                stars: 5,
              },
              {
                quote: "L'approche est radicalement différente de tout ce que j'ai testé avant. On parle dès la première minute.",
                name: "Thomas R.",
                role: "Entrepreneur",
                stars: 5,
              },
              {
                quote: "J'ai décroché un poste à l'international grâce à la préparation aux entretiens. Merci Sarah !",
                name: "Camille D.",
                role: "Consultante",
                stars: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-[#FDFCF8] rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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

      {/* CTA Section */}
      <section className="py-32 bg-[var(--color-bee-black)] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl font-extrabold mb-8 text-white">
              Prêt à franchir le cap ?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Les places sont limitées pour garantir la qualité du suivi.
              Réservez votre créneau et commençons à travailler.
            </p>
            <Link to="/offres">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full shadow-xl shadow-yellow-500/20 glow-yellow hover:-translate-y-0.5 transition-all duration-300">
                Voir les disponibilités
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
