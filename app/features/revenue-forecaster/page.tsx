import type { Metadata } from 'next'
import FeatureLayout from '../_components/FeatureLayout'
import { featureContent } from '../featureContent'

const canonical = 'https://mapsrankchecker.com/features/revenue-forecaster'

export const metadata: Metadata = {
  title: 'Revenue Forecaster: See How Google Maps Rankings Turn Into Money',
  description:
    'Revenue Forecaster maps rank → CTR → calls → customers so you know what every position is worth.',
  alternates: { canonical },
  openGraph: {
    title: 'Revenue Forecaster: See How Google Maps Rankings Turn Into Money',
    description:
      'Revenue Forecaster maps rank → CTR → calls → customers so you know what every position is worth.',
    url: canonical,
    type: 'article',
  },
}

export default function RevenueForecasterFeature() {
  return (
    <FeatureLayout
      h1="Revenue Forecaster: See How Google Maps Rankings Turn Into Money"
      intro={featureContent['revenue-forecaster'].intro}
      sections={featureContent['revenue-forecaster'].sections}
      finalCta={featureContent['revenue-forecaster'].finalCta}
      heroKpi={featureContent['revenue-forecaster'].heroKpi}
      miniKpis={featureContent['revenue-forecaster'].miniKpis}
      revenueHook={featureContent['revenue-forecaster'].revenueHook}
      planLock={featureContent['revenue-forecaster'].planLock}
      industryVariants={featureContent['revenue-forecaster'].industryVariants}
      featureName="revenue-forecaster"
    />
  )
}
