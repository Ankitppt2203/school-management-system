import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { galleryImages } from '../../lib/images';
import { SectionHeading } from '../ui/SectionHeading';
import { stagger, fadeUp } from '../ui/Motion';

export function GalleryPreview() {
  return (
    <section className="container-px py-20">
      <SectionHeading eyebrow="Gallery" title="A glimpse of campus life" subtitle="State-of-the-art facilities and vibrant school events." />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.slice(0, 8).map((g, idx) => (
          <motion.div
            key={g.title}
            variants={fadeUp}
            className={`group relative overflow-hidden rounded-2xl ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img src={g.src} alt={g.title} className={`w-full object-cover transition duration-700 group-hover:scale-110 ${idx === 0 ? 'h-full min-h-[260px]' : 'h-40'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="absolute bottom-0 left-0 p-3 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
              <span className="chip bg-white/20 text-white text-xs">{g.tag}</span>
              <div className="text-white font-semibold text-sm mt-1">{g.title}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-10">
        <Link to="/gallery" className="btn-secondary">View Full Gallery <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
