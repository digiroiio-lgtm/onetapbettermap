import Link from 'next/link'
import type { Metadata } from 'next'
import UseCaseLayout from '../_components/UseCaseLayout'

const canonical = 'https://mapsrankchecker.com/use-cases/restaurants-google-maps-ranking'

export const metadata: Metadata = {
  title: 'Google Maps Ranking for Restaurants: Winning First Impressions',
  description:
    'Restaurants win when Maps shows them in proximity, with engagement, competition visibility, and revenue insight tied to every zone.',
  alternates: { canonical },
  openGraph: {
    title: 'Google Maps Ranking for Restaurants: Winning First Impressions',
    description:
      'Restaurants win when Maps shows them in proximity, with engagement, competition visibility, and revenue insight tied to every zone.',
    url: canonical,
    type: 'article',
  },
}

const sections = [
  {
    title: 'How diners actually choose restaurants',
    paragraphs: [
      'They search, scan for distance and rating, and tap quickly.',
      'No scrolling. No brand loyalty until after they see you in the top three.',
    ],
  },
  {
    title: 'Why restaurants lose on Google Maps',
    paragraphs: [],
    subheadings: [
      {
        title: 'Ranking changes by time and location',
        paragraphs: [
          'Lunch zones behave differently than dinner zones.',
          'You need visibility that tracks shifts throughout the day.',
        ],
      },
      {
        title: 'Competitor jumps go unnoticed',
        paragraphs: [
          'By the time sales dip you already lost the rank battle.',
          'Alert-based monitoring keeps you ahead.',
        ],
      },
    ],
  },
  {
    title: 'Ranking factors that matter most for restaurants',
    paragraphs: [],
    subheadings: [
      {
        title: 'Proximity + engagement',
        paragraphs: [
          'Photos, directions, and recent activity signal freshness.',
          'Invest where diners expect an active, nearby restaurant.',
        ],
      },
      {
        title: 'Coverage beats perfection',
        paragraphs: [
          'Ranking #5 everywhere beats #1 in a single street.',
          'Track zones with the <Link href="/features/google-maps-rank-tracker" className="text-emerald-300 underline-offset-4 hover:underline">rank tracker</Link> and proof the results with the <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">revenue forecaster</Link>.',
        ],
      },
    ],
  },
  {
    title: 'How top restaurants use MapsRankChecker',
    paragraphs: [
      'Live grid monitoring',
      'Instant competitor movement alerts',
      'Revenue impact per ranking position',
      <>
        Discover which zones lose hungry customers by starting with a <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free Google Maps visibility scan</Link>.
      </>,
    ],
  },
]

export default function RestaurantsUseCase() {
  return (
    <UseCaseLayout
      h1="Google Maps Ranking for Restaurants: Winning the Decision in 3 Seconds"
      canonical={canonical}
      intro="Distance, rating, and quick taps make Maps visibility mission-critical for restaurants."
      sections={sections}
    />
  )
}
