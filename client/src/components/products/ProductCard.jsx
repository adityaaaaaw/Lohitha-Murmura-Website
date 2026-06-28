import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Package, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import LazyImage from '../ui/LazyImage';
import { QUANTITY_OPTIONS } from '../../constants';

/* Badge styling by keyword */
const badgeClass = (badge) => {
  const b = badge.toLowerCase();
  if (b.includes('fresh') || b.includes('factory') || b.includes('direct') || b.includes('daily')) return 'badge-green';
  if (b.includes('best') || b.includes('quality') || b.includes('seller') || b.includes('featured')) return 'badge-primary';
  return 'badge-blue'; // Bulk, Orders, etc.
};

const ProductCard = ({ product }) => {
  const [selectedQty, setSelectedQty] = useState(
    product.availableQuantities?.[0] || 50
  );
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customQty, setCustomQty] = useState('');
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.productId === product._id);

  const quantities = product.availableQuantities?.length
    ? product.availableQuantities
    : QUANTITY_OPTIONS;

  const effectiveQty = showCustomInput ? (parseInt(customQty) || selectedQty) : selectedQty;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (effectiveQty < 1) return toast.error('Enter a valid quantity');
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      quantity: effectiveQty,
      image: product.images?.[0]?.url || '',
    });
    toast.success(`${product.name} added to inquiry!`);
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card overflow-hidden flex flex-col h-full group"
    >
      {/* Image */}
      <Link to={`/products/${product.slug}`} className="block relative flex-shrink-0" tabIndex={-1} aria-hidden="true">
        <div className="aspect-[4/3] sm:aspect-[3/2] overflow-hidden bg-secondary">
          <LazyImage
            src={product.images?.[0]?.url || 'https://placehold.co/400x300/F8F9FA/2E3192?text=Murmura'}
            alt={product.images?.[0]?.alt || product.name}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 max-w-[70%]">
          {product.badges?.slice(0, 2).map((badge, i) => (
            <span key={i} className={`${badgeClass(badge)} text-[10px] sm:text-xs`}>{badge}</span>
          ))}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">

        {/* Name — Blue */}
        <div>
          <Link to={`/products/${product.slug}`} className="hover:text-primary transition-colors block" aria-label={`View ${product.name} details`}>
            <h3 className="font-heading font-semibold text-blue text-lg leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
          {/* Stars */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex gap-0.5" aria-label="5 star rating">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 text-primary fill-primary" aria-hidden="true" />
              ))}
            </div>
            <span className="text-text-lighter text-xs">Factory Fresh</span>
          </div>
        </div>

        {/* Description — dark gray */}
        <p className="text-text-light text-sm leading-relaxed line-clamp-2 flex-shrink-0">
          {product.description}
        </p>

        {/* Available label */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Package className="w-3.5 h-3.5 text-text-lighter flex-shrink-0" aria-hidden />
          <span className="text-text-lighter text-xs font-medium">Available in Bulk</span>
        </div>

        {/* Qty chips — selected=Red, hover=Blue */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select quantity">
          {quantities.map((qty) => (
            <button
              key={qty}
              onClick={() => { setSelectedQty(qty); setShowCustomInput(false); }}
              className={`text-sm font-semibold px-3.5 py-2 rounded-full border transition-all duration-200 min-h-[40px] min-w-[60px] ${
                !showCustomInput && selectedQty === qty
                  ? 'bg-primary text-white border-primary shadow-sm'           /* Selected = Red */
                  : 'border-border text-text-light hover:border-blue hover:text-blue bg-white active:scale-95'  /* Hover = Blue */
              }`}
              aria-pressed={!showCustomInput && selectedQty === qty}
            >
              {qty}
            </button>
          ))}
          <button
            onClick={() => setShowCustomInput(true)}
            className={`text-sm font-semibold px-3.5 py-2 rounded-full border min-h-[40px] transition-all duration-200 ${
              showCustomInput
                ? 'bg-primary text-white border-primary'
                : 'border-dashed border-border text-text-lighter hover:border-blue hover:text-blue bg-white'
            }`}
            aria-pressed={showCustomInput}
          >
            Custom
          </button>
        </div>

        {/* Custom input */}
        {showCustomInput && (
          <div className="flex items-center gap-2">
            <input
              type="number" min="1" value={customQty} onChange={(e) => setCustomQty(e.target.value)}
              placeholder="e.g. 250" className="input text-sm py-2.5 flex-1"
              aria-label="Custom quantity in bags" autoFocus
            />
            <span className="text-text-light text-sm font-medium whitespace-nowrap">Bags</span>
          </div>
        )}

        {/* Add to Inquiry — Blue, hover=Red */}
        <button
          onClick={handleAdd}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-heading font-semibold text-sm min-h-[52px] transition-all duration-300 active:scale-[0.98] ${
            inCart
              ? 'bg-accent/10 text-accent border-2 border-accent/30'
              : 'bg-blue text-white hover:bg-primary hover:shadow-primary'
          }`}
          aria-label={inCart ? `${product.name} already in inquiry cart` : `Add ${product.name} to inquiry cart`}
        >
          {inCart ? (
            <><CheckCircle2 className="w-4 h-4 flex-shrink-0" />Added to Inquiry</>
          ) : (
            <><ShoppingCart className="w-4 h-4 flex-shrink-0" />Add to Inquiry</>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
