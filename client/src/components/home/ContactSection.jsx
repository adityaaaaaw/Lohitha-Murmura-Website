import { motion } from 'framer-motion';
import { fadeUp } from '../../animations/variants';
import { ADDRESS, MAPS_LINK } from '../../constants';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const ContactSection = () => (
  <section id="contact" className="section-padding bg-background-alt" aria-label="Find Our Factory">
    <div className="container-custom">
      
      {/* Heading */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
      >
        <span className="badge-primary mb-3 inline-block">Location</span>
        <h2 className="section-heading">Find Our Factory</h2>
        <p className="section-subheading">
          Visit our manufacturing unit in Siddipet, Telangana to discuss bulk orders.
        </p>
      </motion.div>

      {/* Google Maps embed */}
      <motion.div
        className="rounded-2xl overflow-hidden shadow-card border border-border bg-white p-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
      >
        <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '45%' }}>
          <iframe
            title="Lohitha Murmura Factory — Siddipet, Telangana"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.0!2d78.852!3d18.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA2JzAwLjAiTiA3OMKwNTEnMDcuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        
        <div className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5 min-w-0">
            <MapPin className="w-5 h-5 text-[#D71920] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-text font-bold text-sm sm:text-base leading-snug">Lohitha Murmura Unit</p>
              <p className="text-text-light text-xs sm:text-sm mt-0.5 leading-relaxed">{ADDRESS}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 btn-primary text-sm px-6 py-3 min-h-[48px] rounded-xl font-bold"
            >
              <Navigation className="w-4 h-4 fill-current rotate-45" />
              Get Directions
            </a>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 btn-secondary text-sm px-6 py-3 min-h-[48px] rounded-xl font-bold"
            >
              <ExternalLink className="w-4 h-4" />
              Open Google Maps
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  </section>
);

export default ContactSection;
