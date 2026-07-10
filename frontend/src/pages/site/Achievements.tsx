import { motion } from 'framer-motion';
import { PageHero } from '../../components/landing/PageHero';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { stagger, fadeUp } from '../../components/ui/Motion';
import { achievements } from '../../data/mock';
import { img } from '../../lib/images';
import { Award, Trophy, Medal, Star } from 'lucide-react';

const categories = [
  { icon: Trophy, label: 'Board Toppers', count: 24, color: 'from-amber-400 to-orange-600' },
  { icon: Star, label: 'Olympiad Winners', count: 38, color: 'from-blue-400 to-brand-600' },
  { icon: Medal, label: 'Sports Champions', count: 19, color: 'from-emerald-400 to-teal-600' },
  { icon: Award, label: 'Science Fair Winners', count: 27, color: 'from-rose-400 to-pink-600' },
];

export default function Achievements() {
  return (
    <>
      <PageHero title="Achievements" subtitle="Celebrating the brilliance, dedication and all-round excellence of our students." image={img.event} />

      <section className="container-px py-20">
        <SectionHeading eyebrow="By The Numbers" title="A culture of excellence" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <motion.div key={c.label} variants={fadeUp} className="card p-6 text-center group">
              <span className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-card group-hover:scale-110 transition`}>
                <c.icon className="h-8 w-8" />
              </span>
              <div className="mt-4 font-display text-3xl font-extrabold text-ink-900 dark:text-white">{c.count}+</div>
              <div className="text-sm text-ink-500">{c.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Our Stars" title="Top achievers of 2025–26" subtitle="Meet the students who made Greenwood proud." />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a) => (
              <motion.div key={a.name} variants={fadeUp} whileHover={{ y: -8 }} className="card overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <img src={a.image} alt={a.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                  <span className="absolute top-3 right-3 chip bg-accent-500 text-white"><Award className="h-3.5 w-3.5" /> {a.year}</span>
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="font-display text-lg font-bold">{a.name}</div>
                    <div className="text-sm text-ink-200">{a.class}</div>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-ink-500 uppercase tracking-wide">Achievement</div>
                    <div className="font-semibold text-ink-900 dark:text-white">{a.achievement}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-ink-500 uppercase tracking-wide">Score</div>
                    <div className="font-display text-xl font-bold text-brand-600">{a.percentage}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
