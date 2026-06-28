import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight, staggerContainer, staggerItem } from '../../animations/variants';
import { Factory, Leaf, Star, Truck } from 'lucide-react';

const highlights = [
  { icon: Factory, text: 'Modern manufacturing facility' },
  { icon: Leaf, text: 'Fresh daily production' },
  { icon: Star, text: 'Premium quality assurance' },
  { icon: Truck, text: 'Pan-Telangana delivery' },
];

const timelineSteps = [
  { step: '01', title: 'Raw Rice Selection', desc: 'Directly sourced premium paddy rice selected for uniform grain size.' },
  { step: '02', title: 'Controlled Roasting', desc: 'Traditional roasting techniques combined with modern temperature controls.' },
  { step: '03', title: 'Hygienic Packaging', desc: 'Packed fresh on site in durable 20kg/25kg bulk bags to preserve crispiness.' },
  { step: '04', title: 'Quick Distribution', desc: 'Fast load-out and direct supply logistics across Telangana & Andhra Pradesh.' },
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
                  <Factory className="w-8 h-8 text-[#D71920]" />
                </div>
                <p className="text-[#D71920] font-semibold text-sm">Our Factory</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Leaf className="w-6 h-6 text-[#1F6B3A]" />
                </div>
                <p className="text-[#1F6B3A] font-semibold text-xs">Fresh Daily</p>
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
                  <Truck className="w-8 h-8 text-[#D71920]" />
                </div>
                <p className="text-[#D71920] font-semibold text-sm">Bulk Supply</p>
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
                    <Icon className="w-5 h-5 text-[#1F6B3A]" />
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
              <p className="font-heading font-bold text-3xl text-[#D71920]">Daily</p>
              <p className="text-text-light text-sm mt-1">Fresh Production</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Process Timeline Section */}
      <div className="mt-20 pt-16 border-t border-border">
        <div className="text-center mb-12">
          <h3 className="font-heading font-bold text-text text-2xl sm:text-3xl">
            Our Manufacturing Process
          </h3>
          <p className="text-text-light text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Step-by-step roasting and distribution flow at our plant.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-[#1F6B3A]/25 z-0" />
          
          {timelineSteps.map((t, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-border shadow-soft hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#1F6B3A] text-white flex items-center justify-center font-heading font-extrabold text-sm mb-4">
                {t.step}
              </div>
              <h4 className="font-heading font-bold text-text text-base mb-2">
                {t.title}
              </h4>
              <p className="text-text-light text-xs sm:text-sm leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
