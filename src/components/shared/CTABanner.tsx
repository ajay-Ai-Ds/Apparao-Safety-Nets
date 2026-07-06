import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  variant?: 'primary' | 'dark';
}

export default function CTABanner({
  title = 'Get a Free Quote in 2 Hours',
  subtitle = 'Call us now for a free inspection and same-day installation across Hyderabad. No hidden charges. Genuine materials. Expert installation.',
  variant = 'primary',
}: CTABannerProps) {
  const bgClass = variant === 'dark' ? 'gradient-hero' : 'gradient-primary';
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I need a free quote for safety net installation.')}`;

  return (
    <section className={`${bgClass} py-16`}>
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 font-heading">
          {title}
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-green-50 transition-all shadow-lg text-lg"
            id="cta-banner-call"
            data-tracking="call-click"
          >
            <Phone className="w-5 h-5" />
            {BUSINESS.phone}
          </a>
          <a
            href={whatsappUrl}
            className="btn-whatsapp text-lg px-8 py-4"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-banner-whatsapp"
            data-tracking="whatsapp-click"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
