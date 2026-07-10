import { motion } from 'framer-motion';
import { PageHero } from '../../components/landing/PageHero';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Reveal, stagger, fadeUp } from '../../components/ui/Motion';
import { Icon } from '../../components/ui/Icon';
import { academics, departments } from '../../data/mock';
import { img } from '../../lib/images';
import { BookOpen, ListChecks } from 'lucide-react';

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
  'Social Science', 'Computer Science', 'Economics', 'Accountancy',
  'Business Studies', 'Physical Education', 'Music', 'Art', 'Robotics',
];

const curriculum = [
  { stage: 'Primary (1–5)', board: 'Activity-based, NEP-aligned', focus: 'Foundational literacy, numeracy & values' },
  { stage: 'Middle (6–8)', board: 'CBSE with experiential learning', focus: 'Conceptual understanding & skill building' },
  { stage: 'High (9–10)', board: 'CBSE Board', focus: 'Board exam readiness & career exploration' },
  { stage: 'Senior (11–12)', board: 'CBSE — Science / Commerce / Humanities', focus: 'Specialization & university preparation' },
];

export default function Academics() {
  return (
    <>
      <PageHero title="Academics" subtitle="A future-ready curriculum across every stage of learning." image={img.library} />

      <section className="container-px py-20">
        <SectionHeading eyebrow="Academic Stages" title="Learning for every age" subtitle="From foundational years to senior secondary, our programs are designed to inspire." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {academics.map((a) => (
            <motion.div key={a.title} variants={fadeUp} whileHover={{ y: -6 }} className="card p-6 text-center group">
              <span className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-card group-hover:scale-110 transition`}>
                <Icon name={a.icon} className="h-8 w-8" />
              </span>
              <h4 className="mt-4 font-display font-bold text-ink-900 dark:text-white">{a.title}</h4>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Curriculum" title="A structured learning journey" subtitle="Our curriculum is aligned with NEP 2020 and the CBSE framework." />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-ink-200 dark:border-ink-700">
                  <th className="py-3 px-4 text-sm font-semibold text-ink-700 dark:text-ink-200">Stage</th>
                  <th className="py-3 px-4 text-sm font-semibold text-ink-700 dark:text-ink-200">Board / Framework</th>
                  <th className="py-3 px-4 text-sm font-semibold text-ink-700 dark:text-ink-200">Focus Areas</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.map((c, i) => (
                  <motion.tr
                    key={c.stage}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-b border-ink-100 dark:border-ink-800 hover:bg-brand-50/50 dark:hover:bg-ink-800/50"
                  >
                    <td className="py-4 px-4 font-semibold text-ink-900 dark:text-white">{c.stage}</td>
                    <td className="py-4 px-4 text-ink-600 dark:text-ink-300">{c.board}</td>
                    <td className="py-4 px-4 text-ink-600 dark:text-ink-300">{c.focus}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-px py-20">
        <SectionHeading eyebrow="Subjects" title="A wide spectrum of subjects" subtitle="From core academics to arts, technology and physical education." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 flex flex-wrap justify-center gap-3">
          {subjects.map((s) => (
            <motion.span key={s} variants={fadeUp} className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 px-4 py-2 text-sm hover:scale-105 transition cursor-default">
              <BookOpen className="h-4 w-4" /> {s}
            </motion.span>
          ))}
        </motion.div>
      </section>

      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Departments" title="Specialized academic departments" />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d) => (
              <motion.div key={d.name} variants={fadeUp} className="card p-6 flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  <Icon name={d.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h4 className="font-display font-bold text-ink-900 dark:text-white">{d.name}</h4>
                  <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container-px py-20">
        <Reveal>
          <div className="card p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <ListChecks className="mx-auto h-10 w-10 text-brand-500" />
            <h3 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-white">Want to know more?</h3>
            <p className="mt-2 text-ink-500 dark:text-ink-400">Explore our detailed admission process and fee structure.</p>
            <a href="/admissions" className="btn-primary mt-6 inline-flex">View Admissions</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
