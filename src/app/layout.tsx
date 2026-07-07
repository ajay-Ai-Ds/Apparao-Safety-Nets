import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/layout/FloatingCTA';
import UTMTracker from '@/components/ads/UTMTracker';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://apparaosafetynets.com'),
  title: {
    default: 'Apparao Safety Nets | #1 Safety Net Installation in Hyderabad',
    template: '%s | Apparao Safety Nets Hyderabad',
  },
  description:
    'Apparao Safety Nets — Hyderabad\'s trusted safety net installation experts since 2012. Balcony nets, pigeon nets, children safety nets, invisible grills & more. Free inspection. Call now!',
  keywords: [
    'safety nets Hyderabad',
    'balcony safety nets',
    'pigeon nets Hyderabad',
    'children safety nets',
    'invisible grills Hyderabad',
    'bird nets installation',
    'safety net price Hyderabad',
    'Apparao Safety Nets',
  ],
  authors: [{ name: 'Apparao Safety Nets' }],
  creator: 'Apparao Safety Nets',
  publisher: 'Apparao Safety Nets',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Apparao Safety Nets',
    title: 'Apparao Safety Nets | #1 Safety Net Installation in Hyderabad',
    description:
      'Hyderabad\'s most trusted safety net installation service. 15,000+ installations. Free quote within 2 hours.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apparao Safety Nets | #1 Safety Net Installation in Hyderabad',
    description:
      'Hyderabad\'s most trusted safety net installation service. 15,000+ installations. Free quote within 2 hours.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'crFERTh0vqMw8eaWGasZVabOURRBBpUoKouTJ3LIghg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full`}
    >
      <head>
        {/* Preconnect to GTM/Google Analytics domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        
        {/* Google tag (gtag.js) */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18304733170"
        />
        <Script
          id="gtag-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-M5S8SWWZ2Y');
              gtag('config', 'AW-18304733170');
            `,
          }}
        />
        
        {/* Google Tag Manager */}
        {gtmId && gtmId !== 'GTM-XXXXXXX' && (
          <Script
            id="gtm-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* GTM noscript fallback */}
        {gtmId && gtmId !== 'GTM-XXXXXXX' && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

        {/* Skip to content for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Dynamic Number Insertion & UTM Tracker */}
        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>

        {/* Header */}
        <Header />

        {/* Main content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating CTAs */}
        <FloatingCTA />
      </body>
    </html>
  );
}
