import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, MessageCircle, Home, Package, Info, Phone, Navigation, Building2, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { WHATSAPP_NUMBER } from '../../constants';

const MOBILE_NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'About Us', href: '/#about', icon: Info },
  { label: 'Why Choose Us', href: '/#why-choose-us', icon: Building2 },
  { label: 'Contact', href: '/#contact', icon: Phone },
];

const LotusLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 text-[#D71920] fill-current flex-shrink-0">
    <path d="M12 22c-1.5-2.2-3.1-3.9-4.9-5.1C4.4 15.3 2.5 14.9 1 15.3c1.3-1.8 3-3.2 5-4.2C4.5 9.7 3 8 1.8 6c2 .4 3.8.2 5.4-.7C6.4 3.8 5.9 2 5.5 0.5c1.5 1 2.8 2.4 3.9 4.1C10 2.6 11 1 12-1c1 2 2 3.6 2.6 5.6 1.1-1.7 2.4-3.1 3.9-4.1-.4 1.5-.9 3.3-1.7 4.8 1.6.9 3.4 1.1 5.4.7-1.2 2-2.7 3.7-4.2 5.1 2 1 3.7 2.4 5 4.2-1.5-.4-3.4 0-6.1 1.6-1.8 1.2-3.4 2.9-4.9 5.1z" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled past the top green bar height (approx 40px)
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setDrawerOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const activeLink = (path) => {
    const hash = location.hash;
    const fullPath = location.pathname + hash;
    return fullPath === path || (path === '/' && location.pathname === '/' && !hash);
  };

  return (
    <>
      {/* Top green strip */}
      <div className="bg-[#1F6B3A] text-white text-xs py-2 px-4 hidden sm:block">
        <div className="container-custom flex justify-between items-center font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 opacity-90" />
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 opacity-90" />
              Wholesale Factory • Siddipet, Telangana
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 opacity-90" />
              Bulk Orders Only
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 opacity-90" />
              Factory Fresh Murmura
            </span>
          </div>
        </div>
      </div>

      <header
        className={`w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'fixed top-0 left-0 right-0 bg-white shadow-card border-b border-border'
            : 'relative bg-white border-b border-border'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo — Lotus mark + Brand name */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group min-h-[48px] py-1"
              aria-label="Lohitha Murmura Home"
            >
              <LotusLogo />
              <div className="leading-none flex flex-col justify-center">
                {/* LOHITHA = Red */}
                <span className="font-heading font-extrabold text-[#D71920] text-lg sm:text-2xl leading-none tracking-tight">
                  LOHITHA
                </span>
                {/* MURMURA = Green */}
                <span className="font-heading font-bold text-[#1F6B3A] text-xs sm:text-sm leading-none tracking-widest mt-1">
                  MURMURA
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-heading" aria-label="Main navigation">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'About Us', href: '/#about' },
                { label: 'Why Choose Us', href: '/#why-choose-us' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => {
                const active = activeLink(link.href);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`font-semibold text-sm transition-colors duration-200 py-1.5 border-b-2 ${
                      active
                        ? 'text-[#D71920] border-[#D71920]'
                        : 'text-text hover:text-[#D71920] border-transparent hover:border-[#D71920]/30'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-2 bg-[#1F6B3A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#155229] transition-all duration-200 min-h-[44px]"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp
              </a>

              {/* Inquiry Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-2 border border-border rounded-xl px-4 py-2.5 hover:bg-secondary transition-colors duration-200 min-h-[44px]"
                aria-label={`Inquiry cart, ${totalItems} items`}
              >
                <ShoppingCart className="w-4.5 h-4.5 text-text" />
                <span className="text-sm font-bold font-heading text-text hidden sm:inline">Inquiry Cart</span>
                <span className="w-5 h-5 bg-[#D71920] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl hover:bg-secondary transition-colors"
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

      {/* Spacer to prevent layout shift when header becomes fixed */}
      {scrolled && <div className="h-16 sm:h-20 hidden sm:block" />}

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
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
                  <LotusLogo />
                  <div className="leading-none">
                    <p className="font-heading font-extrabold text-[#D71920] text-base leading-none">LOHITHA</p>
                    <p className="font-heading font-bold text-[#1F6B3A] text-[10px] leading-none tracking-widest mt-1">MURMURA</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-secondary text-text-light"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto py-3">
                {MOBILE_NAV.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = activeLink(item.href);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 text-base font-semibold transition-colors min-h-[56px] ${
                        isActive
                          ? 'text-[#D71920] bg-[#D71920]/5 border-r-2 border-[#D71920]'
                          : 'text-text hover:text-[#D71920] hover:bg-secondary'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-[#D71920]/10' : 'bg-secondary'
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#D71920]' : 'text-text-light'}`} />
                      </div>
                      {item.label}
                    </a>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-border space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#1F6B3A] text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#155229] transition-colors min-h-[52px]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Chat on WhatsApp
                </a>
                <button
                  onClick={() => { setDrawerOpen(false); setCartOpen(true); }}
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#D71920]/10 text-[#D71920] font-heading font-semibold text-sm rounded-xl hover:bg-[#D71920]/20 transition-colors min-h-[52px]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  View Inquiry Cart
                  {totalItems > 0 && (
                    <span className="bg-[#D71920] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
