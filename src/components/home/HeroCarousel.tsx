'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS, WHATSAPP_MESSAGE } from '@/lib/constants';
import { useRouter } from 'next/navigation';

interface Slide {
  image: string;
  tagline: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: '/images/carousel_child_safety.png',
    tagline: 'Same-Day Installation',
    titlePrefix: "Hyderabad's #1 ",
    titleHighlight: 'Balcony Safety Nets',
    titleSuffix: '',
    subtitle: 'Protect your family and pets from fall hazards with heavy-duty UV-resistant safety netting.',
  },
  {
    image: '/images/carousel_pigeon_net.png',
    tagline: '100% Pigeon Proof',
    titlePrefix: 'Premium ',
    titleHighlight: 'Pigeon & Bird Nets',
    titleSuffix: ' Installation',
    subtitle: 'Keep your balcony clean, hygienic, and free from nesting pigeons permanently without harming birds.',
  },
  {
    image: '/images/carousel_invisible_grill.png',
    tagline: 'High-Tensile SS316 Wires',
    titlePrefix: 'Modern ',
    titleHighlight: 'Invisible Grills',
    titleSuffix: ' for Balconies & Windows',
    subtitle: 'Enjoy unobstructed, scenic skyline views with zero compromise on child and pet safety.',
  },
  {
    image: '/images/carousel_cloth_hanger.png',
    tagline: 'Space-Saving pulley systems',
    titlePrefix: 'Ceiling ',
    titleHighlight: 'Cloth Drying Hangers',
    titleSuffix: '',
    subtitle: 'Pulley-operated stainless steel drying rods for efficient space management in modern apartments.',
  },
  {
    image: '/images/carousel_monkey_net.png',
    tagline: 'Heavy-Duty Balcony Protection',
    titlePrefix: 'Tough & Durable ',
    titleHighlight: 'Monkey Safety Nets',
    titleSuffix: '',
    subtitle: 'Prevent monkeys from invading your balcony and damaging household plants/items with high-tensile nets.',
  },
  {
    image: '/images/carousel_cricket_net.png',
    tagline: 'Professional Sports Netting',
    titlePrefix: 'Custom ',
    titleHighlight: 'Cricket Practice Nets',
    titleSuffix: ' & Sports Nets',
    subtitle: 'High-quality cricket pitch nets, badminton court netting, and sports cage installations for homes & schools.',
  },
];

