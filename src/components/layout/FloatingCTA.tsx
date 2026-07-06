'use client';

import { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS, WHATSAPP_MESSAGE } from '@/lib/constants';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}?text=${WHATSAPP_MESSAGE}`;
  const phoneUrl = `tel:${BUSINESS.phone}`;

  return (
    <>
      {/* ── Universal Floating CTA Cluster (Right Side - Desktop & Tablet) ── */}
      <div className="fixed bottom-24 md:bottom-8 right-5 z-40 flex flex-col space-y-3.5 items-end">
        {/* WhatsApp Icon */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          id="universal-whatsapp-fab"
          data-tracking="fab-whatsapp"
          className="flex items-center justify-center w-14 h-14 text-white rounded-full shadow-xl hover:shadow-2xl cursor-pointer transition-colors duration-200 relative group animate-pulse-soft"
          style={{ background: '#25d366' }}
          aria-label="Chat on WhatsApp with Apparao Safety Nets"
        >
          {/* WhatsApp SVG Icon */}
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.786.002-2.618-1.01-5.074-2.854-6.921C16.38 2.052 13.933.996 11.999.996 6.596.996 2.197 5.379 2.195 10.785c-.001 1.512.409 2.99 1.182 4.298l-.994 3.63 3.731-.973-1.066.614zm11.332-6.52c-.274-.136-1.62-.8-1.87-.892-.252-.09-.435-.136-.617.137-.183.272-.708.892-.868 1.074-.16.183-.32.204-.593.068-1.579-.79-2.73-1.37-3.818-3.23-.288-.492.288-.456.822-1.52.091-.183.046-.343-.023-.48-.068-.136-.617-1.484-.846-2.033-.223-.536-.469-.463-.617-.47l-.527-.008c-.183 0-.48.069-.731.343-.252.274-.96.937-.96 2.285 0 1.348.982 2.651 1.119 2.833.137.183 1.933 2.951 4.682 4.141.654.282 1.165.451 1.564.578.658.209 1.258.18 1.732.109.528-.079 1.62-.663 1.85-1.302.23-.639.23-1.187.16-1.302-.07-.116-.275-.183-.55-.32z" />
          </svg>
          <span className="absolute right-16 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-white/10">
            WhatsApp Enquiry
          </span>
        </motion.a>

        {/* Call Icon */}
        <motion.a
          href={phoneUrl}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          id="universal-call-fab"
          data-tracking="fab-call"
          className="flex items-center justify-center w-14 h-14 text-white rounded-full shadow-xl hover:shadow-2xl cursor-pointer transition-colors duration-200 group bg-amber-500 hover:bg-amber-600"
          aria-label="Call Apparao Safety Nets"
        >
          <Phone className="w-6 h-6 fill-white text-white" />
          <span className="absolute right-16 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-white/10">
            Call Customer Care
          </span>
        </motion.a>

        {/* Scroll To Top (shows on scroll) */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              onClick={scrollToTop}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center w-11 h-11 bg-white hover:bg-slate-100 text-slate-700 rounded-full shadow-lg border border-slate-200 cursor-pointer transition-colors duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Sticky Mobile CTA Bar (Mobile Only - Fixed to Bottom Viewport) ── */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] grid grid-cols-2 p-3.5 gap-3.5 z-50">
        <a
          href={phoneUrl}
          id="sticky-bar-call"
          data-tracking="call-click"
          className="flex items-center justify-center space-x-2 bg-amber-500 active:bg-amber-600 text-white py-3.5 px-4 rounded-xl text-base font-extrabold active:scale-95 transition-all shadow-md min-h-[48px]"
        >
          <Phone className="w-5 h-5 fill-white text-white" />
          <span>Call Now</span>
        </a>
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="sticky-bar-whatsapp"
          data-tracking="whatsapp-click"
          className="flex items-center justify-center space-x-2 bg-green-600 active:bg-green-700 text-white py-3.5 px-4 rounded-xl text-base font-extrabold active:scale-95 transition-all shadow-md min-h-[48px]"
        >
          {/* WhatsApp SVG Icon */}
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.786.002-2.618-1.01-5.074-2.854-6.921C16.38 2.052 13.933.996 11.999.996 6.596.996 2.197 5.379 2.195 10.785c-.001 1.512.409 2.99 1.182 4.298l-.994 3.63 3.731-.973-1.066.614zm11.332-6.52c-.274-.136-1.62-.8-1.87-.892-.252-.09-.435-.136-.617.137-.183.272-.708.892-.868 1.074-.16.183-.32.204-.593.068-1.579-.79-2.73-1.37-3.818-3.23-.288-.492.288-.456.822-1.52.091-.183.046-.343-.023-.48-.068-.136-.617-1.484-.846-2.033-.223-.536-.469-.463-.617-.47l-.527-.008c-.183 0-.48.069-.731.343-.252.274-.96.937-.96 2.285 0 1.348.982 2.651 1.119 2.833.137.183 1.933 2.951 4.682 4.141.654.282 1.165.451 1.564.578.658.209 1.258.18 1.732.109.528-.079 1.62-.663 1.85-1.302.23-.639.23-1.187.16-1.302-.07-.116-.275-.183-.55-.32z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
