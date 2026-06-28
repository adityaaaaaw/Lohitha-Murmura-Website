import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '../../animations/variants';
import { DELIVERY_TARGETS } from '../../constants';
import { Store, ShoppingBag, Network, UtensilsCrossed, PartyPopper, Building2 } from 'lucide-react';

const iconMap = { Store, ShoppingBag, Network, UtensilsCrossed, PartyPopper, Building2 };

const DeliverySection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <motion.div
        className="text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <span className="badge-primary mb-3 inline-block">Supply Network</span>
        <h2 className="section-heading">We Supply To</h2>
        <p className="section-subheading">
          Serving all major trade segments across Telangana and Andhra Pradesh.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        {DELIVERY_TARGETS.map((target, i) => {
          const Icon = iconMap[target.icon] || Store;
          return (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card p-6 flex flex-col items-center justify-center gap-3 text-center cursor-default"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <p className="font-heading font-semibold text-text text-sm leading-snug">{target.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default DeliverySection;
