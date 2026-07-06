'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';

export default function UTMTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Capture UTM parameters and gclid from URL
    const source = searchParams.get('utm_source');
    const medium = searchParams.get('utm_medium');
    const campaign = searchParams.get('utm_campaign');
    const term = searchParams.get('utm_term');
    const gclid = searchParams.get('gclid');

    if (source) sessionStorage.setItem('utm_source', source);
    if (medium) sessionStorage.setItem('utm_medium', medium);
    if (campaign) sessionStorage.setItem('utm_campaign', campaign);
    if (term) sessionStorage.setItem('utm_term', term);
    if (gclid) sessionStorage.setItem('gclid', gclid);

    // 2. Determine if ad traffic
    const isAdTraffic =
      gclid ||
      medium === 'cpc' ||
      medium === 'ppc' ||
      source === 'google-ads' ||
      sessionStorage.getItem('gclid') ||
      sessionStorage.getItem('utm_medium') === 'cpc';

    if (isAdTraffic) {
      sessionStorage.setItem('is_ad_visitor', 'true');
    }

    // 3. Dynamic Number Insertion (DNI)
    const organicPhone = BUSINESS.phone;
    const trackingPhone = BUSINESS.trackingPhone;

    const performDniReplacement = () => {
      const isAdVisitor = sessionStorage.getItem('is_ad_visitor') === 'true';
      if (!isAdVisitor) return;

      // Find all anchors with tel links
      const telLinks = document.querySelectorAll('a[href^="tel:"]');
      telLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        const cleanOrganic = organicPhone.replace(/[^0-9+]/g, '');
        const cleanTracking = trackingPhone.replace(/[^0-9+]/g, '');

        if (href.includes(cleanOrganic) || link.textContent?.includes(organicPhone)) {
          link.setAttribute('href', `tel:${cleanTracking}`);
          
          // If the text content contains the phone number, replace it
          if (link.textContent && link.textContent.includes(organicPhone)) {
            link.textContent = link.textContent.replace(organicPhone, trackingPhone);
          }
        }
      });

      // Find other elements containing the phone number
      const walkTextNodes = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.nodeValue && node.nodeValue.includes(organicPhone)) {
            node.nodeValue = node.nodeValue.replace(organicPhone, trackingPhone);
          }
        } else {
          node.childNodes.forEach(walkTextNodes);
        }
      };
      
      // Only walk through relevant text nodes to avoid performance issues
      const textContainers = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, div.text-center');
      textContainers.forEach((container) => {
        // Skip script or style tags
        if (container.tagName !== 'SCRIPT' && container.tagName !== 'STYLE') {
          walkTextNodes(container);
        }
      });
    };

    // Run DNI replacement immediately
    performDniReplacement();

    // Setup MutationObserver to watch for dynamic DOM updates and re-apply DNI
    const observer = new MutationObserver(() => {
      performDniReplacement();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 4. Attach click event listeners for conversion tracking (Call & WhatsApp)
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (!link) return;

      const href = link.getAttribute('href') || '';

      // Call click tracking
      if (href.startsWith('tel:')) {
        const windowWithDataLayer = window as unknown as { dataLayer: Record<string, unknown>[] };
        windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
        windowWithDataLayer.dataLayer.push({
          event: 'call_click',
          telNumber: href.replace('tel:', ''),
          clickElementId: link.getAttribute('id') || 'unknown-call-link',
          clickPagePath: window.location.pathname,
        });
      }

      // WhatsApp click tracking
      if (href.includes('wa.me') || href.includes('whatsapp.com/send')) {
        const windowWithDataLayer = window as unknown as { dataLayer: Record<string, unknown>[] };
        windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
        windowWithDataLayer.dataLayer.push({
          event: 'whatsapp_click',
          clickElementId: link.getAttribute('id') || 'unknown-whatsapp-link',
          clickPagePath: window.location.pathname,
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [pathname, searchParams]);

  return null; // This is a behavior-only component
}
