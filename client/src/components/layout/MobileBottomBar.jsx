import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '../../constants';

const MobileBottomBar = () => {
  const { totalItems } = useCart();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t-2 border-border"
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.10)' }}
    >
      <div className="grid grid-cols-3" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>

        {/* Call Now — Blue */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex flex-col items-center justify-center gap-1 py-3 min-h-[64px] text-text hover:bg-blue/5 active:bg-blue/10 transition-colors border-r border-border"
          aria-label="Call Lohitha Murmura"
        >
          <div className="w-9 h-9 bg-blue/10 rounded-xl flex items-center justify-center">
            <Phone className="w-5 h-5 text-blue" />
          </div>
          <span className="text-[11px] font-semibold font-heading text-text leading-none">Call Now</span>
        </a>

        {/* WhatsApp — stays green */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Lohitha Murmura! I would like to enquire about bulk murmura orders.')}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 min-h-[64px] bg-[#25D366] hover:bg-[#1da851] active:bg-[#168a40] transition-colors"
          aria-label="WhatsApp Lohitha Murmura"
        >
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-[11px] font-semibold font-heading text-white leading-none">WhatsApp</span>
        </a>

        {/* Inquiry Cart — Red badge */}
        <Link
          to="/cart"
          className="relative flex flex-col items-center justify-center gap-1 py-3 min-h-[64px] text-text hover:bg-primary/5 active:bg-primary/10 transition-colors border-l border-border"
          aria-label={`Inquiry cart, ${totalItems} items`}
        >
          <div className="relative w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold font-heading text-text leading-none">Inquiry Cart</span>
        </Link>

      </div>
    </div>
  );
};

export default MobileBottomBar;
