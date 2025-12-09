import Link from 'next/link'
import type { Metadata } from 'next'
import UseCaseLayout from '../_components/UseCaseLayout'

const canonical = 'https://mapsrankchecker.com/use-cases/clinics-google-maps-ranking'

export const metadata: Metadata = {
  title: 'Medical Clinics and Google Maps Visibility Playbook',
  description:
    'Clinics turn visibility into trust and appointments by tracking zone coverage, competitor timelines, and revenue forecasts every week.',
  alternates: { canonical },
  openGraph: {
    title: 'Medical Clinics and Google Maps Visibility Playbook',
    description:
      'Clinics turn visibility into trust and appointments by tracking zone coverage, competitor timelines, and revenue forecasts every week.',
    url: canonical,
    type: 'article',
  },
}

const sections = [
  {
    title: 'Why Maps is critical for clinics',
    paragraphs: [
      'Patients search locally, urgently, and emotionally.',
      'Maps acts as the first trust filter before they call.',
    ],
  },
  {
    title: 'Common clinic ranking blind spots',
    paragraphs: [],
    subheadings: [
      {
        title: 'Over-focusing on the clinic address',
        paragraphs: [
          'Patients search from home and work—often miles away.',
          'You need coverage that reflects their true geography.',
        ],
      },
      {
        title: 'Unnoticed reputation gaps',
        paragraphs: [
          'Small rating drops can dramatically change visibility.',
          'Track every minor change instead of waiting for big swings.',
        ],
      },
    ],
  },
  {
    title: 'What clinics should track weekly',
    paragraphs: [],
    subheadings: [
      {
        title: 'Zone coverage score',
        paragraphs: [
          'A single view shows where visibility collapses.',
          'Map this to revenue by modeling rank gains as calls.',
        ],
      },
      {
        title: 'Competitor timeline',
        paragraphs: [
          'See exactly when and where others overtake you.',
          'Push that insight into your alert workflow.',
        ],
      },
    ],
  },
  {
    title: 'Why clinics choose MapsRankChecker',
    paragraphs: [
      'Medical-specific CTR assumptions',
      'Zone-level revenue forecasting',
      'Alert-based monitoring (not manual checks)',
      <>
        Learn how many appointments Maps invisibility costs you with a <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free scan</Link>.
      </>,
    ],
  },
]

export default function ClinicsUseCase() {
  return (
    <UseCaseLayout
      h1="Google Maps Ranking for Medical Clinics: Visibility = Trust = Appointments"
      canonical={canonical}
      intro="Clinics convert trust into bookings by showing up where patients search."
      sections={sections}
    />
  )
}
