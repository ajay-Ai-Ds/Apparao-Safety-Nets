import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';
import { SAFETY_NETS } from '@/lib/services-data';
import SectionHeading from '@/components/shared/SectionHeading';
import CTABanner from '@/components/shared/CTABanner';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata = {
  title: 'Safety Nets Installation Services in Hyderabad | All Net Types',
  description:
    'Apparao Safety Nets offers Hyderabad\'s best safety net installation. Balcony safety nets, pigeon nets, kids safety nets, sports nets & more. 100% genuine HDPE materials. Free quotes.',
};

export default function SafetyNetsPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary-950 text-white py-12 md:py-16">
        <div className="container-custom">
          <Breadcrumbs customLabels={{ 'safety-nets': 'Safety Nets' }} />
          <div className="mt-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 text-white">
              Safety Net Installation Services
            </h1>
            <p className="text-green-100 text-lg leading-relaxed">
              Premium, durable, and highly secure safety net solutions custom-fitted for your balcony, windows, staircases, and open shafts across Hyderabad.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Safety Net Services */}
      <section className="py-16 sm:py-20 section-pattern">
        <div className="container-custom">
          <SectionHeading
            badge="Our Offerings"
            title="Premium Safety Nets for Every Need"
            subtitle="We provide specialized safety nets designed for maximum strength, durability, and aesthetics. Select a service to learn more."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SAFETY_NETS.map((service) => (
              <div
                key={service.id}
                className="bg-card border border-card-border rounded-2xl overflow-hidden card-hover shadow-sm flex flex-col"
              >
                {/* Visual Placeholder for Service Hero */}
                <div className="h-48 bg-gradient-to-br from-primary-800 to-primary-950 p-6 flex flex-col justify-between text-white relative">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)', backgroundSize: '12px 12px' }} />
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Shield className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-green-300 font-sans">
                      Professional Installation
                    </span>
                    <h3 className="text-xl font-bold font-heading mt-1 leading-tight text-white">
                      {service.shortTitle}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.description.slice(0, 150)}...
                    </p>
                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold text-slate-400 uppercase block tracking-wider">
                        Key Benefits
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
                    href={`/safety-nets/${service.slug}`}
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
        title="Protect Your Family Today"
        subtitle="Call Apparao Safety Nets for a same-day free measurement site visit and installation quotes anywhere in Hyderabad."
      />
    </div>
  );
}
