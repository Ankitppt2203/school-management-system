import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Menu, X, Sun, Moon, LogIn } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const loc = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass shadow-soft py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container-px flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card group-hover:scale-105 transition">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold text-ink-900 dark:text-white">Greenwood</span>
            <span className="block text-[11px] uppercase tracking-widest text-brand-600 dark:text-brand-400">International School</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition hover:text-brand-600 dark:hover:text-brand-400 ${
                  loc.pathname === l.to ? 'text-brand-600 dark:text-brand-400' : 'text-ink-700 dark:text-ink-200'
                }`}
              >
                {l.label}
                {loc.pathname === l.to && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggle} className="btn-ghost rounded-lg p-2" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button onClick={() => nav('/login')} className="btn-primary hidden sm:inline-flex">
            <LogIn className="h-4 w-4" /> ERP Login
          </button>
          <button onClick={() => setOpen((p) => !p)} className="lg:hidden btn-ghost p-2" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden glass mx-4 mt-2 rounded-2xl"
          >
            <ul className="flex flex-col p-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-brand-50 dark:hover:bg-ink-800">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={() => nav('/login')} className="btn-primary w-full mt-2">ERP Login</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
