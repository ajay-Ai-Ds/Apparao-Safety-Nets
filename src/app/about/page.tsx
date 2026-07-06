import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CTABanner from '@/components/shared/CTABanner';
import SectionHeading from '@/components/shared/SectionHeading';
import { Shield, Award, Clock, Users, CheckCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export const metadata = {
  title: 'About Apparao Safety Nets | Leading Safety Net Experts in Hyderabad',
  description:
    'Apparao Safety Nets has provided premium safety net installations in Hyderabad since 2012. 15,000+ completed projects. Balcony nets, bird nets & invisible grills.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary-950 text-white py-12 md:py-16">
        <div className="container-custom">
          <Breadcrumbs customLabels={{ 'about': 'About Us' }} />
          <div className="mt-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading mb-4 text-white">
              About Apparao Safety Nets
            </h1>
            <p className="text-green-100 text-lg leading-relaxed">
              Serving Hyderabad since 2012, we are the gold standard in residential and commercial safety net installations. Over 15,000 homes secured.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 section-pattern">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">
                Our Story
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 font-heading">
                Providing Peace of Mind to Hyderabad Families
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  Apparao Safety Nets was established in {BUSINESS.yearEstablished} with a single vision: to protect families, pets, and properties in high-rise apartments from fall hazards, bird nuisances, and accidental drops.
                </p>
                <p>
                  Over the past decade, Hyderabad has seen rapid growth in high-rise constructions. With higher balconies and windows comes a greater risk of accidents. We recognized this critical need and pioneered customized safety solutions using the highest grade materials.
                </p>
                <p>
                  Today, we are proud to have completed more than {BUSINESS.installationsCount} successful installations across all parts of Hyderabad and Secunderabad. Our commitment to using genuine materials, maintaining transparent pricing, and ensuring professional craftsmanship has made us the city&apos;s most recommended safety nets installer.
                </p>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-gradient-to-br from-primary-800 to-primary-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 15%, transparent 16%)', backgroundSize: '16px 16px' }} />
              
              <h3 className="text-2xl font-bold font-heading mb-6 text-white">
                Why Apparao Stands Out
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'Certified Genuine Materials', desc: '100% HDPE UV-treated nets and SS316 marine-grade steel wires.' },
                  { icon: Award, title: 'Expert Local Technicians', desc: 'All installations are done by our trained and insured in-house specialists.' },
                  { icon: Clock, title: 'Same-Day Fast Setup', desc: 'Inspection to complete setup in under 4 hours on the same day.' },
                  { icon: Users, title: 'Thousands of Happy Customers', desc: 'Trusted by residential societies, schools, academies and businesses.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                      <item.icon className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-green-100/80 text-xs mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <SectionHeading
            badge="Quality First"
            title="Our Safety Standards & Guarantee"
            subtitle="We don't cut corners when it comes to high-altitude security. Every project goes through rigorous checks."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'High-Tensile Strength',
                desc: 'Our balcony safety nets are built using knotted nylon and HDPE filaments that can withstand heavy impacts and support up to 300+ kg loads.',
              },
              {
                title: 'UV-Stabilization',
                desc: 'All nets are UV-treated to endure scorching Indian summers without degrading, cracking, or breaking, assuring a life of over 5-7 years.',
              },
              {
                title: 'Stainless Steel Fasteners',
                desc: 'We use premium stainless steel screws, wall anchors, and brackets to prevent rust and staining on your walls and ensure rigid holding power.',
              },
            ].map((standard, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm card-hover">
                <CheckCircle className="w-8 h-8 text-primary-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-heading">
                  {standard.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {standard.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </div>
  );
}
