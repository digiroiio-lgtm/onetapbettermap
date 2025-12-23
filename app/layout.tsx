import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Script from 'next/script'
import IndustryProvider from '@/components/IndustryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'MapsRankChecker — Google Maps Visibility & Local Ranking Tracker',
    template: '%s | MapsRankChecker',
  },
  description: 'Track Google Maps visibility, uncover ranking gaps, and recover local revenue with GeoGrid scans and competitor insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://mapsrankchecker.com/#website",
    "url": "https://mapsrankchecker.com/",
    "name": "One Tap, Better Map",
    "description": "One Tap, Better Map is a simple Google Maps SEO checker and optimization tool that shows where you rank on the map and what to fix.",
    "publisher": {
      "@type": "Organization",
      "name": "One Tap, Better Map",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mapsrankchecker.com/logo.png"
      }
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <IndustryProvider>
          <Navigation />
          {children}
          <Footer />
        </IndustryProvider>
      </body>
    </html>
  )
}
