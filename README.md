# Apparao Safety Nets

Premium, Ads-Ready, SEO-Optimized Safety Nets and Balcony Safety installation business website for Hyderabad, Telangana, India. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## 🚀 Key Features

1. **Ads & Conversion-Ready Tracking Layer**:
   - **Google Tag Manager (GTM)**: Global GTM container integrated seamlessly in root layout with fallback noscript iframe.
   - **UTM Capture**: Parses UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `gclid`) on entry, persists them in client session storage, and submits them as hidden form fields.
   - **Dynamic Number Insertion (DNI)**: Automatically replaces default organic phone numbers with the Google Ads tracked phone number for users coming from paid search ads.
   - **Conversion Events**: Standardised client dataLayer pushes for `call_click`, `whatsapp_click`, `lead_form_submitted`, and backup `/thank-you` page views.

2. **Premium Visual Aesthetics**:
   - Curated forest-green/emerald/white color palette with custom CSS glassmorphism, gradient text, hover cards, and timeline transitions.
   - Fully custom-built animated **Hero Carousel** with autoplay controls, swipe detection, and keyboard access.
   - Floating CTA FAB cluster matching mobile-first guidelines.

3. **SEO and Performance Engine**:
   - **50+ Pre-rendered Pages**: Full static pre-rendering (SSG) for 13 distinct services (9 safety nets + 2 invisible grills + 2 cloth hangers) and 26 Hyderabad neighborhoods.
   - **Auto-generated SEO**: Dynamic `sitemap.xml` and `robots.txt` configuration.
   - **Rich Schema**: Injected JSON-LD microdata for `Organization`, `LocalBusiness`, `Service`, `BreadcrumbList`, and `FAQPage` across specific templates.

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18.x** or higher installed.

### 2. Installation
Run the following inside the project directory:
```bash
npm install
```

### 3. Development Server
Start the Turbopack local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
Create an optimized production bundle:
```bash
npm run build
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory to customize the business parameters and GTM container tracking:

```env
# Google Tag Manager Container ID (e.g., GTM-XXXXXXX)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# GA4 Measurement ID
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Google Ads Labels
NEXT_PUBLIC_GADS_CONVERSION_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GADS_CALL_LABEL=XXXXXXXXXXXX
NEXT_PUBLIC_GADS_FORM_LABEL=XXXXXXXXXXXX
NEXT_PUBLIC_GADS_WHATSAPP_LABEL=XXXXXXXXXXXX

# Contact Numbers
NEXT_PUBLIC_PHONE=+91-9876543210
NEXT_PUBLIC_WHATSAPP=+91-9876543210
NEXT_PUBLIC_TRACKING_PHONE=+91-9876543211  # Ad forwarding call tracking number
NEXT_PUBLIC_EMAIL=info@apparaosafetynets.com
NEXT_PUBLIC_SITE_URL=https://apparaosafetynets.com
```

---

## 📂 Project Structure

```
apparao-safety-nets/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts   # Form submission API
│   │   ├── safety-nets/           # 9 safety net pages
│   │   ├── invisible-grills/      # 2 invisible grill pages
│   │   ├── cloth-hangers/         # 2 cloth hanger pages
│   │   ├── hyderabad/             # 26 Hyderabad area pages
│   │   ├── layout.tsx             # GTM, fonts, root shell
│   │   ├── page.tsx               # Wired Home Page
│   │   ├── sitemap.ts             # Sitemap generator
│   │   └── robots.ts              # Robots.txt rules
│   ├── components/
│   │   ├── ads/
│   │   │   └── UTMTracker.tsx     # UTM Capture & DNI DOM replacer
│   │   ├── home/
│   │   │   ├── HeroCarousel.tsx   # Touch-ready carousel
│   │   │   └── FAQSection.tsx     # Accordion with FAQ Schema
│   │   └── shared/
│   │       └── ContactForm.tsx    # UTM validation form
│   └── lib/
│       ├── constants.ts           # Business info configurations
│       ├── services-data.ts       # 13 services metadata
│       └── locations-data.ts      # Hyderabad locations metadata
```
