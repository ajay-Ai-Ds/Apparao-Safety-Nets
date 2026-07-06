import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS, NAV_ITEMS, WHATSAPP_MESSAGE } from '@/lib/constants';

/* ── Service links grouped by category ── */
const SERVICE_GROUPS = [
  {
    title: 'Safety Nets',
    links:
      NAV_ITEMS.find((item) => item.label === 'Safety Nets')?.children ?? [],
  },
  {
    title: 'Invisible Grills',
    links:
      NAV_ITEMS.find((item) => item.label === 'Invisible Grills')?.children ??
      [],
  },
  {
    title: 'Cloth Hangers',
    links:
      NAV_ITEMS.find((item) => item.label === 'Cloth Hangers')?.children ?? [],
  },
];

/* ── Hyderabad service-area locations ── */
const SERVICE_AREAS = [
  { name: 'Kukatpally', slug: 'kukatpally' },
  { name: 'Madhapur', slug: 'madhapur' },
  { name: 'Gachibowli', slug: 'gachibowli' },
  { name: 'Kondapur', slug: 'kondapur' },
  { name: 'Dilsukhnagar', slug: 'dilsukhnagar' },
  { name: 'LB Nagar', slug: 'lb-nagar' },
  { name: 'Secunderabad', slug: 'secunderabad' },
  { name: 'Banjara Hills', slug: 'banjara-hills' },
  { name: 'Jubilee Hills', slug: 'jubilee-hills' },
  { name: 'Kompally', slug: 'kompally' },
];

/* ── Quick-link entries ── */
const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

/* ════════════════════════════════════════════════════════════════════════════ */

export default function Footer() {
  const { address } = BUSINESS;
  const fullAddress = `${address.street}, ${address.area}, ${address.city}, ${address.state} – ${address.pincode}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-primary-950 text-green-100"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Main grid ── */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* ─── Column 1 · Brand & Contact ─── */}
          <div className="space-y-6">
            {/* Brand */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-xl bg-white flex items-center justify-center group-hover:scale-105 transition-all">
                <Image
                  src="/images/Aplogo.webp"
                  alt="Apparao Safety Nets Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-1 rounded-xl"
                />
              </div>
              <span className="text-2xl font-bold text-white font-heading tracking-tight group-hover:text-blue-400 transition-colors">
                {BUSINESS.name}
              </span>
            </Link>

            <p className="text-green-100/95 text-sm leading-relaxed max-w-xs">
              Hyderabad&rsquo;s trusted safety nets, invisible grills &amp;
              cloth hanger installation experts since {BUSINESS.yearEstablished}.
              {' '}{BUSINESS.installationsCount} installations and counting.
            </p>

            {/* Structured address (SEO) */}
            <address
              className="not-italic space-y-3 text-sm"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div className="flex items-start gap-2 text-green-100">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <span itemProp="streetAddress">{address.street}</span>,{' '}
                  <span itemProp="addressLocality">{address.area}</span>,{' '}
                  <span itemProp="addressRegion">{address.city}</span>,{' '}
                  <span>{address.state}</span>{' '}
                  –{' '}
                  <span itemProp="postalCode">{address.pincode}</span>
                </span>
              </div>

              <a
                href={`tel:${BUSINESS.phone}`}
                id="footer-phone"
                data-tracking="footer-phone"
                className="flex items-center gap-2 text-green-50 hover:text-white transition-colors font-medium"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {BUSINESS.phone}
              </a>

              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2 text-green-50 hover:text-white transition-colors font-medium"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {BUSINESS.email}
              </a>
            </address>
          </div>

          {/* ─── Column 2 · Services ─── */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-5 tracking-wide uppercase">
              Our Services
            </h3>

            <nav aria-label="Service pages" className="space-y-5">
              {SERVICE_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="text-accent-400 text-xs font-semibold uppercase tracking-widest mb-2">
                    {group.title}
                  </p>
                  <ul className="space-y-1.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-green-100 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group/link"
                        >
                          <ChevronRight
                            className="h-3 w-3 opacity-0 -ml-4 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all"
                            aria-hidden="true"
                          />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* ─── Column 3 · Service Areas ─── */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-5 tracking-wide uppercase">
              Service Areas
            </h3>

            <nav aria-label="Service areas in Hyderabad">
              <ul className="space-y-1.5">
                {SERVICE_AREAS.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/hyderabad/${area.slug}`}
                      className="text-green-100 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group/area"
                    >
                      <ChevronRight
                        className="h-3 w-3 opacity-0 -ml-4 group-hover/area:opacity-100 group-hover/area:ml-0 transition-all"
                        aria-hidden="true"
                      />
                      Safety Nets in {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ─── Column 4 · Quick Links & CTAs ─── */}
          <div>
            <h3 className="text-white font-heading font-semibold text-base mb-5 tracking-wide uppercase">
              Quick Links
            </h3>

            <nav aria-label="Quick links">
              <ul className="space-y-1.5 mb-8">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-green-100 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group/quick"
                    >
                      <ChevronRight
                        className="h-3 w-3 opacity-0 -ml-4 group-hover/quick:opacity-100 group-hover/quick:ml-0 transition-all"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${BUSINESS.phone}`}
                id="footer-call-cta"
                data-tracking="footer-call-cta"
                className="btn-primary justify-center text-center"
                aria-label={`Call ${BUSINESS.name}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Now
              </a>

              <a
                href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}?text=${WHATSAPP_MESSAGE}`}
                id="footer-whatsapp-cta"
                data-tracking="footer-whatsapp-cta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp justify-center text-center"
                aria-label={`Chat with ${BUSINESS.name} on WhatsApp`}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-green-900/60">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-green-50/95 text-xs font-medium">
          <p>
            &copy; {currentYear} {BUSINESS.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span aria-hidden="true" className="text-green-300">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
