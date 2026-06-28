import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '../../animations/variants';
import { TESTIMONIALS } from '../../constants';
import { Star, Quote } from 'lucide-react';

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5" aria-label={`${count} star rating`}>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4.5 h-4.5 text-[#D71920] fill-[#D71920]" />
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="section-padding bg-background-alt" aria-label="Customer testimonials">
    <div className="container-custom">
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
      >
        <span className="badge-blue mb-3 inline-block">Testimonials</span>
        <h2 className="section-heading">Trusted by Retailers</h2>
        <p className="section-subheading">
          Hear from our long-term retail and wholesale customers across Telangana.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={staggerContainer}
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.id}
            variants={staggerItem}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="card p-7 flex flex-col gap-5 relative bg-white"
          >
            <Quote className="w-8 h-8 text-[#D71920]/10 absolute top-5 right-5" />
            <Stars count={t.rating} />
            <p className="text-text-light text-sm sm:text-base leading-relaxed italic flex-1">
              "{t.quote}"
            </p>
            <div className="pt-4 border-t border-border">
              <p className="font-heading font-semibold text-text text-sm sm:text-base">{t.name}</p>
              <p className="text-text-lighter text-xs mt-0.5 font-medium">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;
