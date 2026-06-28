import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '../../animations/variants';
import { WHY_CHOOSE_US } from '../../constants';
import { Factory, Sun, Star, Package, IndianRupee, Truck, ShieldCheck } from 'lucide-react';

const iconMap = { Factory, Sun, Star, Package, IndianRupee, Truck, ShieldCheck };

const WhyChooseUs = () => (
  <section className="section-padding bg-background-alt">
    <div className="container-custom">
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
      >
        <span className="badge-primary mb-3 inline-block">Why Us</span>
        <h2 className="section-heading">Why Choose Lohitha Murmura?</h2>
        <p className="section-subheading">
          Trusted by hundreds of retailers and wholesalers across Telangana for quality, freshness, and reliability.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={staggerContainer}
      >
        {WHY_CHOOSE_US.map((item, i) => {
          const Icon = iconMap[item.icon] || Factory;
          /* Cycle: Red, Blue, Green, Blue, Red, Green */
          const colors = [
            { bg: 'bg-primary/10', icon: 'text-primary' },
            { bg: 'bg-blue/10',    icon: 'text-blue'    },
            { bg: 'bg-accent/10',  icon: 'text-accent'  },
            { bg: 'bg-blue/10',    icon: 'text-blue'    },
            { bg: 'bg-primary/10', icon: 'text-primary' },
            { bg: 'bg-accent/10',  icon: 'text-accent'  },
          ];
          const c = colors[i % colors.length];
          return (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="card p-6 sm:p-7 flex flex-col items-start gap-4 cursor-default"
            >
              <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${c.icon}`} />
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
