import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, ChevronRight, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Question, getRandomQuestions } from '../data/questions';
import { saveLead } from '../lib/supabase';

type Step = 'intro' | 'quiz' | 'form' | 'result';

export function LevelTest() {
  const [step, setStep] = useState<Step>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setQuestions(getRandomQuestions(10));
  }, []);

  const handleStart = () => {
    setStep('quiz');
  };

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentIndex].correctIndex) {
      setScore(prev => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep('form');
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await saveLead({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        score,
        total: questions.length,
      });
    } catch (err) {
      console.error('Lead save error:', err);
    }
    setStep('result');
  };

  const sessionsNeeded = (questions.length - score) * 2;
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-yellow-50/40 rounded-full blur-3xl" />

      <div className="max-w-3xl w-full relative z-10">

        <AnimatePresence mode="wait">
          {/* INTRO STEP */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-50 to-yellow-100 mb-8">
                <BookOpen className="h-10 w-10 text-yellow-700" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[var(--color-bee-black)] mb-6">
                Testez votre niveau d'anglais
              </h1>
              <p className="text-xl text-gray-600 mb-4 max-w-xl mx-auto">
                Découvrez où vous en êtes réellement. 10 questions rapides pour évaluer votre grammaire, votre vocabulaire et vos réflexes.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-10">
                <span className="flex items-center gap-1.5">
                  <Target className="h-4 w-4" /> 10 questions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> 3 min
                </span>
              </div>
              <Button size="lg" onClick={handleStart} className="h-14 px-10 text-lg rounded-full w-full sm:w-auto shadow-lg shadow-yellow-500/15 hover:-translate-y-0.5 transition-all duration-300">
                Commencer le test <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}

          {/* QUIZ STEP */}
          {step === 'quiz' && questions.length > 0 && (
            <motion.div
              key={`quiz-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-3">
                  <span className="font-heading font-semibold">Question {currentIndex + 1} <span className="text-gray-400 font-normal">sur {questions.length}</span></span>
                  <span className="bg-yellow-50 text-yellow-800 px-3 py-0.5 rounded-full text-xs font-bold">{Math.round((currentIndex / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-[var(--color-bee-yellow)] to-yellow-500 h-2 rounded-full"
                    initial={{ width: `${((currentIndex - 1) / questions.length) * 100}%` }}
                    animate={{ width: `${(currentIndex / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-bee-black)] mb-8 leading-tight">
                {questions[currentIndex].text}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {questions[currentIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-100 hover:border-[var(--color-bee-yellow)] hover:bg-yellow-50/50 transition-all duration-200 text-left group"
                  >
                    <span className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[var(--color-bee-yellow)] text-gray-500 group-hover:text-[var(--color-bee-black)] flex items-center justify-center text-sm font-bold transition-colors duration-200">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-lg font-medium text-gray-700 group-hover:text-[var(--color-bee-black)]">
                        {option}
                      </span>
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[var(--color-bee-yellow)] transition-all duration-200 group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* FORM STEP */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--color-bee-black)] mb-4">
                  Test terminé !
                </h2>
                <p className="text-lg text-gray-600">
                  Remplissez ce formulaire pour découvrir votre score et obtenir votre recommandation personnalisée.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6 max-w-lg mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none transition-all"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none transition-all"
                      placeholder="Dupont"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="jean.dupont@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone (optionnel)</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-bee-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-xl mt-4 shadow-lg shadow-yellow-500/10">
                  Découvrir mon score
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  Vos données sont sécurisées et ne seront jamais partagées.
                </p>
              </form>
            </motion.div>
          )}

          {/* RESULT STEP */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100 text-center"
            >
              <div className="mb-8">
                <span className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">
                  Votre score
                </span>
                <div className="relative inline-flex items-center justify-center w-36 h-36">
                  {/* Circular progress */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#F3F4F6" strokeWidth="6" />
                    <motion.circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="#FACC15"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${percentage * 2.64} 264`}
                      initial={{ strokeDasharray: "0 264" }}
                      animate={{ strokeDasharray: `${percentage * 2.64} 264` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <span className="font-heading text-4xl font-extrabold text-[var(--color-bee-black)]">
                    {score}<span className="text-xl text-gray-400">/{questions.length}</span>
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[var(--color-bee-black)] mb-4">
                {score >= questions.length * 0.8 ? "Excellent niveau !" :
                 score >= questions.length * 0.5 ? "Vous avez de bonnes bases !" :
                 "Il y a du potentiel !"}
              </h2>

              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                {score >= questions.length * 0.8
                  ? "Vous maîtrisez déjà bien la langue. Quelques séances suffiront pour peaufiner votre accent et votre fluidité à l'oral."
                  : score >= questions.length * 0.5
                  ? "Vous comprenez l'essentiel mais vous manquez probablement de pratique à l'oral pour être totalement à l'aise."
                  : "C'est le moment idéal pour reprendre les bases et construire une fondation solide sans mauvaises habitudes."}
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 rounded-2xl p-6 mb-10 border border-yellow-100">
                <h3 className="font-heading font-bold text-gray-900 mb-2">Notre recommandation :</h3>
                <p className="text-gray-700">
                  {score === questions.length
                    ? "Vous êtes déjà au top ! Mais si vous voulez pratiquer, on est là."
                    : `Pour atteindre un niveau de confiance optimal, nous estimons que vous auriez besoin d'environ ${sessionsNeeded} séances de coaching personnalisé.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/offres">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-lg shadow-yellow-500/15">
                    Voir les offres de coaching
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
