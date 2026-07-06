import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = BUSINESS.siteUrl;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/thank-you'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
