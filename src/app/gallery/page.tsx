'use client';

import { useState } from 'react';
import { Camera, X, Shield, Eye } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTABanner from '@/components/shared/CTABanner';

// Mock Gallery items
interface GalleryItem {
  id: number;
  title: string;
  category: 'safety-nets' | 'invisible-grills' | 'cloth-hangers';
  categoryLabel: string;
  imageUrl: string;
  desc: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: 'Balcony Safety Nets', category: 'safety-nets', categoryLabel: 'Safety Nets', imageUrl: '/images/gallery_balcony_nets.png', desc: 'Secure balcony safety net setup for high rise apartment in Hyderabad' },
  { id: 2, title: 'Balcony Invisible Grills', category: 'invisible-grills', categoryLabel: 'Invisible Grills', imageUrl: '/images/gallery_invisible_grill.png', desc: 'Modern SS316 wire invisible grills for premium balconies' },
  { id: 3, title: 'Ceiling Cloth Hanger', category: 'cloth-hangers', categoryLabel: 'Cloth Hangers', imageUrl: '/images/gallery_cloth_hanger.png', desc: 'Pulley operated ceiling cloth drying hanger installation' },
  { id: 4, title: 'Anti-Bird Pigeon Nets', category: 'safety-nets', categoryLabel: 'Safety Nets', imageUrl: '/images/gallery_pigeon_nets.png', desc: 'HDPE transparent anti-bird nets to block pigeons' },
  { id: 5, title: 'Window Invisible Grills', category: 'invisible-grills', categoryLabel: 'Invisible Grills', imageUrl: '/images/windowgrill.webp', desc: 'Sleek window safety invisible grills' },
  { id: 6, title: 'Wall-Mounted Hanger', category: 'cloth-hangers', categoryLabel: 'Cloth Hangers', imageUrl: '/images/clothhanger.jpg', desc: 'Space-saving foldable wall cloth drying hanger' },
  { id: 7, title: 'Monkey Safety Nets', category: 'safety-nets', categoryLabel: 'Safety Nets', imageUrl: '/images/gallery_monkey_nets.png', desc: 'Highly secure double-knotted monkey safety netting' },
  { id: 8, title: 'Sports Practice Nets', category: 'safety-nets', categoryLabel: 'Safety Nets', imageUrl: '/images/gallery_sports_nets.png', desc: 'Rooftop cricket practice net setup with steel frame' },
  { id: 9, title: 'Anti-Bird Spikes', category: 'safety-nets', categoryLabel: 'Safety Nets', imageUrl: '/images/service-spikes.png', desc: 'Rust-proof polycarbonate bird spikes installed on window sills' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'safety-nets' | 'invisible-grills' | 'cloth-hangers'>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary-950 text-white py-12 md:py-16">
        <div className="container-custom">
          <Breadcrumbs customLabels={{ 'gallery': 'Work Gallery' }} />
          <div className="mt-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 text-white">
              Installation Gallery
            </h1>
            <p className="text-green-100 text-lg leading-relaxed">
              Explore our real installation photos of safety nets, invisible grills, and cloth drying hangers completed across various residential societies and sites in Hyderabad.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 sm:py-20 section-pattern">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'safety-nets', label: 'Safety Nets' },
              { id: 'invisible-grills', label: 'Invisible Grills' },
              { id: 'cloth-hangers', label: 'Cloth Hangers' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as typeof filter)}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all border cursor-pointer ${
                  filter === btn.id
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-green/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-primary-500 hover:text-primary-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm card-hover relative"
              >
                {/* Visual Image */}
                <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="bg-white/90 text-slate-900 rounded-full p-3 shadow-lg">
                      <Eye className="w-5 h-5 text-primary-700" />
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 text-white hover:text-green-300 p-2 rounded-lg bg-white/10 cursor-pointer"
            aria-label="Close image"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.imageUrl}
              alt={activeImage.title}
              className="object-contain max-h-[70vh] w-auto mx-auto bg-slate-900"
            />
            <div className="p-6 bg-white border-t border-slate-100">
              <span className="text-xs font-semibold text-primary-600">
                {activeImage.categoryLabel}
              </span>
              <h2 className="text-xl font-bold font-heading text-slate-900 mt-1">
                {activeImage.title}
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                {activeImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <CTABanner />
    </div>
  );
}
