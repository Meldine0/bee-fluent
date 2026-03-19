import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'La méthode', path: '/presentation' },
    { name: 'Tarifs', path: '/offres' },
    { name: 'Test de niveau', path: '/test-niveau' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8]">
      {/* Floating Pill Navigation */}
      <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className={`pointer-events-auto flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-full border transition-all duration-300 w-full max-w-5xl ${
          scrolled ? 'shadow-lg border-gray-200/50' : 'shadow-sm border-gray-200'
        }`}>
          <Link to="/" className="flex items-center gap-2 pl-2">
            <Logo className="h-8 w-8 text-[var(--color-bee-black)]" />
            <span className="font-heading text-xl font-bold tracking-tight text-[var(--color-bee-black)]">
              Bee Fluent.
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-gray-900 py-1 ${
                  location.pathname === link.path
                    ? 'text-[var(--color-bee-black)]'
                    : 'text-gray-500'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-bee-yellow)] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link to="/reservation">
              <Button size="sm" className="rounded-full px-6">Réserver</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#FDFCF8] pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-heading font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`editorial-divider pb-4 ${
                    location.pathname === link.path ? 'text-[var(--color-bee-yellow)]' : 'text-[var(--color-bee-black)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/reservation" onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
                <Button size="lg" className="w-full text-lg h-14">Réserver un cours</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-32">
        <Outlet />
      </main>

      <footer className="bg-[var(--color-bee-black)] text-white py-16 mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 editorial-divider pb-12 border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo className="h-10 w-10 text-white" />
                <span className="font-heading text-3xl font-bold">Bee Fluent.</span>
              </div>
              <p className="text-gray-400 max-w-xs">L'anglais sur-mesure pour ceux qui veulent de vrais résultats.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
              <div className="flex flex-col gap-3">
                <span className="font-heading font-semibold text-lg">Menu</span>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link>
                <Link to="/presentation" className="text-gray-400 hover:text-white transition-colors">La méthode</Link>
                <Link to="/offres" className="text-gray-400 hover:text-white transition-colors">Tarifs</Link>
                <Link to="/test-niveau" className="text-gray-400 hover:text-white transition-colors">Test de niveau</Link>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-heading font-semibold text-lg">Contact</span>
                <a href="mailto:hello@beefluent.fr" className="text-gray-400 hover:text-white transition-colors">hello@beefluent.fr</a>
                <span className="text-gray-400">Visioconférence (France) & Présentiel (Alpes-Maritimes)</span>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Bee Fluent. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-white transition-colors">Mentions légales</Link>
              <Link to="#" className="hover:text-white transition-colors">CGV</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
