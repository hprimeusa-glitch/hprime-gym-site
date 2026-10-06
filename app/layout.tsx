import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ModalProvider } from '@/contexts/ModalContext';
import LeadFormModalWrapper from '@/components/LeadFormModalWrapper';
import StickyMobileBar from '@/components/StickyMobileBar';
import PromoPopup from '@/components/PromoPopup';
import UTMTracker from '@/components/UTMTracker';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/schema';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const SITE_URL = 'https://www.hprime-gym.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'H-Prime Gym Equipment Repair | Denver, CO | Same-Day Service',
  description: 'Professional gym equipment repair in the Denver Metro area. Same-day service, experienced technicians. Treadmills, ellipticals, stationary bikes, rowing machines & more. Call (720) 706-6650!',
  keywords: 'gym equipment repair, Denver, Colorado, treadmill repair, elliptical repair, stationary bike repair, rowing machine repair, same-day service, H-Prime',
  openGraph: {
    title: 'H-Prime Gym Equipment Repair | Same-Day Service in Denver, CO',
    description: 'Professional gym equipment repair in the Denver Metro area. Same-day service, experienced technicians.',
    url: SITE_URL,
    siteName: 'H-Prime Gym Equipment Repair',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/logo-og.png`,
        width: 1200,
        height: 630,
        alt: 'H-Prime Gym Equipment Repair',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'H-Prime Gym Equipment Repair | Same-Day Service in Denver, CO',
    description: 'Professional gym equipment repair in the Denver Metro area. Same-day service, experienced technicians.',
    images: [`${SITE_URL}/logo-og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="gtm" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PDBBJMSG');
      `}</Script>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PDBBJMSG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <UTMTracker />
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <LeadFormModalWrapper />
          <StickyMobileBar />
          <PromoPopup />
        </ModalProvider>
      </body>
    </html>
  );
}
