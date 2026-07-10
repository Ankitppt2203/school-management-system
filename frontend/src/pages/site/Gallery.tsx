import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../../components/landing/PageHero';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { galleryImages, img } from '../../lib/images';
import { stagger, fadeUp } from '../../components/ui/Motion';
import { X } from 'lucide-react';

const filters = ['All', 'Campus', 'Academics', 'Labs', 'Sports', 'Events', 'Arts', 'Functions'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = filter === 'All' ? galleryImages : galleryImages.filter((g) => g.tag === filter);

  return (
    <>
      <PageHero title="Gallery" subtitle="A visual tour of our campus, classrooms, labs and vibrant events." image={img.classroom} />

      <section className="container-px py-20">
        <SectionHeading eyebrow="Campus Life" title="Explore Greenwood in pictures" />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip px-4 py-2 text-sm transition ${filter === f ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300 hover:bg-brand-100 dark:hover:bg-ink-700'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {items.map((g) => (
              <motion.div
                key={g.title}
                layout
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setLightbox(g.src)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <img src={g.src} alt={g.title} className="w-full h-44 object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-0 left-0 p-3 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                  <span className="chip bg-white/20 text-white text-xs">{g.tag}</span>
                  <div className="text-white font-semibold text-sm mt-1">{g.title}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-ink-950/90 backdrop-blur-sm p-4"
          >
            <button className="absolute top-5 right-5 text-white btn-ghost rounded-full p-2 bg-white/10"><X className="h-6 w-6" /></button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt="Preview"
              className="max-h-[85vh] max-w-full rounded-2xl shadow-glow"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
