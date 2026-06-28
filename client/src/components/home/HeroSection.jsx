import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Handshake } from 'lucide-react';
import lohithaBag from '../../assets/lohitha_murmura_bag.png';

const LotusIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1F6B3A] fill-current flex-shrink-0">
    <path d="M12 22c-1.5-2.2-3.1-3.9-4.9-5.1C4.4 15.3 2.5 14.9 1 15.3c1.3-1.8 3-3.2 5-4.2C4.5 9.7 3 8 1.8 6c2 .4 3.8.2 5.4-.7C6.4 3.8 5.9 2 5.5 0.5c1.5 1 2.8 2.4 3.9 4.1C10 2.6 11 1 12-1c1 2 2 3.6 2.6 5.6 1.1-1.7 2.4-3.1 3.9-4.1-.4 1.5-.9 3.3-1.7 4.8 1.6.9 3.4 1.1 5.4.7-1.2 2-2.7 3.7-4.2 5.1 2 1 3.7 2.4 5 4.2-1.5-.4-3.4 0-6.1 1.6-1.8 1.2-3.4 2.9-4.9 5.1z" />
  </svg>
);

const HeroSection = () => (
  <section
    className="relative min-h-[100svh] flex items-center bg-white overflow-hidden pt-12 lg:pt-20 bg-hero-pattern"
    aria-label="Lohitha Murmura Hero"
  >
    {/* Background graphics */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-20 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#D71920]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-[#2E3192]/5 rounded-full blur-3xl" />
    </div>

    <div className="container-custom w-full py-12 lg:py-24 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
        
        {/* Left Side Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* LOHITHA MURMURA Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold leading-[1.02] tracking-tight mb-2"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}
          >
            <span className="text-[#D71920] block">LOHITHA</span>
            <span className="text-[#1F6B3A] block mt-1">MURMURA</span>
          </motion.h1>

          {/* Subtitle with lines */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 w-full max-w-md my-4 px-2"
          >
            <span className="h-[2px] bg-[#D71920] flex-1"></span>
            <span className="text-[#D71920] font-heading font-black tracking-widest text-[11px] sm:text-sm whitespace-nowrap">
              FACTORY FRESH MURMURA
            </span>
            <span className="h-[2px] bg-[#D71920] flex-1"></span>
          </motion.div>

          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1F6B3A] text-white text-xs sm:text-sm font-heading font-black px-6 py-2.5 rounded-full tracking-wider mb-6 inline-flex shadow-sm"
          >
            BULK ORDERS ONLY
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-text-light text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
          >
            Serving wholesalers, retailers and distributors across{' '}
            <span className="text-[#D71920] font-bold">Telangana</span> &amp;{' '}
            <span className="text-[#2E3192] font-bold">Andhra Pradesh</span>.
          </motion.p>

          {/* Feature Badges */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: 'Factory Direct', icon: LotusIcon },
              { label: 'Fresh Every Day', icon: Leaf },
              { label: 'Bulk Supply Only', icon: Handshake },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-white border border-[#1F6B3A]/30 rounded-xl px-4 py-3 shadow-soft hover:shadow-md transition-shadow duration-300 justify-center sm:justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1F6B3A]/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-[#1F6B3A]" />
                  </div>
                  <span className="text-text font-bold text-xs sm:text-sm leading-none whitespace-nowrap">{f.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 w-full sm:w-auto btn-primary text-base px-8 py-4 min-h-[52px] rounded-xl shadow-lg"
            >
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full sm:w-auto btn-secondary border-[#1F6B3A] text-[#1F6B3A] hover:bg-[#1F6B3A] hover:text-white text-base px-8 py-4 min-h-[52px] rounded-xl"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Right Side Showcase */}
        <div className="relative flex justify-center items-center">
          {/* Blurred Background with Rice Grain Shape */}
          <div className="absolute w-[80%] aspect-square bg-gradient-to-tr from-[#D71920]/10 to-[#2E3192]/10 rounded-full blur-2xl z-0" />
          
          {/* Image Container with floating animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 w-full max-w-[320px] sm:max-w-[420px]"
          >
            {/* Background puffed rice stack mockup representation */}
            <div className="absolute -right-6 bottom-4 w-28 h-28 bg-[#D71920] rounded-full shadow-lg border-4 border-white flex flex-col items-center justify-center text-white z-20 rotate-12">
              <span className="text-[10px] font-heading font-black tracking-widest uppercase">Best Quality</span>
              <span className="text-sm font-heading font-bold mt-1">LOTUS</span>
            </div>

            {/* Puffed rice bowl container */}
            <div className="absolute -left-12 bottom-6 w-32 h-20 bg-[#F8F9FA] rounded-b-full border-t-4 border-[#D71920] shadow-md z-0 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[#E5E7EB] opacity-40 flex flex-wrap gap-1 p-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2.5 h-1.5 bg-white rounded-full rotate-45" />
                ))}
              </div>
            </div>

            {/* The main bag image */}
            <motion.img
              src={lohithaBag}
              alt="Lohitha Murmura Package Bag"
              className="w-full h-auto drop-shadow-2xl object-contain relative z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

      </div>
    </div>
  </section>
);

export default HeroSection;
