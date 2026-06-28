import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem } from '../animations/variants';
import { getProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/products/ProductCard';
import SearchBar from '../components/products/SearchBar';
import CategoryFilter from '../components/products/CategoryFilter';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { PackageSearch, SlidersHorizontal, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch {}
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (selectedCategory) params.category = selectedCategory;
      const res = await getProducts(params);
      setProducts(res.data?.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedCategory]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const hasFilters = search || selectedCategory;

  return (
    <>
      <Helmet>
        <title>Products — Lohitha Murmura | Bulk Murmura Wholesale</title>
        <meta name="description" content="Browse all murmura varieties available in bulk. Plain, masala, thin, thick, spicy and premium grades. Minimum 50 bags. Factory direct pricing." />
      </Helmet>

      <motion.div
        className="min-h-screen bg-background"
        style={{ paddingTop: '56px' /* Navbar height */ }}
        {...pageTransition}
      >
        {/* Page Header */}
        <div className="bg-white border-b border-border py-6 sm:py-8">
          <div className="container-custom">
            <h1 className="font-heading font-bold text-text text-2xl sm:text-3xl md:text-4xl mb-1.5">
              Our Products
            </h1>
            <p className="text-text-light text-sm sm:text-base">
              Factory-fresh murmura — bulk orders only.
            </p>
          </div>
        </div>

        <div className="container-custom py-5 sm:py-8">

          {/* Mobile: Search + Filter toggle row */}
          <div className="flex gap-3 mb-4 sm:mb-6">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search products..."
              />
            </div>
            {/* Filter button — mobile only */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`sm:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-semibold text-sm min-h-[48px] transition-all ${
                selectedCategory
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-text-light border-border hover:border-primary'
              }`}
              aria-expanded={filterOpen}
              aria-label="Toggle category filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Category filter — always visible sm+, collapsible on mobile */}
          <AnimatePresence initial={false}>
            {(filterOpen || true) && (
              <motion.div
                className={`mb-5 sm:mb-6 ${filterOpen ? 'block' : 'hidden sm:block'}`}
              >
                <CategoryFilter
                  categories={categories}
                  selected={selectedCategory}
                  onSelect={(id) => { setSelectedCategory(id); setFilterOpen(false); }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filters + count */}
          <div className="flex items-center justify-between mb-5 sm:mb-6 min-h-[28px]">
            {!loading && (
              <p className="text-text-light text-sm">
                <span className="font-semibold text-text">{products.length}</span> product{products.length !== 1 ? 's' : ''}
                {debouncedSearch && (
                  <> for "<span className="text-primary">{debouncedSearch}</span>"</>
                )}
              </p>
            )}
            {hasFilters && (
              <button
                onClick={() => { setSearch(''); setSelectedCategory(''); }}
                className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600 font-medium min-h-[36px] px-2"
              >
                <X className="w-3.5 h-3.5" /> Clear filters
              </button>
            )}
          </div>

          {/* Product Grid — 1 col mobile, 2 col sm, 3 col lg, 4 col xl */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-border/40 rounded-full flex items-center justify-center mb-4">
                <PackageSearch className="w-8 h-8 sm:w-10 sm:h-10 text-border" />
              </div>
              <h3 className="font-heading font-semibold text-text text-lg sm:text-xl mb-2">
                No products found
              </h3>
              <p className="text-text-light text-sm max-w-xs">
                Try adjusting your search or filter criteria.
              </p>
              {hasFilters && (
                <button
                  onClick={() => { setSearch(''); setSelectedCategory(''); }}
                  className="mt-5 text-primary font-semibold text-sm hover:underline min-h-[44px] px-4"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <motion.div key={product._id} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Bottom padding so content isn't hidden by mobile bottom bar */}
        <div className="h-20 lg:h-0" aria-hidden="true" />
      </motion.div>
    </>
  );
};

export default ProductsPage;
