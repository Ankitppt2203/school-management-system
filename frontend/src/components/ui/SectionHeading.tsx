import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function SectionHeading({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}
    >
      {eyebrow && (
        <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub mx-auto">{subtitle}</p>}
    </motion.div>
  );
}
