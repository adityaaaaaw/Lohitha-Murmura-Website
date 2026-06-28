import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import { PHONE_NUMBER, PHONE_DISPLAY, WHATSAPP_NUMBER, ADDRESS, MAPS_LINK, WORKING_HOURS } from '../../constants';

const ContactInfoBar = () => {
  const cards = [
    {
      icon: MapPin,
      title: 'Factory Address',
      desc: 'Siddipet, Telangana, India',
      href: MAPS_LINK,
      external: true,
    },
    {
      icon: Phone,
      title: 'Call Us',
      desc: PHONE_DISPLAY,
      href: `tel:${PHONE_NUMBER}`,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      desc: 'Chat with us',
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      external: true,
    },
    {
      icon: Clock,
      title: 'Working Hours',
      desc: WORKING_HOURS,
    },
  ];

  return (
    <div className="bg-[#1F6B3A] text-white py-4 relative z-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4 items-center">
          
          {cards.map((card, i) => {
            const Icon = card.icon;
            const CardContent = (
              <div className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 h-full">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-heading font-black tracking-wider uppercase opacity-75">
                    {card.title}
                  </p>
                  <p className="text-sm font-semibold truncate leading-tight mt-0.5">
                    {card.desc}
                  </p>
                </div>
              </div>
            );

            if (card.href) {
              return (
                <a
                  key={i}
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noreferrer' : undefined}
                  className="block h-full cursor-pointer"
                >
                  {CardContent}
                </a>
              );
            }

            return <div key={i} className="h-full">{CardContent}</div>;
          })}

          {/* Card 5: Get Directions Red Button */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-[#D71920] hover:bg-[#b01318] text-white font-heading font-bold text-sm px-6 py-4 rounded-xl shadow-md transition-all duration-300 active:scale-[0.98] w-full h-full min-h-[52px]"
          >
            <Navigation className="w-4 h-4 fill-current rotate-45" />
            Get Directions
          </a>

        </div>
      </div>
    </div>
  );
};

export default ContactInfoBar;
