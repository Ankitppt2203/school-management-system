import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from '../ui/Toast';

const quick = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
  { label: 'Careers', to: '/contact' },
];

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  return (
    <footer className="relative mt-20 bg-ink-900 dark:bg-ink-950 text-ink-300">
      <div className="container-px py-14 grid gap-10 lg:grid-cols-4 md:grid-cols-2">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-white">Greenwood</span>
          </Link>
          <p className="text-sm leading-relaxed text-ink-400">
            Nurturing curious minds and confident hearts since 2005. A premium international school committed to academic excellence and holistic growth.
          </p>
          <div className="flex gap-2 mt-5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-lg bg-ink-800 hover:bg-brand-600 transition">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {quick.map((q) => (
              <li key={q.label}>
                <Link to={q.to} className="hover:text-brand-400 transition">{q.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin className="h-4 w-4 mt-0.5 text-brand-400" /> 24 Education Avenue, Knowledge City, Bengaluru 560001</li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-brand-400" /> +91 80 2345 6789</li>
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-brand-400" /> info@greenwood.edu</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Newsletter</h4>
          <p className="text-sm text-ink-400 mb-3">Get school updates delivered to your inbox.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) { toast('Subscribed to newsletter!'); setEmail(''); } }}
            className="flex gap-2"
          >
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" className="input !bg-ink-800 !border-ink-700 !text-white" />
            <button className="btn-primary !px-3"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
      <div className="border-t border-ink-800">
        <div className="container-px py-5 text-center text-xs text-ink-500">
          © {new Date().getFullYear()} Greenwood International School. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
