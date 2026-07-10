import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { events } from '../../data/mock';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';
import { stagger, fadeUp } from '../ui/Motion';

export function EventsPreview() {
  return (
    <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
      <div className="container-px">
        <SectionHeading eyebrow="Upcoming Events" title="Mark your calendar" subtitle="Stay connected with everything happening at Greenwood." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-brand-200 dark:bg-ink-700 -translate-x-1/2" />
          <div className="space-y-8">
            {events.map((e, idx) => (
              <motion.div key={e.title} variants={fadeUp} className={`relative flex ${idx % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'}`}>
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-white text-xs font-bold ring-4 ring-ink-50 dark:ring-ink-950">
                  {idx + 1}
                </div>
                <div className={`ml-12 sm:ml-0 sm:w-[44%] card p-5 ${idx % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                  <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-sm font-semibold">
                    <Icon name={e.icon} className="h-4 w-4" /> {e.date}
                  </div>
                  <h4 className="mt-1 font-display font-bold text-ink-900 dark:text-white">{e.title}</h4>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="text-center mt-10">
          <Link to="/events" className="btn-secondary">All Events <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
