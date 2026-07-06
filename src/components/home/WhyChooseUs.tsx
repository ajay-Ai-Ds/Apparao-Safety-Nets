'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Award,
  Clock,
  IndianRupee,
  ShieldCheck,
  Headphones,
  type LucideIcon,
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Genuine Materials',
    desc: 'We use only high-quality HDPE, nylon, and SS316 grade materials with verified certifications.',
  },
  {
    icon: Award,
    title: 'Expert Installation',
    desc: 'Our trained technicians ensure precise, secure fitting with professional tools and techniques.',
  },
  {
    icon: Clock,
    title: 'Same-Day Service',
    desc: 'Quick response with free inspection and same-day installation available across Hyderabad.',
  },
  {
    icon: IndianRupee,
    title: 'Best Price Guarantee',
    desc: 'Competitive pricing with no hidden charges. Get a free quote and compare before you decide.',
  },
  {
    icon: ShieldCheck,
    title: '3-5 Year Warranty',
    desc: 'All our installations come with a comprehensive warranty. Complete peace of mind guaranteed.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Dedicated customer support for any queries, maintenance, or emergency repair needs.',
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
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="section-green py-16 sm:py-20 lg:py-24"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center lg:mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Why Us
          </span>
          <h2
            id="why-choose-us-heading"
            className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            Why Choose{' '}
            <span className="gradient-text">Apparao Safety Nets</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Trusted by thousands of families across Hyderabad for reliable,
            high-quality safety net installations.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          role="list"
          aria-label="Key benefits of choosing Apparao Safety Nets"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="card-hover group rounded-xl border border-card-border bg-white p-6 shadow-sm"
                variants={cardVariants}
                role="listitem"
                data-tracking={`why-choose-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Icon Circle */}
                <div className="gradient-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow-sm">
                  <Icon
                    className="h-6 w-6 text-white"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
