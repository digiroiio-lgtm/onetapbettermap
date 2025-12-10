import Script from 'next/script'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google Maps SEO Guides & Tools | One Tap, Better Map',
  description: 'A complete hub of Google Maps SEO guides, including checker, optimization, algorithm, how-to, and Chrome extension for local rankings.',
}

export default function GoogleMapsSeoHubPage() {
  const hubSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://mapsrankchecker.com/google-maps-seo/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://mapsrankchecker.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Google Maps SEO",
            "item": "https://mapsrankchecker.com/google-maps-seo/"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": "https://mapsrankchecker.com/google-maps-seo/",
        "url": "https://mapsrankchecker.com/google-maps-seo/",
        "name": "Google Maps SEO Guides & Tools",
        "description": "A complete hub of Google Maps SEO guides, including checker, optimization, algorithm, how-to, and Chrome extension for local rankings.",
        "breadcrumb": {
          "@id": "https://mapsrankchecker.com/google-maps-seo/#breadcrumb"
        },
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://mapsrankchecker.com/#website"
        },
        "mainEntity": {
          "@type": "ItemList",
          "@id": "https://mapsrankchecker.com/google-maps-seo/#guides",
          "name": "Google Maps SEO Guides",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "url": "https://mapsrankchecker.com/google-maps-seo/checker/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "url": "https://mapsrankchecker.com/google-maps-seo/optimization/"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "url": "https://mapsrankchecker.com/google-maps-seo/how-it-works/"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "url": "https://mapsrankchecker.com/google-maps-seo/how-to/"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "url": "https://mapsrankchecker.com/google-maps-seo/extension/"
            }
          ]
        }
      }
    ]
  }

  const guides = [
    {
      href: '/google-maps-seo/checker/',
      title: 'Google Maps SEO Checker',
      description: 'Real-time local ranking scan with GeoGrid technology. Check your true Google Maps visibility in seconds.',
      icon: '🔍'
    },
    {
      href: '/google-maps-seo/optimization/',
      title: 'Google Maps SEO Optimization',
      description: 'Complete optimization guide for 2025. Categories, reviews, prominence, citations, and ranking factors.',
      icon: '⚡'
    },
    {
      href: '/google-maps-seo/how-it-works/',
      title: 'How Google Maps SEO Works',
      description: 'Understand the algorithm: relevance, distance, prominence, and hidden ranking signals explained.',
      icon: '🧠'
    },
    {
      href: '/google-maps-seo/how-to/',
      title: 'How To Do Google Maps SEO',
      description: 'Step-by-step tutorial for local businesses. Practical actions to boost your map rankings fast.',
      icon: '📝'
    },
    {
      href: '/google-maps-seo/extension/',
      title: 'Google Maps SEO Extension',
      description: 'One-tap Chrome extension for instant rank checks, competitor analysis, and visibility scoring.',
      icon: '🔌'
    }
  ]

  return (
    <>
      <Script
        id="gms-hub-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
        strategy="beforeInteractive"
      />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Google Maps SEO</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-xl mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Google Maps SEO Guides & Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Everything you need to dominate local search. From real-time ranking checks to advanced optimization strategies.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-8 border border-gray-100 hover:border-primary"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{guide.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {guide.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary font-semibold">
                        Read guide
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Check Your Rankings?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get your free Google Maps visibility report in seconds
            </p>
            <Link
              href="/#scan-section"
              className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Scan
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
