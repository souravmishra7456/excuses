import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "DevExcuse API - Fun Developer Excuses API",
    template: "%s | DevExcuse API"
  },
  description: "A fun and free API that provides developers with creative excuses for when things go wrong in their projects. Get random developer excuses, search by category, and integrate humor into your applications.",
  keywords: [
    "developer excuses",
    "API",
    "programming humor",
    "developer jokes",
    "coding excuses",
    "software development",
    "free API",
    "JSON API",
    "developer tools",
    "programming jokes",
    "tech humor",
    "coding humor",
    "developer memes",
    "software excuses",
    "bug excuses"
  ],
  authors: [{ name: "Sourav" }],
  creator: "Sourav",
  publisher: "DevExcuse API",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://excuses-one.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://excuses-one.vercel.app',
    siteName: 'DevExcuse API',
    title: 'DevExcuse API - Fun Developer Excuses API',
    description: 'A fun and free API that provides developers with creative excuses for when things go wrong in their projects.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevExcuse API - Fun Developer Excuses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevExcuse API - Fun Developer Excuses API',
    description: 'A fun and free API that provides developers with creative excuses for when things go wrong in their projects.',
    images: ['/og-image.png'],
    creator: '@devexcuse',
    site: '@devexcuse',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Developer Tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="vlbin4aTrQE8zViQM6FhohFDbWpx3KUAmM5PsFZBwkw" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebAPI",
              "name": "DevExcuse API",
              "description": "A fun and free API that provides developers with creative excuses for when things go wrong in their projects.",
              "url": "https://excuses-one.vercel.app",
              "baseURL": "https://excuses.onrender.com",
              "documentation": "https://excuses-one.vercel.app/docs",
              "provider": {
                "@type": "Organization",
                "name": "DevExcuse API",
                "url": "https://excuses-one.vercel.app"
              },
              "serviceType": "REST API",
              "areaServed": "Worldwide",
              "availableLanguage": "en",
              "license": "https://opensource.org/licenses/MIT",
              "creator": {
                "@type": "Person",
                "name": "Sourav",
                "url": "https://sourav-portfolio-psi.vercel.app/"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
