import type { BusinessInfo, NavItem } from '@/types';

export const BUSINESS: BusinessInfo = {
  name: 'Apparao Safety Nets',
  legalName: 'Apparao Safety Nets Hyderabad',
  phone: '+91-8309291531',
  whatsapp: '+91-8309291531',
  trackingPhone: '+91-8309291531',
  email: 'info@apparaosafetynets.com',
  address: {
    street: 'Plot No. 42, Beside Metro Station',
    area: 'Kukatpally',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500072',
    country: 'IN',
  },
  coordinates: { lat: 17.4948, lng: 78.3996 },
  siteUrl: 'https://apparaosafetynets.com',
  yearEstablished: 2012,
  installationsCount: '15,000+',
  socialLinks: {},
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Safety Nets',
    href: '/safety-nets',
    children: [
      { label: 'Balcony Safety Nets', href: '/safety-nets/balcony-safety-nets' },
      { label: 'Pigeon Nets', href: '/safety-nets/pigeon-nets' },
      { label: 'Children Safety Nets', href: '/safety-nets/children-safety-nets' },
      { label: 'Monkey Safety Nets', href: '/safety-nets/monkey-safety-nets' },
      { label: 'Duct Area Safety Nets', href: '/safety-nets/duct-area-safety-nets' },
      { label: 'Pet Safety Nets', href: '/safety-nets/pet-safety-nets' },
      { label: 'Construction Safety Nets', href: '/safety-nets/construction-safety-nets' },
      { label: 'Sports Nets', href: '/safety-nets/sports-nets' },
      { label: 'Anti-Bird Spikes', href: '/safety-nets/bird-spikes' },
    ],
  },
  {
    label: 'Invisible Grills',
    href: '/invisible-grills',
    children: [
      { label: 'Balcony Invisible Grills', href: '/invisible-grills/balcony-invisible-grills' },
      { label: 'Window Invisible Grills', href: '/invisible-grills/window-invisible-grills' },
    ],
  },
  {
    label: 'Cloth Hangers',
    href: '/cloth-hangers',
    children: [
      { label: 'Ceiling Cloth Hangers', href: '/cloth-hangers/ceiling-cloth-hangers' },
      { label: 'Wall-Mounted Cloth Hangers', href: '/cloth-hangers/wall-mounted-cloth-hangers' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hi Apparao Safety Nets! I am interested in your safety net services. Please share details.'
);

export const CALL_CTA_TEXT = 'Call Now';
export const WHATSAPP_CTA_TEXT = 'WhatsApp';
