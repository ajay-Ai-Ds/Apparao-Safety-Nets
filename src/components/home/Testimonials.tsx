'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    location: 'Kukatpally',
    rating: 5,
    text: 'Excellent work by Apparao Safety Nets! They installed balcony safety nets in my apartment within hours. Very professional and the quality is outstanding. Highly recommended!',
    service: 'Balcony Safety Nets',
  },
  {
    name: 'Priya Sharma',
    location: 'Madhapur',
    rating: 5,
    text: 'We got invisible grills installed for our 12th floor apartment. The team was punctual, clean, and the finish is perfect. You can barely see the grills but feel completely safe.',
    service: 'Invisible Grills',
  },
  {
    name: 'Mohammed Aziz',
    location: 'Dilsukhnagar',
    rating: 5,
    text: 'Had a terrible pigeon problem on our terrace. Apparao team solved it completely with anti-bird nets. No more mess! Great value for money.',
    service: 'Pigeon Nets',
  },
  {
    name: 'Lakshmi Devi',
    location: 'Gachibowli',
    rating: 5,
    text: 'As a mother of two kids, safety was my top priority. The children safety nets they installed give me complete peace of mind. Thank you Apparao Safety Nets!',
    service: 'Children Safety Nets',
  },
  {
    name: 'Suresh Reddy',
    location: 'Kondapur',
    rating: 5,
    text: 'Installed cloth drying hangers and staircase nets in our villa. Excellent craftsmanship and very reasonable prices. Will definitely recommend to neighbors.',
    service: 'Staircase Safety Nets',
  },
  {
    name: 'Anitha Rao',
    location: 'Banjara Hills',
    rating: 5,
    text: 'Very impressed with the quality and professionalism. The team was courteous, arrived on time, and completed the installation neatly. 5-star service!',
    service: 'Balcony Safety Nets',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count
              ? 'fill-accent-500 text-accent-500'
              : 'fill-slate-200 text-slate-200'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-background section-pattern"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-primary-600 mb-3">
            Customer Reviews
          </span>
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by thousands of homeowners across Hyderabad. Here&apos;s what our
            happy customers have to say about our services.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((t, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="bg-card rounded-xl p-6 shadow-md border border-card-border card-hover flex flex-col"
              data-tracking={`testimonial-card-${index}`}
            >
              {/* Quote Icon + Stars Row */}
              <div className="flex items-start justify-between mb-4">
                <Quote
                  className="h-8 w-8 text-primary-200 flex-shrink-0"
                  aria-hidden="true"
                />
                <StarRating count={t.rating} />
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-sm text-slate-600 italic leading-relaxed mb-6 flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                {/* Avatar */}
                <div
                  className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm flex-shrink-0"
                  aria-hidden="true"
                >
                  {getInitials(t.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-sm truncate">
                    {t.name}
                  </p>
                  <div className="flex items-center flex-wrap gap-2 mt-1">
                    <span className="text-xs text-primary-600 bg-primary-50 rounded-full px-3 py-1 font-medium">
                      {t.location}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t.service}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Google Reviews CTA */}
        <motion.div
          className="text-center mt-10 md:mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            Rated{' '}
            <span className="font-bold text-foreground">4.9 ★</span>{' '}
            on Google with 500+ reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}
