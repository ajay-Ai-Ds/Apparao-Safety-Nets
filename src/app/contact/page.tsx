import { BUSINESS } from '@/lib/constants';
import { Phone, Mail, MapPin, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ContactForm from '@/components/shared/ContactForm';

export const metadata = {
  title: 'Contact Apparao Safety Nets Hyderabad | Free Quote & Inspection',
  description:
    'Contact Apparao Safety Nets for fast, professional safety net installation in Hyderabad. Same-day service. Call or WhatsApp +91-9876543210.',
};

export default function ContactPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': BUSINESS.name,
    'image': `${BUSINESS.siteUrl}/images/services/balcony-safety-nets.webp`,
    'telephone': BUSINESS.phone,
    'email': BUSINESS.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': BUSINESS.address.street,
      'addressLocality': BUSINESS.address.area,
      'addressRegion': BUSINESS.address.city,
      'postalCode': BUSINESS.address.pincode,
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': BUSINESS.coordinates.lat,
      'longitude': BUSINESS.coordinates.lng,
    },
    'url': BUSINESS.siteUrl,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="flex flex-col">
        {/* Page Header */}
        <section className="bg-primary-950 text-white py-12 md:py-16">
          <div className="container-custom">
            <Breadcrumbs customLabels={{ 'contact': 'Contact Us' }} />
            <div className="mt-4 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 text-white">
                Contact Apparao Safety Nets
              </h1>
              <p className="text-green-100 text-lg leading-relaxed">
                Have questions or need a quotation? Get in touch with our Hyderabad safety net installation experts today. Same-day slots available.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info and Form Grid */}
        <section className="py-16 sm:py-20 section-pattern">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column - Contact Details */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">
                    Quick Connect
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 font-heading">
                    We Are Ready to Help You
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Feel free to call us directly, send us a message on WhatsApp, or fill out the quotation request form. Our team will get back to you with free estimates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary-500 transition-colors group"
                    id="contact-page-phone-card"
                    data-tracking="call-click"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center border border-primary-100 shrink-0 group-hover:bg-primary-600 transition-colors">
                      <Phone className="w-5 h-5 text-primary-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Call Now</h4>
                      <p className="text-slate-600 text-xs mt-1">{BUSINESS.phone}</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}`}
                    className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-green-500 transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-page-whatsapp-card"
                    data-tracking="whatsapp-click"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center border border-green-100 shrink-0 group-hover:bg-green-600 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">WhatsApp</h4>
                      <p className="text-slate-600 text-xs mt-1">Chat Instantly</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary-500 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center border border-primary-100 shrink-0 group-hover:bg-primary-600 transition-colors">
                      <Mail className="w-5 h-5 text-primary-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
                      <p className="text-slate-600 text-xs mt-1">{BUSINESS.email}</p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center border border-primary-100 shrink-0">
                      <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
                      <p className="text-slate-600 text-xs mt-1">8:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center border border-primary-100 shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Office Address</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      {BUSINESS.address.street}, {BUSINESS.address.area}, {BUSINESS.address.city}, {BUSINESS.address.state} - {BUSINESS.address.pincode}
                    </p>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="flex gap-4 p-5 bg-primary-50 border border-primary-100 rounded-2xl">
                  <ShieldCheck className="w-8 h-8 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-primary-900 text-sm">Free Measuring Visit</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      We offer free dimensions measurement inspection and exact quotation estimates directly at your home without any obligation or fees.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="lg:col-span-6">
                <ContactForm
                  title="Send Us a Message"
                  subtitle="Please fill out the form below. We will call you back within 15 minutes."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Map Embed Section */}
        <section className="h-96 w-full bg-slate-200 border-t border-slate-300">
          {/* Hyderabad General Map Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m3!1d121824.23847926129!2d78.34960309999998!3d17.4113264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeb2e73%3A0x39c09aa303c7340e!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1688647895678!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location for Apparao Safety Nets Hyderabad"
          />
        </section>
      </div>
    </>
  );
}
