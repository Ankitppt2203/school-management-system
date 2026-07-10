import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function PageHero({ title, subtitle, image }: { title: string; subtitle?: ReactNode; image: string }) {
  return (
    <section className="relative h-[52vh] min-h-[360px] flex items-center overflow-hidden">
      <motion.img
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-brand-950/75 to-ink-950/65" />
      <div className="container-px relative z-10 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-ink-200">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
