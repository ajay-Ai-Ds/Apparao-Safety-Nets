import { notFound } from 'next/navigation';
import { Shield, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { getServiceBySlug, INVISIBLE_GRILLS } from '@/lib/services-data';
import { BUSINESS } from '@/lib/constants';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactForm from '@/components/shared/ContactForm';
import CTABanner from '@/components/shared/CTABanner';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INVISIBLE_GRILLS.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords.join(', '),
    alternates: {
      canonical: `/invisible-grills/${service.slug}`,
    },
  };
}

export default async function InvisibleGrillServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service || service.category !== 'invisible-grills') {
    notFound();
  }

  // Schema Markup
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.title,
    'description': service.description,
    'provider': {
      '@type': 'LocalBusiness',
      'name': BUSINESS.name,
      'image': `${BUSINESS.siteUrl}/images/services/${service.slug}.webp`,
      'telephone': BUSINESS.phone,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': BUSINESS.address.street,
        'addressLocality': BUSINESS.address.area,
        'addressRegion': BUSINESS.address.city,
        'postalCode': BUSINESS.address.pincode,
        'addressCountry': 'IN',
      },
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': 'Hyderabad',
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': '150', // representative starting price per sq ft
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': service.faq.map((f) => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col">
        {/* Page Top Banner */}
        <section className="bg-primary-950 text-white py-12 md:py-16">
          <div className="container-custom">
            <Breadcrumbs
              customLabels={{
                'invisible-grills': 'Invisible Grills',
                [service.slug]: service.shortTitle,
              }}
            />
            <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <span className="text-green-300 font-semibold text-sm uppercase tracking-wider block mb-2">
                  SS316 Stainless Steel Safety Wires
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white leading-tight mb-4">
                  {service.title}
                </h1>
                <p className="text-green-100 text-lg leading-relaxed max-w-2xl">
                  Robust child safety solutions for modern apartments. Made with marine grade rustproof stainless steel wire (SS316) for balconies and windows.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center shrink-0">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="btn-primary flex items-center justify-center gap-2"
                  id="invisible-grill-hero-call"
                  data-tracking="call-click"
                >
                  <Phone className="w-4 h-4" />
                  Call Free Quote
                </a>
                <a
                  href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}`}
                  className="btn-whatsapp flex items-center justify-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="invisible-grill-hero-whatsapp"
                  data-tracking="whatsapp-click"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 section-pattern">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 font-heading">
                    About Our {service.shortTitle}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {service.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="bg-primary-50/50 rounded-2xl p-6 sm:p-8 border border-primary-100">
                  <h3 className="text-xl font-bold text-primary-900 mb-4 font-heading flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary-600" />
                    Why Install Invisible Grills?
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 font-heading">
                    SS316 Stainless Steel Components
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Our invisible grills use high-strength 316 grade stainless steel cables coated with protective nylon, anchored to structural aluminum channels.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.materials.map((material, i) => (
                      <span
                        key={i}
                        className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
                      >
                        🛡️ {material}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Guarantee / Free Quote */}
                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6">
                  <h4 className="text-amber-800 font-bold font-heading mb-2">
                    Free Site Inspection &amp; Custom Quote
                  </h4>
                  <p className="text-slate-600 text-sm">
                    We offer free measurements and site inspection across all areas of Hyderabad. Get an instant, customized quote based on your exact balcony/window size and layout with no obligation.
                  </p>
                </div>

                {/* FAQ */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 font-heading">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {service.faq.map((item, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm"
                      >
                        <h4 className="font-bold text-slate-900 mb-2">{item.question}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories toggle */}
                <div className="pt-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    Other Invisible Grill Option
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                    {INVISIBLE_GRILLS.filter((s) => s.slug !== service.slug).map((s) => (
                      <Link
                        key={s.id}
                        href={`/invisible-grills/${s.slug}`}
                        className="bg-card border border-card-border p-3 rounded-lg text-center hover:border-primary-500 transition-colors shadow-sm"
                      >
                        <span className="text-xs font-semibold text-slate-800 block">
                          {s.shortTitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <ContactForm
                  defaultService={service.shortTitle}
                  title={`Quote for ${service.shortTitle}`}
                  subtitle="Fill in details to receive a free measurement inspection appointment & phone estimate."
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <CTABanner
          title={`Secure Your Skyline balcony & Windows with ${service.shortTitle}`}
          subtitle={`Free site measurements across Hyderabad. Contact us to schedule an installation on the same day.`}
        />
      </div>
    </>
  );
}
