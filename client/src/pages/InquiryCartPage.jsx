import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import { useCart } from '../context/CartContext';
import { createInquiry } from '../services/inquiryService';
import { buildWhatsAppURL } from '../utils/formatWhatsAppMessage';
import toast from 'react-hot-toast';
import {
  ShoppingCart, Trash2, Minus, Plus, Phone, MessageCircle,
  ArrowLeft, Package, AlertCircle, ChevronLeft
} from 'lucide-react';
import { PHONE_NUMBER, PHONE_DISPLAY, WHATSAPP_NUMBER } from '../constants';

/* ─── Cart Item Row ──────────────────────────────────────── */
const CartItemRow = ({ item, onRemove, onUpdate }) => {
  const handleDecrease = () => onUpdate(item.productId, Math.max(10, item.quantity - 10));
  const handleIncrease = () => onUpdate(item.productId, item.quantity + 10);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className="card p-4 flex gap-3 sm:gap-4"
    >
      {/* Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
        <img
          src={item.image || 'https://placehold.co/80x80/F8F9FA/2E3192?text=M'}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info + controls */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          {/* Product name — Blue */}
          <Link
            to={`/products/${item.slug}`}
            className="font-heading font-semibold text-blue text-sm sm:text-base hover:text-primary transition-colors line-clamp-1 flex-1"
          >
            {item.name}
          </Link>
          {/* Remove */}
          <button
            onClick={() => onRemove(item.productId)}
            className="flex-shrink-0 w-9 h-9 rounded-xl text-text-lighter hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Package className="w-3.5 h-3.5 text-text-lighter flex-shrink-0" aria-hidden />
          <span className="text-text-lighter text-xs">Bulk Order</span>
        </div>

        {/* Quantity stepper — selected quantity in Red */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={handleDecrease}
            className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:border-blue hover:text-blue active:scale-90 transition-all"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-heading font-bold text-primary text-sm min-w-[72px] text-center">
            {item.quantity} Bags
          </span>
          <button
            onClick={handleIncrease}
            className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:border-blue hover:text-blue active:scale-90 transition-all"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Page ──────────────────────────────────────────── */
const InquiryCartPage = () => {
  const { items, removeItem, updateQty, clearCart, totalBags, totalItems } = useCart();
  const [sending, setSending] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleWhatsApp = async () => {
    if (items.length === 0) return;
    setSending(true);
    try {
      await createInquiry({
        name: name || 'Walk-in Customer',
        phone,
        products: items.map((i) => ({
          productId: i.productId,
          productName: i.name,
          quantity: i.quantity,
        })),
        message: 'Inquiry via WhatsApp button',
      });
    } catch {}
    const url = buildWhatsAppURL(items, WHATSAPP_NUMBER);
    window.open(url, '_blank');
    toast.success('Opening WhatsApp...');
    setSending(false);
  };

  const previewMessage = () => {
    if (!items.length) return '';
    const lines = items.map((i) => `• ${i.name} - ${i.quantity} Bags`).join('\n');
    return `Hello Lohitha Murmura! 🙏\n\nI would like to place a bulk order:\n\n${lines}\n\nTotal: ${totalBags} Bags\n\nPlease share the quotation and delivery details.\n\nThank you!`;
  };

  return (
    <>
      <Helmet>
        <title>Inquiry Cart — Lohitha Murmura</title>
        <meta name="description" content="Review your selected products and contact Lohitha Murmura via WhatsApp or phone to place your bulk order." />
      </Helmet>

      <motion.div
        className="min-h-screen bg-secondary"
        style={{ paddingTop: '56px' }}
        {...pageTransition}
      >
        {/* Header — Blue background */}
        <div className="bg-blue text-white py-4 sm:py-6">
          <div className="container-custom">
            <div className="flex items-center gap-3">
              <Link
                to="/products"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
                aria-label="Back to products"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-heading font-bold text-white text-xl sm:text-2xl flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" aria-hidden />
                  Inquiry Cart
                  {totalItems > 0 && (
                    <span className="text-sm font-normal text-white/70">({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-5 sm:py-8">
          {items.length === 0 ? (
            /* ── Empty State ── */
            <motion.div
              className="flex flex-col items-center justify-center py-20 text-center px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-20 h-20 bg-blue/10 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-blue" />
              </div>
              <h2 className="font-heading font-semibold text-text text-xl sm:text-2xl mb-3">
                Your cart is empty
              </h2>
              <p className="text-text-light text-sm sm:text-base mb-8 max-w-xs">
                Browse our products and add items to your inquiry cart to contact us for bulk pricing.
              </p>
              <Link to="/products" className="btn-blue text-base px-8 py-3.5 min-h-[52px] w-full sm:w-auto justify-center">
                Browse Products
              </Link>
            </motion.div>
          ) : (
            /* ── Cart Content ── */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

              {/* Items column */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-heading font-semibold text-text text-base sm:text-lg">
                    Selected Products
                  </h2>
                  <button
                    onClick={() => { clearCart(); toast('Cart cleared'); }}
                    className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors min-h-[36px] px-2"
                  >
                    Clear all
                  </button>
                </div>

                <AnimatePresence>
                  {items.map((item) => (
                    <CartItemRow key={item.productId} item={item} onRemove={removeItem} onUpdate={updateQty} />
                  ))}
                </AnimatePresence>

                {/* Optional contact info */}
                <div className="card p-4 sm:p-6 mt-2 bg-white">
                  <h3 className="font-heading font-semibold text-text text-sm mb-4">
                    Your Details <span className="text-text-lighter font-normal">(Optional)</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="cart-name" className="label">Your Name</label>
                      <input id="cart-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ravi Kumar" className="input min-h-[48px]" autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="cart-phone" className="label">Your Phone</label>
                      <input id="cart-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210" className="input min-h-[48px]" autoComplete="tel" inputMode="tel" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary column */}
              <div className="space-y-4 sm:space-y-5">

                {/* Order Summary card */}
                <div className="card p-4 sm:p-6 bg-white">
                  {/* Header bar — Blue */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                    <div className="w-2 h-6 bg-blue rounded-full" />
                    <h2 className="font-heading font-semibold text-text">Order Summary</h2>
                  </div>
                  <div className="space-y-2.5 mb-4">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center gap-3 text-sm">
                        <span className="text-text-light line-clamp-1 flex-1">{item.name}</span>
                        <span className="font-semibold text-primary flex-shrink-0">{item.quantity} Bags</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-3.5 flex justify-between items-center">
                    <span className="font-heading font-semibold text-text">Total</span>
                    <span className="font-heading font-bold text-blue text-2xl">
                      {totalBags} Bags
                    </span>
                  </div>
                </div>

                {/* WhatsApp message preview */}
                <div className="card p-4 sm:p-5 bg-white">
                  <p className="font-heading font-semibold text-text text-sm mb-3">
                    WhatsApp Message Preview
                  </p>
                  <pre className="text-xs text-text-light whitespace-pre-wrap font-body leading-relaxed bg-secondary rounded-lg p-3 border border-border max-h-36 overflow-y-auto">
                    {previewMessage()}
                  </pre>
                </div>

                {/* Disclaimer */}
                <div className="flex gap-2 text-xs text-text-lighter px-1">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue" aria-hidden />
                  <p>No online payment. Orders are confirmed via WhatsApp or phone call.</p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {/* WhatsApp — green */}
                  <button
                    onClick={handleWhatsApp}
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white font-heading font-semibold text-base rounded-xl hover:bg-[#1da851] active:bg-[#168a40] transition-colors disabled:opacity-60 min-h-[56px]"
                    aria-label="Send inquiry via WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {sending ? 'Opening WhatsApp...' : 'Contact on WhatsApp'}
                  </button>

                  {/* Call — Blue */}
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-blue text-white font-heading font-semibold text-base rounded-xl hover:bg-blue-dark active:scale-[0.98] transition-all min-h-[56px]"
                    aria-label={`Call ${PHONE_DISPLAY}`}
                  >
                    <Phone className="w-5 h-5" />
                    Call Now · {PHONE_DISPLAY}
                  </a>

                  {/* Continue — Red outline */}
                  <Link
                    to="/products"
                    className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-primary text-primary font-heading font-semibold text-sm rounded-xl hover:bg-primary hover:text-white transition-all min-h-[48px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Browsing
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom spacer for mobile bottom bar */}
        <div className="h-24 lg:h-0" aria-hidden="true" />
      </motion.div>
    </>
  );
};

export default InquiryCartPage;
