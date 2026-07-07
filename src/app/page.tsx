import dynamic from 'next/dynamic';
import HeroCarousel from '@/components/home/HeroCarousel';
import ServicesTabs from '@/components/home/ServicesTabs';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { Shield, Award, Clock, Users } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

// Dynamic imports for below-the-fold components
const HomeGallery = dynamic(() => import('@/components/home/HomeGallery'), { ssr: true });
const ProcessSteps = dynamic(() => import('@/components/home/ProcessSteps'), { ssr: true });
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), { ssr: true });
const FAQSection = dynamic(() => import('@/components/home/FAQSection'), { ssr: true });
const CTABanner = dynamic(() => import('@/components/shared/CTABanner'), { ssr: true });

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Premium Hero Carousel Section */}
      <HeroCarousel />

      {/* Trust Badges - positioned relative to overlay hero */}
      <section className="relative -mt-12 sm:-mt-16 z-20 container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: Award,
              label: 'Years Experience',
              value: `${new Date().getFullYear() - BUSINESS.yearEstablished}+`,
            },
            {
              icon: Users,
              label: 'Happy Customers',
              value: BUSINESS.installationsCount,
            },
            {
              icon: Shield,
              label: 'Year Warranty',
              value: '3-5',
            },
            {
              icon: Clock,
              label: 'Min Free Quote',
              value: '30',
            },
          ].map((badge) => (
            <div
              key={badge.label}
              className="glass rounded-xl p-5 text-center card-hover shadow-lg border border-white/20"
            >
              <badge.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" aria-hidden="true" />
              <p className="text-2xl md:text-3xl font-extrabold text-primary-700 font-heading">
                {badge.value}
              </p>
              <p className="text-sm text-muted-foreground font-medium">{badge.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Services Tabs Section */}
      <ServicesTabs />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Premium Installation Gallery Section */}
      <HomeGallery />

      {/* Process Steps Section */}
      <ProcessSteps />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Banner Section */}
      <CTABanner
        title="Get a Free Quote in 30 Minutes"
        subtitle="Call us now for a free inspection and same-day installation across Hyderabad. No hidden charges. Genuine materials. Expert installation."
        variant="primary"
      />
    </div>
  );
}
