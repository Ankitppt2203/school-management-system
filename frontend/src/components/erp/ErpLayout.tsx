import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../ui/Icon';
import { GraduationCap, Menu, X, Sun, Moon, LogOut, Bell, ChevronDown, Home } from 'lucide-react';

const nav = [
  { label: 'Dashboard', to: '/app', icon: 'LayoutDashboard' },
  { label: 'Students', to: '/app/students', icon: 'Users' },
  { label: 'Teachers', to: '/app/teachers', icon: 'GraduationCap' },
  { label: 'Departments', to: '/app/departments', icon: 'Building2' },
  { label: 'Courses', to: '/app/courses', icon: 'BookOpen' },
  { label: 'Attendance', to: '/app/attendance', icon: 'CalendarCheck' },
  { label: 'Exams', to: '/app/exams', icon: 'FileText' },
  { label: 'Results', to: '/app/results', icon: 'Award' },
  { label: 'Profile', to: '/app/profile', icon: 'User' },
  { label: 'Settings', to: '/app/settings', icon: 'Settings' },
];

export function ErpLayout() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const loc = useLocation();
  const nav2 = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-ink-950/50 lg:hidden" />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 bg-white dark:bg-ink-900 border-r border-ink-100 dark:border-ink-800 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-5 border-b border-ink-100 dark:border-ink-800">
          <Link to="/app" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display font-bold text-ink-900 dark:text-white">Greenwood</span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden btn-ghost p-1.5"><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {nav.map((n) => {
            const active = loc.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${active ? 'bg-brand-600 text-white shadow-card' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'}`}
              >
                <Icon name={n.icon} className="h-5 w-5" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-ink-100 dark:border-ink-800">
          <button onClick={() => nav2('/')} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 w-full">
            <Home className="h-5 w-5" /> Back to Website
          </button>
          <button onClick={logout} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 w-full mt-1">
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 glass border-b border-ink-100 dark:border-ink-800">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setOpen(true)} className="lg:hidden btn-ghost p-2"><Menu className="h-5 w-5" /></button>
              <h1 className="font-display text-lg font-bold text-ink-900 dark:text-white capitalize">
                {nav.find((n) => n.to === loc.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggle} className="btn-ghost rounded-lg p-2">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button className="btn-ghost rounded-lg p-2 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
              </button>
              <div className="relative">
                <button onClick={() => setMenuOpen((p) => !p)} className="flex items-center gap-2 rounded-xl pl-1.5 pr-2 py-1.5 hover:bg-ink-100 dark:hover:bg-ink-800">
                  <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-lg" />
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-ink-900 dark:text-white leading-tight">{user?.name}</div>
                    <div className="text-xs text-ink-500 capitalize">{user?.role}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-ink-400" />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-48 card p-2 z-30">
                      <Link to="/app/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm hover:bg-ink-100 dark:hover:bg-ink-800">My Profile</Link>
                      <Link to="/app/settings" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm hover:bg-ink-100 dark:hover:bg-ink-800">Settings</Link>
                      <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
