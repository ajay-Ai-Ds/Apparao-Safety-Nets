export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: 'safety-nets' | 'invisible-grills' | 'cloth-hangers';
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  icon: string; // Lucide icon name
  benefits: string[];
  materials: string[];
  priceRange?: string;
  faq: FAQ[];
}

export interface Location {
  slug: string;
  name: string;
  fullName: string; // e.g. 'Kukatpally, Hyderabad'
  metaTitle: string;
  metaDescription: string;
  landmarks: string[];
  popularApartments: string[];
  pincode: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  message: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  gclid?: string;
}

export interface BusinessInfo {
  name: string;
  legalName: string;
  phone: string;
  whatsapp: string;
  trackingPhone: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  siteUrl: string;
  yearEstablished: number;
  installationsCount: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    google?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
