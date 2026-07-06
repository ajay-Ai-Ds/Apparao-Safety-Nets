import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/lib/constants';
import { ALL_SERVICES } from '@/lib/services-data';
import { LOCATIONS } from '@/lib/locations-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS.siteUrl;

  // 1. Static Pages
  const staticPages = ['', '/about', '/gallery', '/contact', '/safety-nets', '/invisible-grills', '/cloth-hangers'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Services Dynamic Pages
  const servicePages = ALL_SERVICES.map((service) => ({
    url: `${baseUrl}/${service.category}/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Locations Dynamic Pages
  const locationPages = LOCATIONS.map((loc) => ({
    url: `${baseUrl}/hyderabad/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...locationPages];
}
