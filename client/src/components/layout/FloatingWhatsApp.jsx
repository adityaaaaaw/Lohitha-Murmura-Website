import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../constants';

const FloatingWhatsApp = () => {
  const controls = useAnimation();

  // Repeat subtle bounce every 4 seconds
  useEffect(() => {
    let interval;
    const runBounce = async () => {
      await controls.start({
        y: [0, -10, 0, -6, 0],
        transition: { duration: 0.7, ease: 'easeInOut' },
      });
    };
    // Initial bounce after 2s
    const initial = setTimeout(() => {
      runBounce();
      interval = setInterval(runBounce, 4000);
    }, 2000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [controls]);

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Lohitha Murmura! I would like to enquire about bulk murmura orders.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      /* On mobile: above bottom bar (bottom-20 = 80px). On lg+: bottom-8 */
      className="fixed bottom-[84px] right-4 z-40 lg:bottom-8 lg:right-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 220, damping: 18 }}
      whileTap={{ scale: 0.92 }}
    >
      <motion.div
        animate={controls}
        className="relative w-14 h-14 lg:w-16 lg:h-16 bg-[#25D366] rounded-full flex items-center justify-center cursor-pointer"
        style={{ boxShadow: '0 4px 24px rgba(37,211,102,0.45)' }}
        whileHover={{ scale: 1.08, boxShadow: '0 6px 32px rgba(37,211,102,0.6)' }}
        transition={{ duration: 0.2 }}
      >
        <MessageCircle className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="white" />

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-20" />

        {/* Online dot */}
        <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
          <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full" />
        </span>
      </motion.div>

      {/* Tooltip — desktop only */}
      <div className="hidden lg:block absolute right-[72px] top-1/2 -translate-y-1/2 bg-text text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
        <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-text" />
      </div>
    </motion.a>
  );
};

export default FloatingWhatsApp;
