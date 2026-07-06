'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Info, Shield, Check } from 'lucide-react';
import { SAFETY_NETS, INVISIBLE_GRILLS, CLOTH_HANGERS } from '@/lib/services-data';
import { BUSINESS } from '@/lib/constants';
import Link from 'next/link';

type TabType = 'nets' | 'grills' | 'hangers';

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('nets');

  const tabs = [
    { id: 'nets', label: 'Premium Safety Nets', count: SAFETY_NETS.length, data: SAFETY_NETS },
    { id: 'grills', label: 'Modern Invisible Grills', count: INVISIBLE_GRILLS.length, data: INVISIBLE_GRILLS },
    { id: 'hangers', label: 'Cloth Hangers', count: CLOTH_HANGERS.length, data: CLOTH_HANGERS },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const callHref = `tel:${BUSINESS.phone}`;
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I am interested in safety nets/invisible grills installation. Please share details.')}`;

  return (
    <section className="py-20 section-pattern bg-white" id="services">
      <div className="container-custom">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 font-heading leading-tight">
            Complete Safety &amp; Balcony Solutions
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Professional high-tensile netting, elegant window invisible grills, and space-saving ceiling cloth drying hangers.
          </p>
        </div>

        {/* Tab Buttons switcher */}
        <div className="flex justify-center border-b border-slate-200 mb-12 max-w-2xl mx-auto">
          <div className="flex space-x-6 sm:space-x-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`pb-4 text-base sm:text-lg font-bold transition-all relative cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-primary-700 font-heading'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Container */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentTab.data.map((service) => (
                <div
                  key={service.id}
                  className="bg-card border border-card-border rounded-2xl overflow-hidden card-hover shadow-sm flex flex-col justify-between"
                >
                  {/* Photo with Overlay Info */}
                  <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
                    <img
                      src={service.heroImage || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600'}
                      alt={service.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 font-heading leading-snug mb-2">
                        {service.shortTitle}
                      </h3>
                      
                      {/* Badge chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="bg-primary-50 text-primary-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-primary-100/50 uppercase tracking-wider">
                          {service.category === 'safety-nets' ? 'UV Protected' : service.category === 'invisible-grills' ? 'SS316 Stainless' : 'Space Saver'}
                        </span>
                        <span className="bg-amber-50 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-100/50 uppercase tracking-wider">
                          {service.category === 'safety-nets' ? '3-5 Yr Warranty' : service.category === 'invisible-grills' ? 'Rust Proof' : 'Heavy Load'}
                        </span>
                      </div>

                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">
                        {service.description.slice(0, 145)}...
                      </p>
                    </div>

                    {/* Bottom Buttons split */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="flex gap-2">
                        <a
                          href={callHref}
                          className="flex-1 btn-primary !py-2.5 !px-3 !text-xs justify-center gap-1.5 shadow-sm"
                          id={`service-grid-call-${service.id}`}
                          data-tracking="call-click"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Quote</span>
                        </a>
                        <a
                          href={whatsappUrl}
                          className="flex-1 btn-whatsapp !py-2.5 !px-3 !text-xs justify-center gap-1.5 shadow-sm"
                          id={`service-grid-wa-${service.id}`}
                          data-tracking="whatsapp-click"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                      <Link
                        href={`/${service.category}/${service.slug}`}
                        className="w-full inline-flex items-center justify-center gap-1 text-primary-600 hover:text-primary-800 transition-colors font-bold text-xs py-1"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>View Technical Specs &amp; Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
