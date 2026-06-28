import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { CheckCircle2, ArrowRight, Wheat } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '../../constants';

const highlights = [
  'Factory Direct',
  'Fresh Every Day',
  'Bulk Supply Only',
];

const HeroSection = () => (
  <section
    className="relative min-h-[100svh] flex items-center bg-background overflow-hidden pt-14 sm:pt-16"
    aria-label="Lohitha Murmura hero section"
  >
    {/* Decorative blobs — lighter on mobile for performance */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-16 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-16 left-0 w-56 h-56 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl" />
    </div>

    <div className="container-custom w-full py-10 sm:py-16 md:py-24 relative z-10">
      {/* Content — centered on mobile, left-aligned on lg+ */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0">

        {/* Wholesale badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-2 mb-6 sm:mb-8"
        >
          <Wheat className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold leading-none">Wholesale Factory · Siddipet, Telangana</span>
        </motion.div>

        {/* Main heading — fluid size */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-extrabold text-text leading-[1.05] mb-3 sm:mb-4"
          style={{ fontSize: 'clamp(2.4rem, 10vw, 5.5rem)' }}
        >
          LOHITHA
          <br />
          <span className="text-gradient">MURMURA</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading font-semibold text-primary text-lg sm:text-xl md:text-2xl mb-1.5"
        >
          Factory Fresh Murmura
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="font-heading text-text-light text-base sm:text-lg mb-4 sm:mb-5"
        >
          Bulk Orders Only
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-text-light text-base sm:text-lg leading-relaxed mb-7 sm:mb-9 max-w-xl"
        >
          Serving Wholesalers, Retailers &amp; Distributors across{' '}
          <span className="text-text font-semibold">Telangana &amp; Andhra Pradesh</span>
        </motion.p>

        {/* Feature chips */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3 mb-8 sm:mb-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2.5 shadow-soft"
            >
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-text font-medium text-sm leading-none">{h}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons — full width on mobile, auto on larger */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 w-full sm:w-auto btn-primary text-base px-8 py-4 min-h-[52px] rounded-xl"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 w-full sm:w-auto btn-secondary text-base px-8 py-4 min-h-[52px] rounded-xl"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Trust note */}
        <motion.p
          className="mt-6 text-text-lighter text-xs sm:text-sm flex items-center gap-1.5 justify-center lg:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0" />
          Minimum order: 50 bags · Delivery across Telangana
        </motion.p>
      </div>
    </div>

    {/* Wave divider */}
    <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
      <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
        <path d="M0 48V24C360 0 720 48 1080 24C1260 12 1380 0 1440 0V48H0Z" fill="white" />
      </svg>
    </div>
  </section>
);

export default HeroSection;
