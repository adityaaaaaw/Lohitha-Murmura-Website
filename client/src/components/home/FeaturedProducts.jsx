import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem, fadeUp } from '../../animations/variants';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFeaturedProducts } from '../../services/productService';
import ProductCard from '../products/ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

const LotusDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4">
    <span className="h-[2px] bg-[#D71920]/30 w-12 sm:w-24"></span>
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#D71920] fill-current">
      <path d="M12 22c-1.5-2.2-3.1-3.9-4.9-5.1C4.4 15.3 2.5 14.9 1 15.3c1.3-1.8 3-3.2 5-4.2C4.5 9.7 3 8 1.8 6c2 .4 3.8.2 5.4-.7C6.4 3.8 5.9 2 5.5 0.5c1.5 1 2.8 2.4 3.9 4.1C10 2.6 11 1 12-1c1 2 2 3.6 2.6 5.6 1.1-1.7 2.4-3.1 3.9-4.1-.4 1.5-.9 3.3-1.7 4.8 1.6.9 3.4 1.1 5.4.7-1.2 2-2.7 3.7-4.2 5.1 2 1 3.7 2.4 5 4.2-1.5-.4-3.4 0-6.1 1.6-1.8 1.2-3.4 2.9-4.9 5.1z" />
    </svg>
    <span className="h-[2px] bg-[#D71920]/30 w-12 sm:w-24"></span>
  </div>
);

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
    <section id="products" className="section-padding bg-white" aria-label="Featured products">
      <div className="container-custom">
        {/* Centered Heading */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <span className="badge-primary mb-3 inline-block">OUR PRODUCTS</span>
          <h2 className="section-heading text-center justify-center">Lohitha Puffed Rice</h2>
          <LotusDivider />
          <p className="section-subheading">
            Premium grades of puffed rice, roasted to crispy perfection and packed fresh at our plant.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {[1, 2, 3, 4, 5].map((i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-text-light">
            <p className="text-base sm:text-lg">Products coming soon. Contact us for enquiries.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6"
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

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 btn-secondary text-base min-h-[52px] rounded-xl px-8"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
