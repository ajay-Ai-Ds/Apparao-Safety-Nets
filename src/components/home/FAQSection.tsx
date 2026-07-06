'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS } from '@/lib/constants';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What types of safety nets do you install in Hyderabad?',
    answer:
      'We install a wide range of safety nets including balcony safety nets, pigeon/bird nets, children safety nets, staircase nets, duct area nets, swimming pool nets, construction safety nets, sports/cricket nets, and coconut tree nets. We also offer invisible grills and cloth drying hangers.',
  },
  {
    question: 'How much do safety nets cost in Hyderabad?',
    answer:
      'Safety net prices vary based on the area size, net type, and material quality. Our rates are competitive starting from ₹8-15 per sq.ft for standard HDPE nets. Contact us for a free inspection and exact quote — no hidden charges.',
  },
  {
    question: 'Do you provide free inspection and quotes?',
    answer:
      'Yes! We provide completely free inspection and measurement at your location across Hyderabad. Our expert will visit, assess your requirements, and provide a detailed quote with no obligation.',
  },
  {
    question: 'What materials do you use for safety nets?',
    answer:
      'We use premium quality HDPE (High-Density Polyethylene), nylon, and Garware brand nets. For invisible grills, we use SS316 marine-grade stainless steel wires. All materials are UV-resistant, weather-proof, and come with quality certifications.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Most residential installations are completed within 2-4 hours on the same day. Larger or complex projects may take a full day. We ensure clean, professional installation with minimal disruption.',
  },
  {
    question: 'What warranty do you offer?',
    answer:
      'We offer 3-5 years warranty on all our safety net and invisible grill installations. This covers material defects and installation workmanship. We also provide free maintenance support during the warranty period.',
  },
  {
    question: 'Which areas in Hyderabad do you serve?',
    answer:
      'We serve all areas across Hyderabad and Secunderabad including Kukatpally, Madhapur, Gachibowli, Kondapur, KPHB, Miyapur, Dilsukhnagar, LB Nagar, Begumpet, Banjara Hills, Jubilee Hills, Secunderabad, Kompally, and more.',
  },
  {
    question: 'Are safety nets safe for children and pets?',
    answer:
      'Absolutely! Our safety nets are specifically designed to be child-safe and pet-safe. They are made from non-toxic materials, have small mesh sizes to prevent any entanglement, and can withstand significant weight and pressure.',
  },
];

/** JSON-LD structured data for FAQPage schema */
function FAQSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <FAQSchema />

      <section
        id="faq"
        className="py-16 md:py-24 section-green"
        aria-labelledby="faq-heading"
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
              Got Questions?
            </span>
            <h2
              id="faq-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about our safety net installation
              services in Hyderabad. Can&apos;t find your answer?{' '}
              <a
                href={`tel:${BUSINESS.phone}`}
                className="text-primary-600 font-semibold hover:text-primary-700 underline underline-offset-2"
                data-tracking="faq-call-link"
              >
                Call us directly
              </a>
              .
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const faqId = `faq-answer-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div
                  key={index}
                  className="border-b border-slate-200"
                >
                  {/* Question Button */}
                  <button
                    id={buttonId}
                    type="button"
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={faqId}
                    data-tracking={`faq-toggle-${index}`}
                  >
                    <span className="font-semibold text-foreground text-sm md:text-base group-hover:text-primary-700 transition-colors">
                      {faq.question}
                    </span>
                    <motion.span
                      className="flex-shrink-0 text-slate-400 group-hover:text-primary-600 transition-colors"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                  </button>

                  {/* Answer Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={faqId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
