import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '../../components/landing/Hero';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Reveal, stagger, fadeUp } from '../../components/ui/Motion';
import { Counter } from '../../components/ui/Counter';
import { Icon } from '../../components/ui/Icon';
import { Testimonials } from '../../components/landing/Testimonials';
import { GalleryPreview } from '../../components/landing/GalleryPreview';
import { EventsPreview } from '../../components/landing/EventsPreview';
import { stats, whyChoose, academics, achievements, departments, faculty } from '../../data/mock';
import { img } from '../../lib/images';
import { ArrowRight, Quote, Target, Eye, Heart, BookOpen, Award } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />

      {/* About preview */}
      <section className="container-px py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <img src={img.campus} alt="Campus" className="rounded-3xl shadow-card w-full" />
              <div className="absolute -bottom-6 -right-6 hidden sm:block card p-5 w-48">
                <div className="font-display text-3xl font-bold text-brand-600">20+</div>
                <div className="text-sm text-ink-500">Years of Excellence</div>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              center={false}
              eyebrow="About Our School"
              title="A legacy of learning, a future of leaders"
              subtitle="Founded in 2005, Greenwood International School blends a rigorous academic curriculum with character education, technology and the arts — preparing students for a rapidly changing world."
            />
            <div className="mt-6 space-y-4">
              {[
                { icon: Target, t: 'Our Mission', d: 'To empower every student with knowledge, skills and values to thrive globally.' },
                { icon: Eye, t: 'Our Vision', d: 'To be the most trusted institution for holistic, future-ready education.' },
                { icon: Heart, t: 'Our Values', d: 'Integrity, curiosity, empathy and excellence in everything we do.' },
              ].map((v) => (
                <Reveal key={v.t}>
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-ink-900 dark:text-white">{v.t}</h4>
                      <p className="text-sm text-ink-500 dark:text-ink-400">{v.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Link to="/about" className="btn-primary mt-7">Learn More <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-600 py-16">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="container-px grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center text-white">
              <div className="font-display text-4xl sm:text-5xl font-extrabold">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm uppercase tracking-wider text-brand-100">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why choose */}
      <section className="container-px py-20">
        <SectionHeading eyebrow="Why Choose Us" title="World-class facilities & faculty" subtitle="Everything your child needs to learn, grow and excel — under one roof." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
      </section>

      {/* Academics preview */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Academics" title="A curriculum for every stage" subtitle="From foundational primary years to specialized senior secondary streams." />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {academics.map((a) => (
              <motion.div key={a.title} variants={fadeUp} whileHover={{ y: -6 }} className="card p-6 text-center">
                <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${a.color} text-white shadow-card`}>
                  <Icon name={a.icon} className="h-7 w-7" />
                </span>
                <h4 className="mt-4 font-semibold text-ink-900 dark:text-white">{a.title}</h4>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Link to="/academics" className="btn-secondary">Explore Academics <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Achievements preview */}
      <section className="container-px py-20">
        <SectionHeading eyebrow="Achievements" title="Our shining stars" subtitle="Celebrating academic brilliance and all-round excellence." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.slice(0, 3).map((a) => (
            <motion.div key={a.name} variants={fadeUp} className="card overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img src={a.image} alt={a.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 right-3 chip bg-accent-500 text-white"><Award className="h-3.5 w-3.5" /> {a.year}</div>
              </div>
              <div className="p-5">
                <h4 className="font-display font-bold text-ink-900 dark:text-white">{a.name}</h4>
                <p className="text-sm text-ink-500">{a.class} • {a.percentage}</p>
                <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 mt-2">{a.achievement}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <Link to="/achievements" className="btn-secondary">View All Achievements <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* Departments preview */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Departments" title="Specialized academic departments" />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((d) => (
              <motion.div key={d.name} variants={fadeUp} className="card p-5 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  <Icon name={d.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-ink-900 dark:text-white">{d.name}</h4>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Principal message */}
      <section className="container-px py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <img src={img.principal} alt="Principal" className="rounded-3xl shadow-card w-full max-w-md mx-auto" />
          </Reveal>
          <Reveal delay={0.1}>
            <Quote className="h-10 w-10 text-brand-500" />
            <p className="mt-4 text-lg text-ink-700 dark:text-ink-200 leading-relaxed">
              "At Greenwood, we believe every child is unique. Our role is to ignite curiosity, build character and equip students with the confidence to shape a better world. Education here is not just about exams — it's about life."
            </p>
            <div className="mt-5">
              <div className="font-display font-bold text-ink-900 dark:text-white">Dr. Meera Nair</div>
              <div className="text-sm text-brand-600 dark:text-brand-400">Principal, Greenwood International School</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Faculty preview */}
      <section className="bg-ink-100/60 dark:bg-ink-900/40 py-20">
        <div className="container-px">
          <SectionHeading eyebrow="Our Faculty" title="Meet our educators" subtitle="Experienced, passionate and dedicated to student success." />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.slice(0, 3).map((f) => (
              <motion.div key={f.name} variants={fadeUp} className="card p-6 text-center group">
                <img src={f.photo} alt={f.name} className="mx-auto h-24 w-24 rounded-2xl object-cover group-hover:scale-105 transition" />
                <h4 className="mt-4 font-display font-bold text-ink-900 dark:text-white">{f.name}</h4>
                <p className="text-sm text-brand-600 dark:text-brand-400">{f.role}</p>
                <p className="text-xs text-ink-500 mt-1">{f.qualification} • {f.experience} yrs</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <GalleryPreview />
      <EventsPreview />
      <Testimonials />

      {/* CTA */}
      <section className="container-px py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-10 sm:p-16 text-center text-white">
            <div className="absolute inset-0 bg-grid-light opacity-20" />
            <div className="relative">
              <BookOpen className="mx-auto h-10 w-10 mb-4" />
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Ready to join the Greenwood family?</h2>
              <p className="mt-3 text-brand-100 max-w-xl mx-auto">Admissions for 2026–27 are now open. Begin your child's journey toward excellence today.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/admissions" className="btn !bg-white !text-brand-700 hover:!bg-brand-50 !px-6 !py-3 text-base">Apply Now <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contact" className="btn !bg-white/10 !text-white !border !border-white/30 hover:!bg-white/20 !px-6 !py-3 text-base">Contact Us</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
