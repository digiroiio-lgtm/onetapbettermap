import Link from 'next/link'
import type { Metadata } from 'next'
import UseCaseLayout from '../_components/UseCaseLayout'

const canonical = 'https://mapsrankchecker.com/use-cases/real-estate-google-maps-ranking'

export const metadata: Metadata = {
  title: 'Real Estate Agents and Google Maps Ranking in 2025',
  description:
    'Real estate visibility wins when agents dominate every zone, track expansions, and tie ranks to high-value leads.',
  alternates: { canonical },
  openGraph: {
    title: 'Real Estate Agents and Google Maps Ranking in 2025',
    description:
      'Real estate visibility wins when agents dominate every zone, track expansions, and tie ranks to high-value leads.',
    url: canonical,
    type: 'article',
  },
}

const sections = [
  {
    title: 'How clients find real estate agents today',
    paragraphs: [
      'They do not research; they tap the closest trusted option.',
      'The first visible agent often gets the call.',
    ],
  },
  {
    title: 'Why real estate visibility breaks down',
    paragraphs: [],
    subheadings: [
      {
        title: 'Fragmented service areas',
        paragraphs: [
          'Ranking well in one district means nothing city-wide.',
          'You need multi-area coverage to capture demand.',
        ],
      },
      {
        title: 'High-value missed opportunities',
        paragraphs: [
          'One lost lead can mean tens of thousands in commission.',
          'Pinpoint exactly where those leads see competitors.',
        ],
      },
    ],
  },
  {
    title: 'Real estate–specific ranking dynamics',
    paragraphs: [],
    subheadings: [
      {
        title: 'Coverage > position',
        paragraphs: [
          'Being visible across zones beats top ranking in one.',
          'Map coverage gaps with the multi-area grid.',
        ],
      },
      {
        title: 'Competitor expansion tracking',
        paragraphs: [
          'Agencies expand coverage aggressively and silently.',
          'Detect those moves with competitor alerts before markets shift.',
        ],
      },
    ],
  },
  {
    title: 'How agents use MapsRankChecker',
    paragraphs: [
      'Multi-area grid comparison',
      'Competitor growth detection',
      'Revenue-weighted ranking insights',
      <>
        Find where high-value leads see competitors by linking your scans to the <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">Revenue Forecaster</Link>.
      </>,
      <>
        Start with a <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free scan</Link> across every district you serve.
      </>,
    ],
  },
]

export default function RealEstateUseCase() {
  return (
    <UseCaseLayout
      h1="Google Maps Ranking for Real Estate: Be Seen Where Buyers Search"
      canonical={canonical}
      intro="Agents win when they dominate every neighborhood and tie visibility to high-value leads."
      sections={sections}
    />
  )
}