export default function HeroCarousel() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('Balcony Safety Nets');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesList = [
    'Balcony Safety Nets',
    'Pigeon & Bird Nets',
    'Children Safety Nets',
    'Invisible Grills (Balcony/Window)',
    'Ceiling Cloth Hangers',
    'Staircase Safety Nets',
    'Sports / Cricket Nets',
    'All Types of Safety Nets',
  ];

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, current]);

  // Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('form') || target.closest('button') || target.closest('a')) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      deltaX < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name,
        phone,
        location,
        service,
        message: 'Quick inquiry from Hero form',
        utmSource: sessionStorage.getItem('utm_source') || '',
        utmMedium: sessionStorage.getItem('utm_medium') || '',
        utmCampaign: sessionStorage.getItem('utm_campaign') || '',
        utmTerm: sessionStorage.getItem('utm_term') || '',
        gclid: sessionStorage.getItem('gclid') || '',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Push datalayer lead submission
        if (typeof window !== 'undefined') {
          const windowWithDataLayer = window as unknown as { dataLayer: Record<string, unknown>[] };
          windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
          windowWithDataLayer.dataLayer.push({
            event: 'lead_form_submitted',
            formId: 'hero-inquiry-form',
            service,
            location,
          });
        }

        // Construct WhatsApp message text
        const waMessage = `Hi Apparao Safety Nets! I have submitted an enquiry:
- *Name*: ${name}
- *Phone*: ${phone}
- *Service*: ${service || 'Safety Nets/Invisible Grills'}
- *Location*: ${location || 'Hyderabad'}
- *Message*: Quick inquiry from Hero form`;

        const waPhone = BUSINESS.whatsapp.replace(/[^0-9]/g, '');
        const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

        // Open WhatsApp
        if (typeof window !== 'undefined') {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          if (isMobile) {
            window.location.href = waUrl;
          } else {
            window.open(waUrl, '_blank');
          }
        }

        router.push('/thank-you');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSlide = slides[current];
  const callHref = `tel:${BUSINESS.phone}`;
  const waHref = `https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}?text=${WHATSAPP_MESSAGE}`;

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-slate-900"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images Crossfade (Smooth Ken Burns Zoom) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: 'easeInOut' },
              scale: { duration: 6.2, ease: 'linear' },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.titleHighlight}
              fill
              priority={current === 0}
              className="object-cover object-center brightness-[0.90] saturate-[1.10]"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Left-to-right blue gradient overlay for text readability, reducing high brightness with a color tone */}
        <div className="absolute inset-0 z-10 bg-blue-950/20 md:bg-gradient-to-r md:from-blue-950/75 md:via-blue-900/35 md:to-transparent pointer-events-none mix-blend-multiply" />
      </div>

      <div className="container-custom relative z-20 w-full py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Slides Text */}
          <div className="lg:col-span-8 space-y-6">
            <div className="min-h-[40px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`tag-${current}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-600 text-white shadow-md border border-emerald-500"
                >
                  <Shield className="w-3.5 h-3.5" />
                  {currentSlide.tagline}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="min-h-[120px] sm:min-h-[160px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`title-${current}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-[1.1] text-white"
                >
                  {currentSlide.titlePrefix}
                  <span className="text-emerald-400 bg-clip-text">
                    {currentSlide.titleHighlight}
                  </span>
                  {currentSlide.titleSuffix}
                </motion.h1>
              </AnimatePresence>
            </div>

            <div className="min-h-[60px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${current}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-base sm:text-lg lg:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl"
                >
                  {currentSlide.subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-y-3 gap-x-5 pt-6 text-sm text-slate-300 border-t border-white/10">
              <div className="flex items-center space-x-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">5.0 Star Rating</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-400 fill-emerald-950/50" />
                <span className="font-bold text-white">15,000+ Installations</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-400 fill-emerald-950/50" />
                <span className="font-bold text-white">Free Site Inspection</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex space-x-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex space-x-1.5 items-center">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className="w-8 h-8 flex items-center justify-center cursor-pointer group"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 ${
                        current === index ? 'bg-emerald-400 w-6' : 'bg-white/30 w-2 group-hover:bg-white/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Right: Booking Form (Desktop Only, overlays background) */}
          <div className="lg:col-span-4 w-full hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10 relative"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center pb-2 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white font-heading">
                    Book Free Inspection
                  </h2>
                  <p className="text-slate-300 text-xs mt-1">
                    Get phone estimate &amp; site visit in 15 mins!
                  </p>
                </div>

                <div>
                  <label htmlFor="hero-name" className="sr-only">Your Name</label>
                  <input
                    id="hero-name"
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors bg-white/5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="hero-phone" className="sr-only">Phone Number</label>
                    <input
                      id="hero-phone"
                      type="tel"
                      required
                      placeholder="Phone *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors bg-white/5"
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-location" className="sr-only">Location / Area</label>
                    <input
                      id="hero-location"
                      type="text"
                      placeholder="Your Area"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors bg-white/5"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hero-service" className="sr-only">Select Service</label>
                  <select
                    id="hero-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv} className="bg-slate-950 text-white">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all cursor-pointer"
                >
                  <span>Submit Booking Request</span>
                  <ArrowRight className="w-4 h-4 animate-pulse-soft" />
                </button>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <a
                    href={callHref}
                    className="flex items-center justify-center space-x-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-xs font-bold transition-colors"
                    id="hero-form-call"
                    data-tracking="call-click"
                  >
                    <Phone className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-xs font-bold transition-colors"
                    id="hero-form-whatsapp"
                    data-tracking="whatsapp-click"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
