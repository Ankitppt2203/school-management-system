import { motion } from 'framer-motion';
import { PageHero } from '../../components/landing/PageHero';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { stagger, fadeUp } from '../../components/ui/Motion';
import { faculty } from '../../data/mock';
import { img } from '../../lib/images';
import { Briefcase, GraduationCap, BookOpen } from 'lucide-react';

export default function Faculty() {
  return (
    <>
      <PageHero title="Our Faculty" subtitle="Experienced, passionate educators dedicated to nurturing every student." image={img.library} />

      <section className="container-px py-20">
        <SectionHeading eyebrow="Meet The Team" title="Educators who inspire" subtitle="A blend of academic excellence and real-world experience." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((f) => (
            <motion.div key={f.name} variants={fadeUp} whileHover={{ y: -6 }} className="card p-6 text-center group">
              <div className="relative mx-auto w-fit">
                <img src={f.photo} alt={f.name} className="h-28 w-28 rounded-2xl object-cover group-hover:scale-105 transition" />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 chip bg-brand-600 text-white text-xs whitespace-nowrap">{f.role}</span>
              </div>
              <h4 className="mt-6 font-display font-bold text-ink-900 dark:text-white">{f.name}</h4>
              <div className="mt-3 space-y-1.5 text-sm text-ink-500 dark:text-ink-400">
                <p className="flex items-center justify-center gap-1.5"><GraduationCap className="h-4 w-4 text-brand-500" /> {f.qualification}</p>
                <p className="flex items-center justify-center gap-1.5"><BookOpen className="h-4 w-4 text-brand-500" /> {f.subject}</p>
                <p className="flex items-center justify-center gap-1.5"><Briefcase className="h-4 w-4 text-brand-500" /> {f.experience} years experience</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
