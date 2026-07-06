import { notFound } from 'next/navigation';
import { LOCATIONS, getLocationBySlug } from '@/lib/locations-data';
import { ALL_SERVICES } from '@/lib/services-data';
import { BUSINESS } from '@/lib/constants';
import { Shield, MapPin, Award, CheckCircle, Info, Phone, MessageCircle } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactForm from '@/components/shared/ContactForm';
import CTABanner from '@/components/shared/CTABanner';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    location: string;
  }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({
    location: loc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { location } = await params;
  const loc = getLocationBySlug(location);
  if (!loc) return {};

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: `safety nets ${loc.name}, pigeon nets ${loc.name}, invisible grills ${loc.name}, Apparao Safety Nets ${loc.name}`,
    alternates: {
      canonical: `/hyderabad/${loc.slug}`,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { location } = await params;
  const loc = getLocationBySlug(location);

  if (!loc) {
    notFound();
  }

  // Schema Markup defining LocalBusiness for the area
  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `${BUSINESS.name} - ${loc.name}`,
    'image': `${BUSINESS.siteUrl}/images/services/balcony-safety-nets.webp`,
    'telephone': BUSINESS.phone,
    'email': BUSINESS.email,
    'url': `${BUSINESS.siteUrl}/hyderabad/${loc.slug}`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': BUSINESS.address.street,
      'addressLocality': loc.name,
      'addressRegion': BUSINESS.address.city,
      'postalCode': loc.pincode,
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': BUSINESS.coordinates.lat,
      'longitude': BUSINESS.coordinates.lng,
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': loc.name,
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      'opens': '08:00',
      'closes': '21:00',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />

      <div className="flex flex-col">
        {/* Page Top Banner */}
        <section className="bg-primary-950 text-white py-12 md:py-16">
          <div className="container-custom">
            <Breadcrumbs
              customLabels={{
                hyderabad: 'Hyderabad',
                [loc.slug]: loc.name,
              }}
            />
            <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <span className="text-green-300 font-semibold text-sm uppercase tracking-wider block mb-2">
                  Local Installation Service Area
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white leading-tight mb-4">
                  Safety Nets Installation in {loc.name}, Hyderabad
                </h1>
                <p className="text-green-100 text-lg leading-relaxed max-w-2xl">
                  Get premium quality safety nets, invisible window grills &amp; ceiling cloth drying hangers installed at your apartment or villa in {loc.name}. Same-day service available.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center shrink-0">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="btn-primary flex items-center justify-center gap-2"
                  id={`loc-${loc.slug}-call`}
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
                  id={`loc-${loc.slug}-whatsapp`}
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
              {/* Left Column - Area Information */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 font-heading">
                    Same-Day Safety Net Services in {loc.name}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base mb-4">
                    Apparao Safety Nets provides specialized balcony safety net and pigeon net installation services near you in <span className="font-semibold text-slate-900">{loc.fullName}</span> (Pincode: {loc.pincode}). Our team operates with quick-turnaround response times, completing measurement inspections and final setups on the same day.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-base">
                    Whether you reside in a high-rise apartment complex or a private villa, child safety and bird control are top concerns. We utilize premium HDPE monofilament UV-stabilized nets and SS316 marine-grade invisible safety wires that keep children and pets secure, repel pigeons, and preserve your balconies&apos; aesthetics.
                  </p>
                </div>

                {/* Local Trust Signal Box */}
                <div className="bg-primary-50/50 rounded-2xl p-6 sm:p-8 border border-primary-100 space-y-4">
                  <h3 className="text-xl font-bold text-primary-900 font-heading flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-600 animate-float" />
                    Serving Near {loc.name} landmarks
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Our technicians frequently visit residential sites around major local landmarks including:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {loc.landmarks.map((landmark, i) => (
                      <span
                        key={i}
                        className="bg-white border border-primary-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
                      >
                        📍 {landmark}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popular Apartments */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 font-heading">
                    Completed Installations in {loc.name} Communities
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    We have successfully installed child safety nets, bird protection screens, and cloth drying hangers at popular residential apartments and townships in {loc.name}, such as:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {loc.popularApartments.map((apt, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm hover:border-primary-500 transition-colors"
                      >
                        <CheckCircle className="w-4.5 h-4.5 text-primary-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{apt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Services list */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 font-heading">
                    Services We Offer in {loc.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ALL_SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/${s.category}/${s.slug}`}
                        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-primary-500 transition-colors shadow-sm group"
                      >
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary-600 transition-colors">
                            {s.shortTitle}
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mt-0.5">
                            {s.category.replace('-', ' ')}
                          </span>
                        </div>
                        <Shield className="w-4 h-4 text-primary-500 group-hover:rotate-12 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Inline Quote Form */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <ContactForm
                  defaultService=""
                  title={`Request Callback in ${loc.name}`}
                  subtitle={`Submit your details and get a free quote for safety nets in ${loc.name} within 15 mins.`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Local Area Linking Grid */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="container-custom">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
              Other Neighborhoods We Serve in Hyderabad
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {LOCATIONS.filter((l) => l.slug !== loc.slug).map((l) => (
                <Link
                  key={l.slug}
                  href={`/hyderabad/${l.slug}`}
                  className="bg-white border border-slate-200 hover:border-primary-500 hover:text-primary-600 transition-all p-2.5 rounded-lg text-center shadow-xs"
                >
                  <span className="text-[11px] font-semibold text-slate-800 block truncate">
                    {l.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          title={`Looking for Safety Nets in ${loc.name}?`}
          subtitle={`Call Apparao Safety Nets for standard same-day installations. Over ${BUSINESS.installationsCount} happy customers.`}
        />
      </div>
    </>
  );
}
