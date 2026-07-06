'use client';

import { motion } from 'framer-motion';
import {
  PhoneCall,
  ClipboardCheck,
  Wrench,
  HeartHandshake,
  type LucideIcon,
} from 'lucide-react';

interface Step {
  step: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    step: '01',
    title: 'Enquiry',
    desc: 'Call us or send a WhatsApp message with your requirements.',
    icon: PhoneCall,
  },
  {
    step: '02',
    title: 'Free Inspection',
    desc: 'Our expert visits your location for free measurement and assessment.',
    icon: ClipboardCheck,
  },
  {
    step: '03',
    title: 'Installation',
    desc: 'Professional installation with genuine materials on the same day.',
    icon: Wrench,
  },
  {
    step: '04',
    title: 'After-Sales Support',
    desc: 'Warranty coverage with dedicated support for maintenance needs.',
    icon: HeartHandshake,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
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

export default function ProcessSteps() {
  return (
    <section
      id="how-it-works"
      className="section-pattern py-16 sm:py-20 lg:py-24"
      aria-labelledby="process-steps-heading"
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
            How It Works
          </span>
          <h2
            id="process-steps-heading"
            className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            Our Simple{' '}
            <span className="gradient-text">4-Step Process</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            From your first call to complete installation — we make it
            hassle-free every step of the way.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          className="relative grid gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          role="list"
          aria-label="Installation process steps"
        >
          {/* Desktop connecting line */}
          <div
            className="pointer-events-none absolute top-[4.5rem] right-[12%] left-[12%] hidden h-0.5 border-t-2 border-dashed border-primary-300 lg:block"
            aria-hidden="true"
          />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                className="relative flex flex-col items-center text-center"
                variants={stepVariants}
                role="listitem"
                data-tracking={`process-step-${item.step}`}
              >
                {/* Mobile connecting line (between cards, not after last) */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-full left-1/2 h-8 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-primary-300 sm:h-10 lg:hidden"
                    aria-hidden="true"
                  />
                )}

                {/* Step Number */}
                <span className="gradient-text font-heading text-4xl font-extrabold lg:text-5xl">
                  {item.step}
                </span>

                {/* Icon Circle */}
                <div className="gradient-primary mt-3 flex h-14 w-14 items-center justify-center rounded-full shadow-md ring-4 ring-white lg:h-16 lg:w-16">
                  <Icon
                    className="h-7 w-7 text-white lg:h-8 lg:w-8"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3 className="font-heading mt-4 text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
