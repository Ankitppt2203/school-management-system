import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../../components/landing/PageHero';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Reveal, stagger, fadeUp } from '../../components/ui/Motion';
import { toast } from '../../components/ui/Toast';
import { admissionProcess, feeStructure, faqs } from '../../data/mock';
import { img } from '../../lib/images';
import { Download, FileText, CheckCircle2, ChevronDown, Send } from 'lucide-react';

const documents = [
  'Birth Certificate (original + photocopy)',
  'Previous school report card / transfer certificate',
  '4 recent passport-size photographs',
  'Aadhaar card of student & parents',
  'Address proof of parent / guardian',
  'Caste / income certificate (if applicable for scholarship)',
];

const timeline = [
  { phase: 'Inquiry Window', date: 'Jan – Mar 2026' },
  { phase: 'Assessment & Interaction', date: 'Mar – Apr 2026' },
  { phase: 'Admission Offer', date: 'Apr 2026' },
  { phase: 'Fee Payment & Enrollment', date: 'Apr – May 2026' },
  { phase: 'Session Begins', date: 'Jun 2026' },
];

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', grade: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Admission inquiry submitted! Our team will contact you soon.');
    setForm({ name: '', email: '', phone: '', grade: '', message: '' });
  };

  return (
    <>
      <PageHero title="Admissions" subtitle="Begin your child's journey at Greenwood. Admissions for 2026–27 are now open." image={img.building} />

      {/* Process */}
      <section className="container-px py-20">
        <SectionHeading eyebrow="Admission Process" title="Five simple steps to enrollment" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {admissionProcess.map((p) => (
            <motion.div key={p.step} variants={fadeUp} className="card p-6 text-center relative">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white font-bold text-lg">{p.step}</span>
              <h4 className="mt-4 font-semibold text-ink-900 dark:text-white">{p.title}</h4>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Eligibility + Documents */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="card p-8">
              <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Eligibility</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Grade 1: Child must be 6 years old as on March 31, 2026.',
                  'Grade 6 onwards: Valid transfer certificate from previous school.',
                  'Age-appropriate academic readiness as assessed by the school.',
                  'For international students: equivalent grade-level documentation.',
                ].map((e) => (
                  <li key={e} className="flex items-start gap-3 text-ink-600 dark:text-ink-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" /> {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card p-8">
              <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Required Documents</h3>
              <ul className="mt-5 space-y-3">
                {documents.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-ink-600 dark:text-ink-300">
                    <FileText className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fee structure */}
      <section className="container-px py-20">
        <SectionHeading eyebrow="Fee Structure" title="Transparent & competitive fees" subtitle="Annual fees for the 2026–27 academic session (inclusive of all charges)." />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-600 text-white">
                <th className="py-3 px-4 rounded-l-xl">Grade</th>
                <th className="py-3 px-4">Admission (one-time)</th>
                <th className="py-3 px-4">Tuition</th>
                <th className="py-3 px-4 rounded-r-xl">Annual Total</th>
              </tr>
            </thead>
            <tbody>
              {feeStructure.map((f, i) => (
                <motion.tr
                  key={f.grade}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border-b border-ink-100 dark:border-ink-800 hover:bg-brand-50/50 dark:hover:bg-ink-800/50"
                >
                  <td className="py-4 px-4 font-semibold text-ink-900 dark:text-white">{f.grade}</td>
                  <td className="py-4 px-4 text-ink-600 dark:text-ink-300">{f.admission}</td>
                  <td className="py-4 px-4 text-ink-600 dark:text-ink-300">{f.tuition}</td>
                  <td className="py-4 px-4 font-bold text-brand-700 dark:text-brand-400">{f.total}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Admission Timeline" title="Key dates to remember" />
          <div className="mt-12 max-w-3xl mx-auto">
            {timeline.map((t, i) => (
              <Reveal key={t.phase} delay={i * 0.05}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-white text-sm font-bold">{i + 1}</span>
                    {i < timeline.length - 1 && <span className="w-px flex-1 bg-brand-200 dark:bg-ink-700 my-1" />}
                  </div>
                  <div className="pb-8">
                    <h4 className="font-semibold text-ink-900 dark:text-white">{t.phase}</h4>
                    <p className="text-sm text-brand-600 dark:text-brand-400">{t.date}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px py-20">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-ink-900 dark:text-white">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-brand-500 transition ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-ink-600 dark:text-ink-300">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Inquiry form + CTA */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <SectionHeading center={false} eyebrow="Admission Inquiry" title="Have questions? Let's talk." subtitle="Fill out the form and our admissions team will reach out within 24 hours." />
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => toast('Prospectus download started!')} className="btn-primary"><Download className="h-4 w-4" /> Download Prospectus</button>
                <a href="/login" className="btn-secondary">Apply Online</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="card p-7 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Parent / Guardian Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Full name" />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="+91 ..." />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="label">Grade Applying For</label>
                  <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="input">
                    <option value="">Select grade</option>
                    {['Primary (1–5)', 'Middle (6–8)', 'High (9–10)', 'Senior (11–12)'].map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className="input" placeholder="Tell us about your child..." />
              </div>
              <button type="submit" className="btn-primary w-full"><Send className="h-4 w-4" /> Submit Inquiry</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
