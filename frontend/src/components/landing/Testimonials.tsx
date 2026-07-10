import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/mock';
import { SectionHeading } from '../ui/SectionHeading';

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[i];
  return (
    <section className="container-px py-20">
      <SectionHeading eyebrow="Testimonials" title="Loved by students & parents" subtitle="Hear from those who call Greenwood their second home." />
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="relative card p-8 sm:p-12 overflow-hidden">
          <Quote className="absolute -top-3 -left-2 h-20 w-20 text-brand-100 dark:text-brand-900/40" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="flex items-center gap-4">
                <img src={t.photo} alt={t.name} className="h-16 w-16 rounded-full object-cover ring-4 ring-brand-100 dark:ring-brand-900/40" />
                <div>
                  <div className="font-display font-bold text-ink-900 dark:text-white">{t.name}</div>
                  <div className="text-sm text-brand-600 dark:text-brand-400">{t.role} • {t.class}</div>
                </div>
              </div>
              <p className="mt-5 text-lg text-ink-700 dark:text-ink-200 leading-relaxed">"{t.review}"</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3 mt-8">
            <button onClick={prev} className="btn-ghost rounded-full p-2 border border-ink-200 dark:border-ink-700"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? 'w-6 bg-brand-600' : 'w-2 bg-ink-300 dark:bg-ink-700'}`} />
              ))}
            </div>
            <button onClick={next} className="btn-ghost rounded-full p-2 border border-ink-200 dark:border-ink-700"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
