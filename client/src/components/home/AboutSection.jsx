import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight, staggerContainer, staggerItem } from '../../animations/variants';
import { CheckCircle2, Factory, Leaf, Star, Truck } from 'lucide-react';

const highlights = [
  { icon: Factory, text: 'Modern manufacturing facility' },
  { icon: Leaf, text: 'Fresh daily production' },
  { icon: Star, text: 'Premium quality assurance' },
  { icon: Truck, text: 'Pan-Telangana delivery' },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Images */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={slideLeft}
        >
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Factory className="w-8 h-8 text-primary" />
                </div>
                <p className="text-primary font-semibold text-sm">Our Factory</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Leaf className="w-6 h-6 text-accent" />
                </div>
                <p className="text-accent font-semibold text-xs">Fresh Daily</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-blue/10 to-blue/20 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-blue" />
                </div>
                <p className="text-blue font-semibold text-xs">Premium</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-primary/10 to-blue/10 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <p className="text-primary font-semibold text-sm">Bulk Supply</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={slideRight}
        >
          <span className="badge-blue mb-4 inline-block">About Us</span>
          <h2 className="section-heading mb-5">
            Lohitha Murmura —<br />
            <span className="text-gradient">Factory Direct Quality</span>
          </h2>
          <p className="text-text-light text-base leading-relaxed mb-4">
            Located in Siddipet, Telangana, Lohitha Murmura is a dedicated wholesale murmura manufacturer serving retailers, wholesalers, and distributors across the region.
          </p>
          <p className="text-text-light text-base leading-relaxed mb-8">
            Our modern production facility ensures consistent quality and freshness in every batch. We produce daily to guarantee that our customers always receive the crispiest, freshest murmura straight from our factory floor.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div key={i} variants={staggerItem} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-text text-sm font-medium">{h.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <p className="font-heading font-bold text-3xl text-blue">500+</p>
              <p className="text-text-light text-sm mt-1">Retail Partners</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="font-heading font-bold text-3xl text-blue">5+</p>
              <p className="text-text-light text-sm mt-1">Years Experience</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="font-heading font-bold text-3xl text-primary">Daily</p>
              <p className="text-text-light text-sm mt-1">Fresh Production</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
