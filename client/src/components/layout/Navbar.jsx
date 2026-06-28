import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, MessageCircle, Wheat, Home, Package, Info, Phone, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { WHATSAPP_NUMBER, NAV_LINKS } from '../../constants';

const MOBILE_NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'About', href: '/#about', icon: Info },
  { label: 'Contact', href: '/#contact', icon: Phone },
  { label: 'Directions', href: 'https://maps.google.com/?q=Prashanth+Nagar+Siddipet+Telangana+502103', icon: Navigation, external: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => setDrawerOpen(false), [location]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || drawerOpen
            ? 'bg-white shadow-card border-b border-border'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group min-h-[48px] py-1"
              aria-label="Lohitha Murmura Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-lg flex items-center justify-center shadow-primary flex-shrink-0">
                <Wheat className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-text text-xs sm:text-sm leading-none tracking-tight">LOHITHA</p>
                <p className="font-heading font-bold text-primary text-[10px] sm:text-xs leading-none tracking-widest">MURMURA</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-body font-medium text-sm transition-colors duration-200 py-1 border-b-2 ${
                    location.pathname === link.href
                      ? 'text-primary border-primary'
                      : 'text-text hover:text-primary border-transparent hover:border-primary/30'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* WhatsApp — Desktop only */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-accent-dark transition-all duration-200 min-h-[44px]"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-12 h-12 rounded-xl hover:bg-primary/10 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={`Inquiry cart, ${totalItems} items`}
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-text" />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Hamburger — Mobile/Tablet */}
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="lg:hidden flex items-center justify-center w-12 h-12 rounded-xl hover:bg-primary/10 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={drawerOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {drawerOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-6 h-6 text-text" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-6 h-6 text-text" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer — slides from right */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.nav
              key="drawer"
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-white shadow-hover flex flex-col lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Wheat className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-text text-xs leading-none">LOHITHA</p>
                    <p className="font-heading font-bold text-primary text-[10px] leading-none tracking-widest">MURMURA</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-background text-text-light"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto py-3">
                {MOBILE_NAV.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = !item.external && location.pathname === item.href;
                  const Tag = item.external ? 'a' : 'a';
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      onClick={() => !item.external && setDrawerOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 text-base font-medium transition-colors min-h-[56px] ${
                        isActive
                          ? 'text-primary bg-primary/5 border-r-2 border-primary'
                          : 'text-text hover:text-primary hover:bg-background'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-primary/10' : 'bg-background'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-text-light'}`} />
                      </div>
                      {item.label}
                    </motion.a>
                  );
                })}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-border space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Lohitha Murmura! I would like to enquire about bulk murmura orders.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#25D366] text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#1da851] transition-colors min-h-[52px]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <Link
                  to="/cart"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-primary/10 text-primary font-heading font-semibold text-sm rounded-xl hover:bg-primary/20 transition-colors min-h-[52px]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  View Inquiry Cart
                  {totalItems > 0 && (
                    <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
