import Script from 'next/script'
import Link from 'next/link'

interface GuidePageProps {
  url: string
  breadcrumbTitle: string
  headline: string
  description: string
  datePublished?: string
  dateModified?: string
  children: React.ReactNode
}

export default function GuidePageLayout({
  url,
  breadcrumbTitle,
  headline,
  description,
  datePublished = '2025-01-01',
  dateModified = '2025-01-05',
  children,
}: GuidePageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://onetapbettermap.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Google Maps SEO",
            "item": "https://onetapbettermap.com/google-maps-seo/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": breadcrumbTitle,
            "item": url
          }
        ]
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        "headline": headline,
        "description": description,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        },
        "author": {
          "@type": "Organization",
          "name": "One Tap, Better Map"
        },
        "publisher": {
          "@type": "Organization",
          "name": "One Tap, Better Map",
          "logo": {
            "@type": "ImageObject",
            "url": "https://onetapbettermap.com/logo.png"
          }
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "breadcrumb": {
          "@id": `${url}#breadcrumb`
        }
      }
    ]
  }

  return (
    <>
      <Script
        id={`schema-${url.split('/').filter(Boolean).pop()}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        strategy="beforeInteractive"
      />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/google-maps-seo/" className="hover:text-primary">
              Google Maps SEO
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{breadcrumbTitle}</span>
          </nav>
        </div>
      </div>

      {children}
    </>
  )
}
