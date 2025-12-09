import type { Metadata } from 'next'
import FeatureLayout from '../_components/FeatureLayout'
import { featureContent } from '../featureContent'

const canonical = 'https://mapsrankchecker.com/features/google-maps-ranking-grid'

export const metadata: Metadata = {
  title: 'Google Maps Ranking Grid: See Every Zone Where Customers Choose Others',
  description:
    'Grid-based visibility lets you spot every weak zone and prioritize the revenue gaps that hurt calls.',
  alternates: { canonical },
  openGraph: {
    title: 'Google Maps Ranking Grid: See Every Zone Where Customers Choose Others',
    description:
      'Grid-based visibility lets you spot every weak zone and prioritize the revenue gaps that hurt calls.',
    url: canonical,
    type: 'article',
  },
}

export default function RankingGridFeature() {
  return (
    <FeatureLayout
      h1="Google Maps Ranking Grid: See Every Zone Where Customers Choose Others"
      intro={featureContent['google-maps-ranking-grid'].intro}
      sections={featureContent['google-maps-ranking-grid'].sections}
      finalCta={featureContent['google-maps-ranking-grid'].finalCta}
      heroKpi={featureContent['google-maps-ranking-grid'].heroKpi}
      miniKpis={featureContent['google-maps-ranking-grid'].miniKpis}
      revenueHook={featureContent['google-maps-ranking-grid'].revenueHook}
      planLock={featureContent['google-maps-ranking-grid'].planLock}
      industryVariants={featureContent['google-maps-ranking-grid'].industryVariants}
      featureName="google-maps-ranking-grid"
    />
  )
}
