import { useState } from 'react';
import { PageHero } from '../../components/landing/PageHero';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Reveal } from '../../components/ui/Motion';
import { toast } from '../../components/ui/Toast';
import { img } from '../../lib/images';
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react';

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Message sent! We will get back to you shortly.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you. Reach out with any questions about admissions, academics or campus visits." image={img.building} />

      <section className="container-px py-20">
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { icon: MapPin, t: 'Address', d: '24 Education Avenue, Knowledge City, Bengaluru 560001' },
            { icon: Phone, t: 'Phone', d: '+91 80 2345 6789\n+91 98765 43210' },
            { icon: Mail, t: 'Email', d: 'info@greenwood.edu\nadmissions@greenwood.edu' },
            { icon: Clock, t: 'Office Hours', d: 'Mon – Fri: 8:00 AM – 4:00 PM\nSat: 9:00 AM – 12:00 PM' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.05}>
              <div className="card p-6 h-full">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  <c.icon className="h-6 w-6" />
                </span>
                <h4 className="mt-4 font-semibold text-ink-900 dark:text-white">{c.t}</h4>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400 whitespace-pre-line">{c.d}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="card p-6 h-full flex flex-col">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
                <MessageCircle className="h-6 w-6" />
              </span>
              <h4 className="mt-4 font-semibold text-ink-900 dark:text-white">WhatsApp</h4>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Chat with us instantly on WhatsApp.</p>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn-primary mt-4 w-full !bg-emerald-600 hover:!bg-emerald-700">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <SectionHeading center={false} eyebrow="Get In Touch" title="Send us a message" subtitle="Fill out the form and our team will respond within 24 hours." />
              <div className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className={`grid h-11 w-11 place-items-center rounded-xl bg-white dark:bg-ink-800 text-ink-600 dark:text-ink-300 border border-ink-200 dark:border-ink-700 transition ${s.color} hover:!text-white`}>
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="card p-7 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Your Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Full name" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="label">Subject</label>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" placeholder="How can we help?" />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="input" placeholder="Your message..." />
              </div>
              <button type="submit" className="btn-primary w-full"><Send className="h-4 w-4" /> Send Message</button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="container-px pb-20">
        <Reveal>
          <div className="rounded-3xl overflow-hidden shadow-card border border-ink-100 dark:border-ink-800">
            <iframe
              title="Greenwood Location"
              src="https://www.google.com/maps?q=Bengaluru&output=embed"
              className="w-full h-[400px] border-0"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
