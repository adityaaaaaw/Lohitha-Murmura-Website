import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem, fadeUp } from '../../animations/variants';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFeaturedProducts } from '../../services/productService';
import ProductCard from '../products/ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="products" className="section-padding bg-background" aria-label="Featured products">
      <div className="container-custom">
        {/* Header — stacks on mobile */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div>
            <span className="badge-primary mb-3 inline-block">Our Products</span>
            <h2 className="section-heading">Featured Products</h2>
            <p className="text-text-light mt-2 max-w-lg text-sm sm:text-base">
              Factory-fresh murmura varieties available in bulk quantities for wholesalers and retailers.
            </p>
          </div>
          <Link
            to="/products"
            className="sm:inline-flex hidden items-center gap-2 text-primary font-semibold font-heading hover:gap-3 transition-all duration-200 group whitespace-nowrap min-h-[44px]"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {[1, 2, 3, 4].map((i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-text-light">
            <p className="text-base sm:text-lg">Products coming soon. Contact us for enquiries.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={staggerItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All — full-width button on mobile only */}
        <div className="mt-8 sm:hidden">
          <Link
            to="/products"
            className="w-full flex items-center justify-center gap-2 btn-secondary text-base min-h-[52px] rounded-xl"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
