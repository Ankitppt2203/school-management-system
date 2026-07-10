import { motion } from 'framer-motion';
import { PageHero } from '../../components/landing/PageHero';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Reveal, stagger, fadeUp } from '../../components/ui/Motion';
import { Icon } from '../../components/ui/Icon';
import { events } from '../../data/mock';
import { img } from '../../lib/images';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

const holidays = [
  { date: 'Aug 15', name: 'Independence Day' },
  { date: 'Sep 05', name: 'Teachers Day' },
  { date: 'Oct 02', name: 'Gandhi Jayanti' },
  { date: 'Oct 20', name: 'Diwali Break' },
  { date: 'Dec 25', name: 'Christmas' },
];

export default function Events() {
  return (
    <>
      <PageHero title="Events" subtitle="Stay updated with everything happening at Greenwood — from annual functions to PTMs." image={img.annualDay} />

      <section className="container-px py-20">
        <SectionHeading eyebrow="Upcoming Events" title="What's coming up" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e) => (
            <motion.div key={e.title} variants={fadeUp} whileHover={{ y: -6 }} className="card p-6 group">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card group-hover:scale-110 transition">
                <Icon name={e.icon} className="h-7 w-7" />
              </span>
              <h4 className="mt-4 font-display font-bold text-ink-900 dark:text-white">{e.title}</h4>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{e.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400">
                <CalendarDays className="h-4 w-4" /> {e.date}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Event Timeline" title="The year ahead" />
          <div className="mt-12 max-w-3xl mx-auto relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-brand-200 dark:bg-ink-700" />
            {events.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <div className="relative flex gap-6 pb-10">
                  <div className="absolute left-4 -translate-x-1/2 grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white ring-4 ring-ink-50 dark:ring-ink-950">
                    <Icon name={e.icon} className="h-4 w-4" />
                  </div>
                  <div className="ml-12 card p-5 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-display font-bold text-ink-900 dark:text-white">{e.title}</h4>
                      <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">{e.date}</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{e.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-500">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 9:00 AM onwards</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Main Auditorium</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Holiday calendar */}
      <section className="container-px py-20">
        <SectionHeading eyebrow="Holiday Calendar" title="Upcoming holidays" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {holidays.map((h) => (
            <motion.div key={h.name} variants={fadeUp} className="card p-5 text-center">
              <div className="font-display text-2xl font-bold text-brand-600">{h.date}</div>
              <div className="text-sm text-ink-600 dark:text-ink-300 mt-1">{h.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
