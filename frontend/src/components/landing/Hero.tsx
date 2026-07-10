import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, BadgeCheck } from 'lucide-react';
import { img } from '../../lib/images';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={img.hero} alt="Greenwood campus" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-brand-950/70 to-ink-950/60" />
      </motion.div>

      <motion.div style={{ opacity }} className="container-px relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="chip glass text-brand-200 border border-white/20 mb-5"
          >
            <BadgeCheck className="h-4 w-4" /> Admissions Open 2026–27
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05]"
          >
            Greenwood <span className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-transparent">International School</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-5 text-lg sm:text-xl text-ink-200 max-w-2xl"
          >
            <span className="font-semibold text-white">"Knowledge • Character • Excellence"</span> — nurturing global citizens through world-class education since 2005.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/admissions" className="btn-primary text-base !px-6 !py-3">
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/gallery" className="btn-secondary text-base !px-6 !py-3 !bg-white/10 !text-white !border-white/20 hover:!bg-white/20">
              <Compass className="h-4 w-4" /> Explore Campus
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 flex gap-8 text-white/80"
          >
            {[['1000+', 'Students'], ['100+', 'Teachers'], ['20+', 'Years'], ['50+', 'Awards']].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold">{v}</div>
                <div className="text-xs uppercase tracking-wider text-ink-300">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-ink-50 dark:from-ink-950 to-transparent z-10" />
    </section>
  );
}
