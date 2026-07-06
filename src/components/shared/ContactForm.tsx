'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { ALL_SERVICES } from '@/lib/services-data';

interface ContactFormProps {
  defaultService?: string;
  title?: string;
  subtitle?: string;
}

export default function ContactForm({
  defaultService = '',
  title = 'Request a Free Quote',
  subtitle = 'Get free site inspection and accurate pricing estimate within 30 minutes.',
}: ContactFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    location: '',
    message: '',
  });

  const [utmParams, setUtmParams] = useState({
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    gclid: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Load UTM parameters from sessionStorage
  useEffect(() => {
    try {
      const storedSource = sessionStorage.getItem('utm_source') || '';
      const storedMedium = sessionStorage.getItem('utm_medium') || '';
      const storedCampaign = sessionStorage.getItem('utm_campaign') || '';
      const storedTerm = sessionStorage.getItem('utm_term') || '';
      const storedGclid = sessionStorage.getItem('gclid') || '';

      setUtmParams({
        utmSource: storedSource,
        utmMedium: storedMedium,
        utmCampaign: storedCampaign,
        utmTerm: storedTerm,
        gclid: storedGclid,
      });
    } catch (e) {
      console.warn('Unable to access sessionStorage for UTM tracking:', e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus('error');
      setErrorMessage('Please fill in your Name and Phone Number.');
      return;
    }

    setStatus('submitting');

    try {
      const payload = {
        ...formData,
        ...utmParams,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Please try again.');
      }

      // Success
      setStatus('success');
      
      // Fire Google Ads conversion tracking event to dataLayer
      if (typeof window !== 'undefined') {
        const windowWithDataLayer = window as unknown as { dataLayer: Record<string, unknown>[] };
        windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
        windowWithDataLayer.dataLayer.push({
          event: 'lead_form_submitted',
          formId: 'contact-form',
          service: formData.service,
          location: formData.location,
        });
      }

      // Construct WhatsApp message text
      const waMessage = `Hi Apparao Safety Nets! I have submitted an enquiry:
- *Name*: ${formData.name}
- *Phone*: ${formData.phone}
- *Service*: ${formData.service || 'Safety Nets/Invisible Grills'}
- *Location*: ${formData.location || 'Hyderabad'}
- *Message*: ${formData.message || 'Please contact me.'}`;

      const waPhone = BUSINESS.whatsapp.replace(/[^0-9]/g, '');
      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

      // Open WhatsApp
      if (typeof window !== 'undefined') {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = waUrl;
        } else {
          window.open(waUrl, '_blank');
        }
      }

      // Redirect to thank you page
      router.push('/thank-you');
    } catch (err: unknown) {
      setStatus('error');
      const errMessage = err instanceof Error ? err.message : 'Something went wrong. Please call us directly.';
      setErrorMessage(errMessage);
    }
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 sm:p-8 shadow-lg max-w-xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {subtitle}
        </p>
      </div>

      {status === 'success' ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-primary-600 mx-auto mb-4 animate-scale-in" />
          <h4 className="text-lg font-bold text-slate-900 mb-2">Thank You!</h4>
          <p className="text-muted-foreground text-sm mb-6">
            Your request has been submitted successfully. We are redirecting you to confirmation details...
          </p>
          <a
            href={`tel:${BUSINESS.phone}`}
            className="btn-primary w-full justify-center"
          >
            Call {BUSINESS.phone} Now
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
          {status === 'error' && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm animate-fade-in">
              <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
              <div>
                <span className="font-semibold">Error:</span> {errorMessage}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="form-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="form-name"
                name="name"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none transition-colors bg-white text-slate-900"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="form-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="form-phone"
                name="phone"
                required
                placeholder="e.g. 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none transition-colors bg-white text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label htmlFor="form-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                id="form-email"
                name="email"
                placeholder="yourname@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none transition-colors bg-white text-slate-900"
              />
            </div>

            {/* Service Select */}
            <div>
              <label htmlFor="form-service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Required Service
              </label>
              <select
                id="form-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none transition-colors bg-white text-slate-900"
              >
                <option value="">Select a Service</option>
                {ALL_SERVICES.map((s) => (
                  <option key={s.id} value={s.shortTitle}>
                    {s.shortTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Area in Hyderabad */}
          <div>
            <label htmlFor="form-location" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Your Area in Hyderabad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="form-location"
              name="location"
              required
              placeholder="e.g. Kukatpally, Madhapur, Gachibowli"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none transition-colors bg-white text-slate-900"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="form-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Requirements <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="form-message"
              name="message"
              rows={3}
              placeholder="Tell us about the area dimensions, preferred timings or queries"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none transition-colors bg-white text-slate-900"
            />
          </div>

          {/* Hidden UTM Fields */}
          <input type="hidden" name="utmSource" value={utmParams.utmSource} />
          <input type="hidden" name="utmMedium" value={utmParams.utmMedium} />
          <input type="hidden" name="utmCampaign" value={utmParams.utmCampaign} />
          <input type="hidden" name="utmTerm" value={utmParams.utmTerm} />
          <input type="hidden" name="gclid" value={utmParams.gclid} />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary w-full justify-center font-bold text-base py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <span>Submitting Details...</span>
            ) : (
              <>
                <span>Get Free Site Quote</span>
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground mt-2">
            🛡️ Your privacy is guaranteed. We do not spam or share your contact details.
          </p>
        </form>
      )}
    </div>
  );
}
