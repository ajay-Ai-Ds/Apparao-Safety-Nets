'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  MessageCircle,
  Shield,
} from 'lucide-react';
import { BUSINESS, NAV_ITEMS } from '@/lib/constants';
import type { NavItem } from '@/types';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
    setOpenMobileSubmenu(null);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-900 text-green-50 text-sm hidden md:block">
        <div className="container-custom flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-1.5 text-white hover:text-green-100 transition-colors font-medium"
              id="topbar-phone"
              data-tracking="call-click"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BUSINESS.phone}</span>
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-white hover:text-green-100 transition-colors font-medium"
            >
              {BUSINESS.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-green-100">
              Serving all of Hyderabad & Secunderabad
            </span>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-green-100 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
              id="topbar-whatsapp"
              data-tracking="whatsapp-click"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'glass shadow-lg border-b border-green-100/20'
          : 'bg-white/95 backdrop-blur-sm'
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between py-2 lg:py-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Apparao Safety Nets - Home"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white flex items-center justify-center group-hover:scale-105 transition-all">
                <Image
                  src="/images/Aplogo.webp"
                  alt="Apparao Safety Nets Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain p-1 rounded-2xl"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 bg-clip-text text-transparent font-heading leading-none tracking-tighter drop-shadow-sm">
                  Apparao
                </span>
                <span className="text-[0.8rem] sm:text-sm lg:text-base font-bold text-blue-700 uppercase tracking-[0.25em] mt-1 pl-0.5">
                  Safety Nets
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                  onMouseLeave={() => item.children && handleDropdownLeave()}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive(item.href)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-700 hover:text-primary-700 hover:bg-primary-50/50'
                      }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
                        onMouseEnter={() => handleDropdownEnter(item.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="py-2">
                          {item.children.map((child: NavItem) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${isActive(child.href)
                                ? 'text-primary-700 bg-primary-50 font-medium'
                                : 'text-slate-600 hover:text-primary-700 hover:bg-primary-50/50'
                                }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-slate-100 p-3">
                          <Link
                            href={item.href}
                            className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors"
                          >
                            View All {item.label} →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="btn-primary !py-2.5 !px-5 !text-sm"
                id="header-call-cta"
                data-tracking="call-click"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-2.5 py-2 text-xs font-semibold text-primary-700 shadow-sm transition-colors hover:bg-primary-100"
                aria-label={`Call ${BUSINESS.phone}`}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{BUSINESS.phone}</span>
              </a>
              <button
                className="p-2 rounded-lg text-slate-700 hover:bg-primary-50 transition-colors"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base font-bold text-primary-800 font-heading">
                    Apparao Safety Nets
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-4" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="mb-1">
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenMobileSubmenu(
                              openMobileSubmenu === item.label ? null : item.label
                            )
                          }
                          className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium rounded-lg transition-colors ${isActive(item.href)
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          aria-expanded={openMobileSubmenu === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${openMobileSubmenu === item.label ? 'rotate-180' : ''
                              }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openMobileSubmenu === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-1 border-l-2 border-primary-200 ml-3">
                                {item.children.map((child: NavItem) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${isActive(child.href)
                                      ? 'text-primary-700 bg-primary-50 font-medium'
                                      : 'text-slate-600 hover:text-primary-700 hover:bg-slate-50'
                                      }`}
                                    onClick={() => setIsMobileOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                                <Link
                                  href={item.href}
                                  className="block px-3 py-2.5 text-sm text-primary-600 font-semibold rounded-lg hover:bg-primary-50"
                                  onClick={() => setIsMobileOpen(false)}
                                >
                                  View All →
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${isActive(item.href)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Drawer CTAs */}
              <div className="border-t border-slate-100 p-4 space-y-3">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="btn-primary w-full justify-center !py-3"
                  id="mobile-menu-call"
                  data-tracking="call-click"
                >
                  <Phone className="w-5 h-5" />
                  Call Now — {BUSINESS.phone}
                </a>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}`}
                  className="btn-whatsapp w-full justify-center !py-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="mobile-menu-whatsapp"
                  data-tracking="whatsapp-click"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
