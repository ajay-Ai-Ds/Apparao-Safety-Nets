'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

interface BreadcrumbsProps {
  customLabels?: Record<string, string>;
}

/**
 * Generates a human-readable label from a URL segment.
 * Replaces hyphens with spaces and capitalizes each word.
 */
function segmentToLabel(segment: string): string {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumbs({ customLabels = {} }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Don't render on homepage
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items with href and label
  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = customLabels[segment] ?? segmentToLabel(segment);
    return { href, label };
  });

  // JSON-LD BreadcrumbList schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BUSINESS.siteUrl,
      },
      ...breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: crumb.label,
        item: `${BUSINESS.siteUrl}${crumb.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="py-3 text-sm text-muted-foreground">
        <ol className="flex items-center flex-wrap gap-1">
          {/* Home */}
          <li className="flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary-600"
              aria-label="Home"
              data-tracking="breadcrumb-home"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={crumb.href} className="flex items-center">
                <ChevronRight
                  className="mx-1 h-3.5 w-3.5 shrink-0 text-slate-400"
                  aria-hidden="true"
                />

                {isLast ? (
                  <span
                    className="font-semibold text-primary-700"
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-200 hover:text-primary-600"
                    data-tracking={`breadcrumb-${crumb.href.replace(/\//g, '-')}`}
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
