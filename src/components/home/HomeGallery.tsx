'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Shield, Camera } from 'lucide-react';
import Link from 'next/link';

interface PhotoItem {
  id: number;
  title: string;
  category: 'safety-nets' | 'invisible-grills' | 'cloth-hangers';
  imgUrl: string;
  desc: string;
}

const PHOTOS: PhotoItem[] = [
  { id: 1, title: 'Balcony Safety Nets', category: 'safety-nets', imgUrl: '/images/gallery_balcony_nets.png', desc: 'Heavy-duty balcony netting installation' },
  { id: 2, title: 'Balcony Invisible Grill', category: 'invisible-grills', imgUrl: '/images/gallery_invisible_grill.png', desc: 'SS316 wire invisible grills for open views' },
  { id: 3, title: 'Ceiling Cloth Hanger', category: 'cloth-hangers', imgUrl: '/images/gallery_cloth_hanger.png', desc: 'Space-saving pulley hanger setup' },
  { id: 4, title: 'Anti-Bird Pigeon Net', category: 'safety-nets', imgUrl: '/images/gallery_pigeon_nets.png', desc: 'Anti-bird pigeon proofing net' },
  { id: 5, title: 'Monkey Safety Nets', category: 'safety-nets', imgUrl: '/images/gallery_monkey_nets.png', desc: 'Strong double-knotted monkey prevention net' },
  { id: 6, title: 'Rooftop Cricket Net', category: 'safety-nets', imgUrl: '/images/gallery_sports_nets.png', desc: 'Terrace cricket practice cage installation' },
];

export default function HomeGallery() {
  const [filter, setFilter] = useState<'all' | 'safety-nets' | 'invisible-grills' | 'cloth-hangers'>('all');

  const filteredPhotos = filter === 'all' 
    ? PHOTOS 
    : PHOTOS.filter((p) => p.category === filter);

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-150" id="gallery">
      <div className="container-custom">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Our Work
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 font-heading">
            Latest Installation Gallery
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Real photos of our professional installations in Hyderabad homes and apartments.
          </p>
        </div>

        {/* Filter Switchers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'safety-nets', label: 'Safety Nets' },
            { id: 'invisible-grills', label: 'Invisible Grills' },
            { id: 'cloth-hangers', label: 'Cloth Hangers' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as typeof filter)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                filter === btn.id
                  ? 'bg-primary-700 text-white border-primary-700 shadow-lg shadow-green/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary-500 hover:text-primary-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={photo.id}
                className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 cursor-pointer"
              >
                <img
                  src={photo.imgUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Visual Glass Blur Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/25">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md">
                      {photo.category.replace('-', ' ')}
                    </span>
                    <h4 className="text-lg font-bold font-heading mt-1 text-white">
                      {photo.title}
                    </h4>
                    <p className="text-slate-200 text-xs mt-0.5 leading-relaxed">
                      {photo.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View Full Gallery CTA */}
        <div className="text-center">
          <Link href="/gallery" className="btn-outline font-semibold inline-flex items-center gap-1.5">
            <Camera className="w-4 h-4" />
            <span>View Full Work Gallery (30+ Photos)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
