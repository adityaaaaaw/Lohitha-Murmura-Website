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
    iconBg: 'bg-[#D71920]/10',
    iconColor: 'text-[#D71920]',
    action: { label: 'Get Directions', href: MAPS_LINK, external: true, style: 'red' },
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone Number',
    value: PHONE_DISPLAY,
    iconBg: 'bg-[#2E3192]/10',
    iconColor: 'text-[#2E3192]',
    action: { label: 'Call Now', href: `tel:${PHONE_NUMBER}`, style: 'blue' },
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us online',
    iconBg: 'bg-[#1F6B3A]/10',
    iconColor: 'text-[#1F6B3A]',
    action: {
      label: 'Chat on WhatsApp',
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Lohitha Murmura! I would like to place a bulk order.')}`,
      external: true,
      style: 'green',
    },
  },
  {
    id: 'hours',
    icon: Clock,
    label: 'Working Hours',
    value: WORKING_HOURS,
    iconBg: 'bg-[#2E3192]/10',
    iconColor: 'text-[#2E3192]',
  },
];

const btnStyle = {
  green: 'bg-[#1F6B3A] text-white hover:bg-[#155229]',
  blue: 'bg-[#2E3192] text-white hover:bg-[#1e2070]',
  red: 'bg-[#D71920] text-white hover:bg-[#b01318]',
};

const ContactSection = () => (
  <section id="contact" className="section-padding bg-background-alt" aria-label="Contact information">
    <div className="container-custom">

      {/* Heading */}
      <motion.div
        className="text-center mb-10 sm:mb-14"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
      >
        <span className="badge-blue mb-3 inline-block">Get In Touch</span>
        <h2 className="section-heading">Contact Our Factory</h2>
        <p className="section-subheading">
          Reach out directly to place bulk orders or visit our factory in Siddipet.
        </p>
      </motion.div>

      {/* Contact Cards — stacked vertically on mobile, 4 columns on lg */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={staggerContainer}
      >
        {contactCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              variants={staggerItem}
              className="card p-6 sm:p-7 flex flex-col justify-between gap-5 bg-white shadow-soft hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Large Icon Container */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-text font-heading font-black text-sm uppercase tracking-wider">
                    {card.label}
                  </h3>
                </div>

                {/* Details */}
                <p className="text-text-light text-sm sm:text-base leading-relaxed font-semibold">
                  {card.value}
                </p>
              </div>

              {/* Large Action Button */}
              {card.action ? (
                <a
                  href={card.action.href}
                  target={card.action.external ? '_blank' : undefined}
                  rel={card.action.external ? 'noreferrer' : undefined}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-heading font-bold min-h-[48px] transition-all duration-300 ${btnStyle[card.action.style]}`}
                >
                  {card.id === 'phone' && <Phone className="w-4 h-4" />}
                  {card.id === 'whatsapp' && <MessageCircle className="w-4 h-4 fill-current" />}
                  {card.id === 'address' && <Navigation className="w-4 h-4 fill-current" />}
                  {card.action.label}
                </a>
              ) : (
                <div className="min-h-[48px] hidden sm:block" />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Google Maps embed and responsive action buttons */}
      <motion.div
        className="rounded-2xl overflow-hidden shadow-card border border-border bg-white p-2"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
      >
        <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '45%' }}>
          <iframe
            title="Lohitha Murmura Factory Maps Pin — Siddipet"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.0!2d78.852!3d18.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA2JzAwLjAiTiA3OMKwNTEnMDcuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
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

          {/* Full-width "Get Directions" button below it on mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 btn-primary text-sm px-6 py-3.5 min-h-[48px] rounded-xl font-bold w-full sm:w-auto"
            >
              <Navigation className="w-4 h-4 fill-current rotate-45" />
              Get Directions
            </a>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 btn-secondary text-sm px-6 py-3.5 min-h-[48px] rounded-xl font-bold w-full sm:w-auto"
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
