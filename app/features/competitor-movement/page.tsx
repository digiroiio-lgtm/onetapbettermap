import type { Metadata } from 'next'
import FeatureLayout from '../_components/FeatureLayout'
import { featureContent } from '../featureContent'

const canonical = 'https://mapsrankchecker.com/features/competitor-movement'

export const metadata: Metadata = {
  title: 'Competitor Movement Tracking: Stop Losing Rankings Without Noticing',
  description:
    'Competitor movement monitoring shows when rival businesses jump visibility so you can protect revenue.',
  alternates: { canonical },
  openGraph: {
    title: 'Competitor Movement Tracking: Stop Losing Rankings Without Noticing',
    description:
      'Competitor movement monitoring shows when rival businesses jump visibility so you can protect revenue.',
    url: canonical,
    type: 'article',
  },
}

export default function CompetitorMovementFeature() {
  return (
    <FeatureLayout
      h1="Competitor Movement Tracking: Stop Losing Rankings Without Noticing"
      intro={featureContent['competitor-movement'].intro}
      sections={featureContent['competitor-movement'].sections}
      finalCta={featureContent['competitor-movement'].finalCta}
      heroKpi={featureContent['competitor-movement'].heroKpi}
      miniKpis={featureContent['competitor-movement'].miniKpis}
      revenueHook={featureContent['competitor-movement'].revenueHook}
      planLock={featureContent['competitor-movement'].planLock}
      industryVariants={featureContent['competitor-movement'].industryVariants}
      featureName="competitor-movement"
    />
  )
}
