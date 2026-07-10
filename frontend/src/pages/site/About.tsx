import { motion } from 'framer-motion';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Reveal, stagger, fadeUp } from '../../components/ui/Motion';
import { Counter } from '../../components/ui/Counter';
import { Icon } from '../../components/ui/Icon';
import { stats, whyChoose } from '../../data/mock';
import { img } from '../../lib/images';
import { Target, Eye, Heart, Quote, Award, BookOpen, Users } from 'lucide-react';
import { PageHero } from '../../components/landing/PageHero';

const values = [
  { icon: Award, t: 'Excellence', d: 'We pursue the highest standards in everything.' },
  { icon: Heart, t: 'Integrity', d: 'We act with honesty and strong moral principles.' },
  { icon: Users, t: 'Collaboration', d: 'We learn and grow together as a community.' },
  { icon: BookOpen, t: 'Curiosity', d: 'We nurture a lifelong love of learning.' },
];

export default function About() {
  return (
    <>
      <PageHero title="About Our School" subtitle="Two decades of nurturing minds, building character and shaping futures." image={img.campus} />

      {/* History */}
      <section className="container-px py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <img src={img.building} alt="School building" className="rounded-3xl shadow-card w-full" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading center={false} eyebrow="Our History" title="From a small institution to a global school" />
            <p className="mt-5 text-ink-600 dark:text-ink-300 leading-relaxed">
              Greenwood International School was founded in 2005 with just 80 students and 8 teachers. Over two decades, it has grown into a premier institution with over 1000 students, 100+ educators and a sprawling modern campus. Our journey has been defined by an unwavering commitment to academic excellence, innovation and holistic development.
            </p>
            <p className="mt-4 text-ink-600 dark:text-ink-300 leading-relaxed">
              Today, Greenwood alumni study at the world's leading universities and lead change across industries — a testament to the strong foundation built here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, t: 'Our Mission', d: 'To empower every student with the knowledge, skills and values needed to thrive in a global society.', c: 'from-brand-500 to-brand-700' },
              { icon: Eye, t: 'Our Vision', d: 'To be the most trusted institution for holistic, future-ready education that shapes responsible global citizens.', c: 'from-emerald-500 to-teal-600' },
              { icon: Heart, t: 'Our Values', d: 'Integrity, curiosity, empathy and excellence guide every decision we make and every lesson we teach.', c: 'from-accent-500 to-orange-600' },
            ].map((v) => (
              <Reveal key={v.t}>
                <div className="card p-7 h-full">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${v.c} text-white shadow-card`}>
                    <v.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink-900 dark:text-white">{v.t}</h3>
                  <p className="mt-2 text-ink-500 dark:text-ink-400">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-px py-20">
        <SectionHeading eyebrow="School Statistics" title="Our impact in numbers" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="card p-6 text-center">
              <div className="font-display text-4xl font-extrabold text-brand-600">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-ink-500">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Principal & Chairman messages */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px grid lg:grid-cols-2 gap-10">
          {[
            { img: img.principal, name: 'Dr. Meera Nair', role: 'Principal', msg: 'At Greenwood, we believe every child is unique. Our role is to ignite curiosity, build character and equip students with the confidence to shape a better world. Education here is not just about exams — it is about life.' },
            { img: img.chairman, name: 'Mr. R. K. Sharma', role: 'Chairman', msg: 'When we founded Greenwood in 2005, our dream was to create an institution where children would love to learn. Two decades later, that dream continues to guide us. We remain committed to providing an environment where every child can discover their potential.' },
          ].map((m) => (
            <Reveal key={m.name}>
              <div className="card p-8">
                <div className="flex items-center gap-4">
                  <img src={m.img} alt={m.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <div className="font-display font-bold text-ink-900 dark:text-white">{m.name}</div>
                    <div className="text-sm text-brand-600 dark:text-brand-400">{m.role}</div>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-brand-300 mt-5" />
                <p className="mt-3 text-ink-600 dark:text-ink-300 leading-relaxed">{m.msg}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-px py-20">
        <SectionHeading eyebrow="Our Values" title="What we stand for" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <motion.div key={v.t} variants={fadeUp} className="card p-6 text-center group">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300 group-hover:scale-110 transition">
                <v.icon className="h-7 w-7" />
              </span>
              <h4 className="mt-4 font-semibold text-ink-900 dark:text-white">{v.t}</h4>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{v.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why choose */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Why Choose Us" title="World-class facilities & faculty" />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {whyChoose.map((c) => (
              <motion.div key={c.title} variants={fadeUp} whileHover={{ y: -6 }} className="card p-5 group">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card group-hover:scale-110 transition">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <h4 className="mt-4 font-semibold text-ink-900 dark:text-white">{c.title}</h4>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
