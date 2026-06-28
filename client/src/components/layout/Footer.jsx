import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock, Wheat, Share2, Globe, Play } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_NUMBER, ADDRESS, WORKING_HOURS, MAPS_LINK } from '../../constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-text text-white">
      {/* Main content — stacked on mobile, grid on larger */}
      <div className="container-custom py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center sm:text-left">

          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Wheat className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-sm leading-none">LOHITHA</p>
                <p className="font-heading font-bold text-secondary text-xs leading-none tracking-widest">MURMURA</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              Premium murmura manufacturer supplying retailers, wholesalers and distributors with factory-fresh murmura across Telangana.
            </p>
            {/* Social links — 48px touch targets */}
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                <Play className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-heading font-semibold text-white mb-4 text-base">Quick Links</h3>
            <ul className="space-y-1">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'About Us', href: '/#about' },
                { label: 'Contact', href: '/#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/60 text-sm hover:text-secondary transition-colors min-h-[44px] flex items-center justify-center sm:justify-start"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/cart"
                  className="text-white/60 text-sm hover:text-secondary transition-colors min-h-[44px] flex items-center justify-center sm:justify-start"
                >
                  Inquiry Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-heading font-semibold text-white mb-4 text-base">Contact Us</h3>
            <ul className="space-y-2 w-full">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-center sm:justify-start gap-3 text-white/60 text-sm hover:text-secondary transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-3 text-white/60 text-sm hover:text-secondary transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:lohithamurmura@gmail.com"
                  className="flex items-center justify-center sm:justify-start gap-3 text-white/60 text-sm hover:text-secondary transition-colors min-h-[44px]"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  lohithamurmura@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-white/60 text-sm min-h-[36px]">
                <Clock className="w-4 h-4 flex-shrink-0" />
                {WORKING_HOURS}
              </li>
            </ul>
          </div>

          {/* Factory Location */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-heading font-semibold text-white mb-4 text-base">Factory Location</h3>
            <div className="flex items-start justify-center sm:justify-start gap-2 text-white/60 text-sm mb-4 max-w-xs">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
              <span className="leading-relaxed text-center sm:text-left">{ADDRESS}</span>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:underline min-h-[44px]"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4 sm:py-5 flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between text-center sm:text-left">
          <p className="text-white/40 text-xs sm:text-sm">
            © {year} Lohitha Murmura. All rights reserved.
          </p>
          <p className="text-white/40 text-xs sm:text-sm">
            Bulk Orders Only · Factory Direct
          </p>
        </div>
        {/* Bottom spacer for mobile bottom bar */}
        <div className="h-16 lg:hidden" aria-hidden="true" />
      </div>
    </footer>
  );
};

export default Footer;
