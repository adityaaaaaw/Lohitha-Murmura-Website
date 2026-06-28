import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, Minus, Plus, MessageCircle, Phone, ArrowLeft, Package, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WHATSAPP_NUMBER, PHONE_NUMBER, PHONE_DISPLAY } from '../../constants';
import { buildWhatsAppURL } from '../../utils/formatWhatsAppMessage';
import toast from 'react-hot-toast';

const InquiryCartDrawer = () => {
  const { isCartOpen, setCartOpen, items, removeItem, updateQty, clearCart, totalBags, totalItems } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleWhatsApp = () => {
    const url = buildWhatsAppURL(items, WHATSAPP_NUMBER);
    window.open(url, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const previewMessage = () => {
    if (!items.length) return '';
    const lines = items.map((i) => `• ${i.name} - ${i.quantity} Bags`).join('\n');
    return `Hello Lohitha Murmura! 🙏\n\nI would like to place a bulk order:\n\n${lines}\n\nTotal: ${totalBags} Bags\n\nPlease share the quotation and delivery details.\n\nThank you!`;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50 z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[460px] bg-white z-50 shadow-hover flex flex-col font-body"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Inquiry Cart Drawer"
          >
            {/* Header — Blue background */}
            <div className="bg-[#2E3192] text-white px-5 py-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="font-heading font-bold text-lg">Inquiry Cart</h2>
                <span className="bg-[#D71920] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors text-white"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-background">
                <div className="w-16 h-16 bg-[#2E3192]/10 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-[#2E3192]" />
                </div>
                <h3 className="font-heading font-semibold text-text text-lg mb-1.5">Your cart is empty</h3>
                <p className="text-text-light text-sm max-w-xs mb-6">
                  Select murmura quantities and add them to your inquiry cart to request a direct factory quotation.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="btn-blue text-sm min-h-[48px] px-6 rounded-xl font-bold"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                {/* Scrollable Items list */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-background">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-light font-medium">Selected Products</span>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Clear all
                    </button>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="bg-white rounded-2xl border border-border p-4 flex gap-3 sm:gap-4 shadow-soft transition-all hover:shadow-md"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || 'https://placehold.co/80x80/F8F9FA/2E3192?text=M'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Detail Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-heading font-bold text-[#2E3192] text-sm sm:text-base leading-snug truncate">
                            {item.name}
                          </p>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-text-lighter hover:text-red-500 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Stepper with selected quantity in Red */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.productId, Math.max(10, item.quantity - 10))}
                              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-blue hover:text-blue active:scale-95 transition-all"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-heading font-black text-[#D71920] text-sm min-w-[50px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.productId, item.quantity + 10)}
                              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-blue hover:text-blue active:scale-95 transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-text-lighter font-medium">Bags</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary & Checkout Actions */}
                <div className="border-t border-border bg-white p-4 sm:p-5 space-y-4 shadow-2xl">
                  {/* Summary row */}
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <div>
                      <p className="font-heading font-bold text-text text-sm">Total Inquiry</p>
                      <p className="text-text-lighter text-xs mt-0.5">Direct factory delivery</p>
                    </div>
                    <p className="font-heading font-black text-[#2E3192] text-2xl">
                      {totalBags} Bags
                    </p>
                  </div>

                  {/* Warning disclaimer */}
                  <div className="flex gap-2 text-xs text-text-lighter bg-secondary p-3 rounded-xl border border-border">
                    <AlertCircle className="w-4 h-4 text-[#2E3192] shrink-0 mt-0.5" />
                    <p>Wholesale Factory rate quotes. WhatsApp message compiles automatically.</p>
                  </div>

                  {/* Actions buttons */}
                  <div className="space-y-2">
                    {/* Chat on WhatsApp */}
                    <button
                      onClick={handleWhatsApp}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1F6B3A] text-white font-heading font-semibold text-base rounded-xl hover:bg-[#155229] transition-colors min-h-[50px]"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      Chat on WhatsApp
                    </button>

                    {/* Call Now */}
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2E3192] text-white font-heading font-semibold text-base rounded-xl hover:bg-[#1e2070] transition-colors min-h-[50px]"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now: {PHONE_DISPLAY}
                    </a>

                    {/* Continue Browsing */}
                    <button
                      onClick={() => setCartOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 border border-[#D71920] text-[#D71920] font-heading font-semibold text-sm rounded-xl hover:bg-[#D71920] hover:text-white transition-all min-h-[46px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Continue Browsing
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InquiryCartDrawer;
