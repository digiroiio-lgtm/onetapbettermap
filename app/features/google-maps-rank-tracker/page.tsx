import type { Metadata } from 'next'
import FeatureLayout from '../_components/FeatureLayout'
import { featureContent } from '../featureContent'

const canonical = 'https://mapsrankchecker.com/features/google-maps-rank-tracker'

export const metadata: Metadata = {
  title: 'Google Maps Rank Tracker That Shows Lost Customers',
  description:
    'GeoGrid rank tracking shows where Google Maps visibility gaps cost you calls so you can defend every zone.',
  alternates: { canonical },
  openGraph: {
    title: 'Google Maps Rank Tracker That Shows Lost Customers',
    description:
      'GeoGrid rank tracking shows where Google Maps visibility gaps cost you calls so you can defend every zone.',
    url: canonical,
    type: 'article',
  },
}

export default function RankTrackerFeature() {
  return (
    <FeatureLayout
      h1="Google Maps Rank Tracker That Shows Where You Actually Lose Customers"
      intro={featureContent['google-maps-rank-tracker'].intro}
      sections={featureContent['google-maps-rank-tracker'].sections}
      finalCta={featureContent['google-maps-rank-tracker'].finalCta}
      heroKpi={featureContent['google-maps-rank-tracker'].heroKpi}
      miniKpis={featureContent['google-maps-rank-tracker'].miniKpis}
      revenueHook={featureContent['google-maps-rank-tracker'].revenueHook}
      planLock={featureContent['google-maps-rank-tracker'].planLock}
      industryVariants={featureContent['google-maps-rank-tracker'].industryVariants}
      featureName="google-maps-rank-tracker"
    />
  )
}
