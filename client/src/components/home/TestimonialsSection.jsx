import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '../../animations/variants';
import { TESTIMONIALS } from '../../constants';
import { Star, Quote } from 'lucide-react';

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <motion.div
        className="text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <span className="badge-yellow mb-3 inline-block">Testimonials</span>
        <h2 className="section-heading">Trusted by Retailers</h2>
        <p className="section-subheading">
          Hear from our long-term customers across the region.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.id}
            variants={staggerItem}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="card p-7 flex flex-col gap-5 relative"
          >
            <Quote className="w-8 h-8 text-primary/20 absolute top-5 right-5" />
            <Stars count={t.rating} />
            <p className="text-text-light text-sm leading-relaxed italic flex-1">"{t.quote}"</p>
            <div className="pt-2 border-t border-border">
              <p className="font-heading font-semibold text-text text-sm">{t.name}</p>
              <p className="text-text-lighter text-xs mt-0.5">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;
