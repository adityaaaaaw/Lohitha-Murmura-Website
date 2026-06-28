import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem, fadeUp } from '../animations/variants';
import { getProductBySlug } from '../services/productService';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import LazyImage from '../components/ui/LazyImage';
import {
  ShoppingCart, Package, CheckCircle2, Star,
  ChevronLeft, ChevronRight, MessageCircle, ArrowLeft
} from 'lucide-react';
import { QUANTITY_OPTIONS, WHATSAPP_NUMBER, PHONE_NUMBER, PHONE_DISPLAY } from '../constants';
import { buildWhatsAppURL } from '../utils/formatWhatsAppMessage';
import { ProductCardSkeleton } from '../components/ui/Skeleton';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedQty, setSelectedQty] = useState(50);
  const [customQty, setCustomQty] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.productId === product?._id);

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then((res) => {
        setProduct(res.data);
        setSelectedQty(res.data.availableQuantities?.[0] || 50);
      })
      .catch(() => navigate('/404'))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const effectiveQty = showCustom ? (parseInt(customQty) || selectedQty) : selectedQty;

  const handleAdd = () => {
    if (effectiveQty < 1) return toast.error('Enter a valid quantity');
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      quantity: effectiveQty,
      image: product.images?.[0]?.url || '',
    });
    toast.success(`${product.name} (${effectiveQty} bags) added!`);
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppURL([{ name: product.name, quantity: effectiveQty }]);
    window.open(url, '_blank');
  };

  const quantities = product?.availableQuantities?.length
    ? product.availableQuantities
    : QUANTITY_OPTIONS;

  if (loading) return (
    <div className="pt-14 sm:pt-16 container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-64 bg-secondary rounded-xl animate-pulse" />
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-10 bg-border/40 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );

  if (!product) return null;

  return (
    <>
      <Helmet>
        <title>{product.name} — Lohitha Murmura | Bulk Wholesale</title>
        <meta name="description" content={`${product.description} Available in bulk quantities of ${quantities.join(', ')} bags. Factory direct pricing. Call +91 9848684411.`} />
      </Helmet>

      <motion.div
        className="min-h-screen bg-background"
        style={{ paddingTop: '56px' }}
        {...pageTransition}
      >
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="container-custom py-3 flex items-center gap-2 text-sm text-text-light overflow-x-auto scrollbar-hide whitespace-nowrap">
            <Link to="/" className="hover:text-blue shrink-0 min-h-[44px] flex items-center">Home</Link>
            <span className="shrink-0">/</span>
            <Link to="/products" className="hover:text-blue shrink-0 min-h-[44px] flex items-center">Products</Link>
            <span className="shrink-0">/</span>
            <span className="text-text font-medium truncate">{product.name}</span>
          </div>
        </div>

        <div className="container-custom py-5 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">

            {/* ── Image Gallery ── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              {/* Main image — taller on mobile */}
              <div className="rounded-xl sm:rounded-2xl overflow-hidden aspect-square bg-white shadow-card mb-3 relative">
                <LazyImage
                  src={product.images?.[activeImage]?.url || 'https://placehold.co/600x600/FFF8E7/B9770E?text=Murmura'}
                  alt={product.images?.[activeImage]?.alt || product.name}
                  className="w-full h-full"
                />
                {/* Prev / Next arrows — larger on mobile */}
                {product.images?.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((p) => (p - 1 + product.images.length) % product.images.length)}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 bg-white/90 rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 text-text" />
                    </button>
                    <button
                      onClick={() => setActiveImage((p) => (p + 1) % product.images.length)}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 bg-white/90 rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 text-text" />
                    </button>
                    {/* Dot indicators on mobile */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {product.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`transition-all rounded-full ${activeImage === i ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-white/70'}`}
                          aria-label={`View image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails — horizontal scroll on mobile */}
              {product.images?.length > 1 && (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === i
                          ? 'border-primary shadow-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                      aria-label={`Select image ${i + 1}`}
                    >
                      <LazyImage src={img.url} alt={img.alt || product.name} className="w-full h-full" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── Product Info ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4 sm:gap-5"
            >
              {/* Badges */}
              <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
                {product.badges?.map((b, i) => (
                  <span key={i} className="badge-green">{b}</span>
                ))}
              </motion.div>

              {/* Name + stars */}
              <motion.div variants={staggerItem}>
                <h1 className="font-heading font-bold text-blue text-2xl sm:text-3xl md:text-4xl mb-2 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5" aria-label="5 star rating">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-4 h-4 text-primary fill-primary" aria-hidden />
                    ))}
                  </div>
                  <span className="text-text-light text-sm">Factory Fresh Quality</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p variants={staggerItem} className="text-text-light leading-relaxed text-sm sm:text-base">
                {product.description}
              </motion.p>

              {/* Details grid */}
              <motion.div variants={staggerItem} className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-xl p-3 sm:p-4">
                  <p className="text-text-lighter text-[10px] font-semibold uppercase tracking-wider mb-1">Packaging</p>
                  <p className="text-text font-semibold text-sm">{product.packaging || '25kg bags'}</p>
                </div>
                <div className="bg-background rounded-xl p-3 sm:p-4">
                  <p className="text-text-lighter text-[10px] font-semibold uppercase tracking-wider mb-1">Category</p>
                  <p className="text-text font-semibold text-sm">{product.category?.name || 'Murmura'}</p>
                </div>
              </motion.div>

              <div className="border-t border-border" />

              {/* Quantity Selection */}
              <motion.div variants={staggerItem}>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-text-light" aria-hidden />
                  <p className="font-heading font-semibold text-text text-sm">Select Bulk Quantity</p>
                </div>

                {/* Qty chips — large enough to tap */}
                <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Select bulk quantity">
                  {quantities.map((qty) => (
                    <button
                      key={qty}
                      onClick={() => { setSelectedQty(qty); setShowCustom(false); }}
                      className={`px-4 py-2.5 rounded-xl font-heading font-semibold text-sm border-2 transition-all min-h-[48px] min-w-[72px] active:scale-95 ${
                        !showCustom && selectedQty === qty
                          ? 'bg-primary text-white border-primary shadow-primary'
                          : 'border-border text-text-light hover:border-blue hover:text-blue bg-white'
                      }`}
                      aria-pressed={!showCustom && selectedQty === qty}
                    >
                      {qty} Bags
                    </button>
                  ))}
                  <button
                    onClick={() => setShowCustom(true)}
                    className={`px-4 py-2.5 rounded-xl font-heading font-semibold text-sm border-2 transition-all min-h-[48px] active:scale-95 ${
                      showCustom
                        ? 'bg-primary text-white border-primary'
                        : 'border-dashed border-border text-text-lighter hover:border-primary hover:text-primary bg-white'
                    }`}
                    aria-pressed={showCustom}
                  >
                    Custom
                  </button>
                </div>

                {/* Custom input */}
                {showCustom && (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      inputMode="numeric"
                      value={customQty}
                      onChange={(e) => setCustomQty(e.target.value)}
                      placeholder="Enter quantity"
                      className="input max-w-[180px] sm:max-w-xs"
                      aria-label="Custom quantity in bags"
                      autoFocus
                    />
                    <span className="text-text-light text-sm font-medium">Bags</span>
                  </div>
                )}
              </motion.div>

              {/* CTA Buttons — stacked on mobile */}
              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3">
                {/* Add to Inquiry — Blue hover→Red */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-heading font-semibold text-base transition-all duration-300 min-h-[56px] active:scale-[0.98] ${
                    inCart
                      ? 'bg-accent/10 text-accent border-2 border-accent/30'
                      : 'bg-blue text-white hover:bg-primary hover:shadow-primary'
                  }`}
                  aria-label={inCart ? 'Already in inquiry cart' : 'Add to inquiry cart'}
                >
                  {inCart ? <CheckCircle2 className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  {inCart ? 'Added to Inquiry' : 'Add to Inquiry Cart'}
                </button>
                {/* WhatsApp — Green */}
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 sm:px-6 py-4 rounded-xl font-heading font-semibold text-base bg-[#25D366] text-white hover:bg-[#1da851] active:bg-[#168a40] transition-colors min-h-[56px]"
                  aria-label="Order directly via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="sm:hidden">Order on WhatsApp</span>
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
              </motion.div>

              {/* Disclaimer */}
              <motion.p variants={staggerItem} className="text-text-lighter text-xs leading-relaxed">
                ⓘ This is a wholesale catalogue. No online payment. Orders placed via WhatsApp or phone.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Bottom spacer for mobile bottom bar */}
        <div className="h-24 lg:h-0" aria-hidden="true" />
      </motion.div>
    </>
  );
};

export default ProductDetailPage;
