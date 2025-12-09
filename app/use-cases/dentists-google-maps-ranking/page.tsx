import Link from 'next/link'
import type { Metadata } from 'next'
import UseCaseLayout from '../_components/UseCaseLayout'

const canonical = 'https://mapsrankchecker.com/use-cases/dentists-google-maps-ranking'

export const metadata: Metadata = {
  title: 'Google Maps Ranking for Dentists and New Patients',
  description:
    'Dental clinics turn Maps visibility into patients by measuring zones, revenue, and competitor movement with MapsRankChecker.',
  alternates: { canonical },
  openGraph: {
    title: 'Google Maps Ranking for Dentists and New Patients',
    description:
      'Dental clinics turn Maps visibility into patients by measuring zones, revenue, and competitor movement with MapsRankChecker.',
    url: canonical,
    type: 'article',
  },
}

const sections = [
  {
    title: 'Why Google Maps decides which dentist gets the call',
    paragraphs: [
      'Patients rarely compare more than a handful of clinics.',
      'They choose one of the top three results closest to them, so every rank drop outside that grid costs consultations.',
    ],
  },
  {
    title: 'The real problem dentists face on Maps',
    paragraphs: [],
    subheadings: [
      {
        title: 'You rank high — but only in some streets',
        paragraphs: [
          'Most clinics show up near the practice but disappear a few blocks away.',
          'That creates false confidence because the actual patient search zone is wider.',
        ],
      },
      {
        title: 'Hidden revenue loss zones',
        paragraphs: [
          'Each weak zone equals patients routing to your competitor.',
          'The revenue lift from fixing those pockets is measurable when you connect rank gains to calls.',
        ],
      },
    ],
  },
  {
    title: 'What actually improves dental Maps ranking',
    paragraphs: [],
    subheadings: [
      {
        title: 'Grid-based visibility tracking',
        paragraphs: [
          'Knowing where you are invisible matters more than average rank.',
          'GeoGrid scans show the exact streets where patients switch to rivals.',
        ],
      },
      {
        title: 'Review velocity and trust signals',
        paragraphs: [
          'Slow, steady review growth outperforms big spikes that fade.',
          'Map platforms treat consistent trust signals as momentum.',
        ],
      },
    ],
  },
  {
    title: 'How dentists should measure success',
    paragraphs: ['Not rankings — new patient calls per zone.'],
  },
  {
    title: 'Why MapsRankChecker fits dental clinics',
    paragraphs: [
      'Zone-based visibility scoring',
      'Competitor movement alerts',
      'Revenue forecasts tied to ranking positions',
      <>
        See patients switch to rivals with our <Link href="/features/google-maps-rank-tracker" className="text-emerald-300 underline-offset-4 hover:underline">Google Maps rank tracker</Link> and close the loop with the{' '}
        <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">Revenue Forecaster</Link>.
      </>,
      <>
        Test it yourself with a <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free Google Maps visibility scan</Link>.
      </>,
    ],
  },
]

export default function DentistsUseCase() {
  return <UseCaseLayout h1="Google Maps Ranking for Dentists: How Visibility Turns Into New Patients" canonical={canonical} intro="" sections={sections} />
}
