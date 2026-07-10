import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { img } from '../../lib/images';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, BookOpen, User } from 'lucide-react';
import type { Role } from '../../types';

const roles: { id: Role; label: string; icon: typeof ShieldCheck; desc: string }[] = [
  { id: 'admin', label: 'Admin', icon: ShieldCheck, desc: 'Full system access' },
  { id: 'teacher', label: 'Teacher', icon: BookOpen, desc: 'Manage classes & marks' },
  { id: 'student', label: 'Student', icon: User, desc: 'View results & attendance' },
];

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState<Role>('admin');
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await login(email, password, role);
      nav('/app');
    } catch {
      setErr('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden lg:block overflow-hidden">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={img.campus}
          alt="Campus"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-brand-800/80 to-ink-950/90" />
        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 backdrop-blur">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="font-display text-lg font-bold">Greenwood</span>
          </Link>
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-4xl font-extrabold leading-tight">
              Welcome back to your <span className="text-brand-300">ERP dashboard</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-4 text-brand-100 max-w-md">
              Manage students, teachers, attendance, exams and results — all from one beautiful, secure platform.
            </motion.p>
            <div className="mt-8 flex gap-6">
              {[['1000+', 'Students'], ['100+', 'Teachers'], ['48', 'Courses']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold">{v}</div>
                  <div className="text-xs uppercase tracking-wider text-brand-200">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-brand-200">© {new Date().getFullYear()} Greenwood International School</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-ink-50 dark:bg-ink-950">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-ink-900 dark:text-white">Greenwood ERP</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">Sign in</h1>
          <p className="mt-2 text-ink-500 dark:text-ink-400">Select your role and enter your credentials.</p>

          {/* Role selection */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
    setRole(r.id);

    if (r.id === "admin") {
        setEmail("admin");
        setPassword("admin123");
    }

    if (r.id === "teacher") {
        setEmail("teacher");
        setPassword("teacher123");
    }

    if (r.id === "student") {
        setEmail("student");
        setPassword("student123");
    }
}}
                className={`p-3 rounded-xl border text-center transition ${role === r.id ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 ring-2 ring-brand-500/30' : 'border-ink-200 dark:border-ink-700 hover:border-brand-300'}`}
              >
                <r.icon className={`mx-auto h-6 w-6 ${role === r.id ? 'text-brand-600 dark:text-brand-400' : 'text-ink-500'}`} />
                <div className={`mt-1.5 text-sm font-semibold ${role === r.id ? 'text-brand-700 dark:text-brand-300' : 'text-ink-700 dark:text-ink-200'}`}>{r.label}</div>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label">Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
    required
    type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="input pl-10"
    placeholder="Enter username"
/>
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input required type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-10 pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShow((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-600 dark:text-ink-300">
                <input type="checkbox" className="rounded border-ink-300 text-brand-600 focus:ring-brand-500" /> Remember me
              </label>
              <a href="#" className="text-brand-600 dark:text-brand-400 hover:underline">Forgot password?</a>
            </div>

            <AnimatePresence>
              {err && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/30 rounded-lg px-3 py-2">
                  {err}
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" disabled={loading} className="btn-primary w-full !py-3 text-base">
              {loading ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            Demo credentials are pre-filled. Just click <span className="font-semibold text-brand-600">Sign In</span>.
          </p>
          <Link to="/" className="mt-4 block text-center text-sm text-ink-500 hover:text-brand-600">← Back to website</Link>
        </motion.div>
      </div>
    </div>
  );
}
