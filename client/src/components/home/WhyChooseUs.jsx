import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '../../animations/variants';
import { WHY_CHOOSE_US } from '../../constants';
import { Factory, Sun, Star, Package, IndianRupee, Truck, ShieldCheck } from 'lucide-react';

const iconMap = { Factory, Sun, Star, Package, IndianRupee, Truck, ShieldCheck };

const WhyChooseUs = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <motion.div
        className="text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <span className="badge-green mb-3 inline-block">Why Us</span>
        <h2 className="section-heading">Why Choose Lohitha Murmura?</h2>
        <p className="section-subheading">
          Trusted by hundreds of retailers and wholesalers across Telangana for quality, freshness, and reliability.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        {WHY_CHOOSE_US.map((item, i) => {
          const Icon = iconMap[item.icon] || Factory;
          return (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="card p-7 flex flex-col items-start gap-4 cursor-default"
            >
              <div className="w-13 h-13 bg-primary/10 rounded-xl flex items-center justify-center p-3">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text text-base mb-1.5">{item.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default WhyChooseUs;
