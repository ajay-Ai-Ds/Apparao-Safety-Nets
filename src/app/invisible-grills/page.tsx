import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';
import { INVISIBLE_GRILLS } from '@/lib/services-data';
import SectionHeading from '@/components/shared/SectionHeading';
import CTABanner from '@/components/shared/CTABanner';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata = {
  title: 'Invisible Grills Installation in Hyderabad | SS316 Quality',
  description:
    'Apparao Safety Nets offers premium invisible grills for balconies and windows in Hyderabad. Marine-grade SS316 stainless steel wires. Free inspection. Call now!',
};

export default function InvisibleGrillsPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary-950 text-white py-12 md:py-16">
        <div className="container-custom">
          <Breadcrumbs customLabels={{ 'invisible-grills': 'Invisible Grills' }} />
          <div className="mt-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 text-white">
              Invisible Grills Installation
            </h1>
            <p className="text-green-100 text-lg leading-relaxed">
              Upgrade your home safety with modern, high-tensile SS316 stainless steel invisible grills. Secure your balconies and windows without compromising your skyline views.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Invisible Grills Services */}
      <section className="py-16 sm:py-20 section-pattern">
        <div className="container-custom">
          <SectionHeading
            badge="Modern Safety"
            title="Premium Invisible Grills for High-Rise Living"
            subtitle="Explore our invisible grill solutions. Extremely robust, rustproof, and designed to look virtually invisible from a distance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {INVISIBLE_GRILLS.map((service) => (
              <div
                key={service.id}
                className="bg-card border border-card-border rounded-2xl overflow-hidden card-hover shadow-sm flex flex-col"
              >
                {/* Visual Header */}
                <div className="h-48 bg-gradient-to-br from-primary-800 to-primary-950 p-6 flex flex-col justify-between text-white relative">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)', backgroundSize: '12px 12px' }} />
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Shield className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-green-300 font-sans">
                      SS316 Marine Grade
                    </span>
                    <h3 className="text-xl font-bold font-heading mt-1 leading-tight text-white">
                      {service.shortTitle}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.description.slice(0, 160)}...
                    </p>
                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold text-slate-400 uppercase block tracking-wider">
                        Key Advantages
                      </span>
                      <ul className="grid grid-cols-1 gap-1 text-slate-700 text-sm">
                        {service.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-primary-600 font-bold mt-0.5">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/invisible-grills/${service.slug}`}
                    className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50 transition-colors font-semibold text-sm group"
                  >
                    <span>View Installation Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Upgrade to Invisible Grills"
        subtitle="Schedule a free site survey in Hyderabad today. Our specialists will show you samples and measure the dimensions."
      />
    </div>
  );
}
