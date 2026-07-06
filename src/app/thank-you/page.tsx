import { BUSINESS } from '@/lib/constants';
import { CheckCircle, Phone, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Thank You | Apparao Safety Nets',
  description: 'Your request has been received. We will contact you shortly.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I just filled out your form and want to discuss my safety net requirements immediately.')}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 section-pattern">
      <div className="container-custom max-w-xl text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6 border-4 border-primary-200">
          <CheckCircle className="w-10 h-10 text-primary-600 animate-scale-in" />
        </div>

        {/* Headlines */}
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mb-4">
          Quote Request Received!
        </h1>
        <p className="text-slate-600 text-base mb-8 max-w-md mx-auto leading-relaxed">
          Thank you for choosing Apparao Safety Nets. Our Hyderabad supervisor will call you back within <span className="font-semibold text-primary-700">15-30 minutes</span> to discuss your requirements and schedule a free measuring visit.
        </p>

        {/* Immediate Assistance CTA Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">
            Need Immediate Assistance?
          </h2>
          <p className="text-slate-500 text-xs mb-4 leading-relaxed">
            If you would rather talk to our technician immediately or share site photos, please reach out via phone call or WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="btn-primary flex-1 justify-center py-3 text-sm"
              id="thankyou-call"
              data-tracking="call-click"
            >
              <Phone className="w-4 h-4" />
              Call supervisor
            </a>
            <a
              href={whatsappUrl}
              className="btn-whatsapp flex-1 justify-center py-3 text-sm"
              target="_blank"
              rel="noopener noreferrer"
              id="thankyou-whatsapp"
              data-tracking="whatsapp-click"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
