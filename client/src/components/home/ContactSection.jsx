import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '../../animations/variants';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_NUMBER, ADDRESS, WORKING_HOURS, MAPS_LINK } from '../../constants';
import { Phone, MessageCircle, MapPin, Clock, ExternalLink, Navigation } from 'lucide-react';

const contactCards = [
  {
    id: 'address',
    icon: MapPin,
    label: 'Factory Address',
    value: ADDRESS,
    /* Location → Red */
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    action: { label: 'Get Directions', href: MAPS_LINK, external: true, style: 'red' },
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone Number',
    value: PHONE_DISPLAY,
    /* Phone → Blue */
    iconBg: 'bg-blue/10',
    iconColor: 'text-blue',
    action: { label: 'Call Now', href: `tel:${PHONE_NUMBER}`, style: 'blue' },
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    value: PHONE_DISPLAY,
    /* WhatsApp → Green */
    iconBg: 'bg-[#25D366]/10',
    iconColor: 'text-[#25D366]',
    action: {
      label: 'Chat on WhatsApp',
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Lohitha Murmura! I would like to place a bulk order.')}`,
      external: true,
      style: 'whatsapp',
    },
  },
  {
    id: 'hours',
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon – Sat',
    sub: '8:00 AM – 6:00 PM',
    /* Hours → Blue */
    iconBg: 'bg-blue/10',
    iconColor: 'text-blue',
  },
];

const btnStyle = {
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1da851]',
  blue: 'bg-blue text-white hover:bg-primary',
  red: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

const ContactSection = () => (
  <section id="contact" className="section-padding bg-white" aria-label="Contact information">
    <div className="container-custom">

      {/* Heading */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
      >
        <span className="badge-blue mb-3 inline-block">Get In Touch</span>
        <h2 className="section-heading">Contact Our Factory</h2>
        <p className="section-subheading">
          Reach out directly to place bulk orders or visit our factory in Siddipet.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={staggerContainer}
      >
        {contactCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.id} variants={staggerItem} className="card p-5 sm:p-6 flex flex-col gap-4">
              {/* Icon + Label */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <p className="text-text-light text-xs font-semibold uppercase tracking-wider">{card.label}</p>
              </div>

              {/* Value */}
              <div className="flex-1">
                <p className="text-text font-semibold text-base leading-snug">{card.value}</p>
                {card.sub && <p className="text-text-light text-sm mt-0.5">{card.sub}</p>}
              </div>

              {/* Action button */}
              {card.action && (
                <a
                  href={card.action.href}
                  target={card.action.external ? '_blank' : undefined}
                  rel={card.action.external ? 'noreferrer' : undefined}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold font-heading min-h-[48px] transition-all duration-300 ${btnStyle[card.action.style]}`}
                >
                  {card.id === 'phone' && <Phone className="w-4 h-4" />}
                  {card.id === 'whatsapp' && <MessageCircle className="w-4 h-4" />}
                  {card.id === 'address' && <Navigation className="w-4 h-4" />}
                  {card.action.label}
                </a>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick action row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-14">
        <a href={`tel:${PHONE_NUMBER}`} className="flex-1 flex items-center justify-center gap-2 min-h-[52px] btn-blue text-base rounded-xl">
          <Phone className="w-5 h-5" /> Call Now
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Lohitha Murmura! I would like to place a bulk order. Please share details.')}`}
          target="_blank" rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 min-h-[52px] bg-[#25D366] text-white font-heading font-semibold text-base rounded-xl hover:bg-[#1da851] transition-colors"
        >
          <MessageCircle className="w-5 h-5" /> WhatsApp Us
        </a>
        <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 min-h-[52px] btn-primary text-base rounded-xl">
          <Navigation className="w-5 h-5" /> Get Directions
        </a>
      </div>

      {/* Google Maps embed */}
      <motion.div
        className="rounded-xl sm:rounded-2xl overflow-hidden shadow-card border border-border"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            title="Lohitha Murmura Factory — Siddipet, Telangana"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.5!2d78.8507!3d18.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbff3b9e9e9e9f%3A0x0!2sSiddipet%2C+Telangana+502103!5e0!3m2!1sen!2sin!4v1234567890"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="bg-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2 min-w-0">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-text-light text-sm leading-snug">{ADDRESS}</p>
          </div>
          <a href={MAPS_LINK} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-blue text-sm font-semibold whitespace-nowrap hover:text-primary transition-colors flex-shrink-0 min-h-[44px]"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open in Maps
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
