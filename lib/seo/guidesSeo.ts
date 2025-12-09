export type GuideSlug =
  | 'google-maps-ranking'
  | 'google-maps-ranking-factors'
  | 'how-to-rank-higher-on-google-maps'
  | 'google-maps-ranking-algorithm'
  | 'google-maps-ranking-checker-tools'
  | 'google-maps-local-seo-expert'
  | 'google-maps-citations'
  | 'google-maps-grid-visibility'

export type GuideInternalLink = {
  href: string
  anchorText: string
}

export type GuideSeoConfig = {
  slug: GuideSlug
  url: string
  metaTitle: string
  metaDescription: string
  h1: string
  introHeading?: string
  primaryCta: GuideInternalLink
  secondaryCta?: GuideInternalLink
  relatedGuides: GuideInternalLink[]
  relatedFeatures: GuideInternalLink[]
  relatedBlogPosts?: GuideInternalLink[]
  relatedUseCases?: GuideInternalLink[]
}

export const guidesSeoConfig: GuideSeoConfig[] = [
  {
    slug: 'google-maps-ranking',
    url: '/guides/google-maps-ranking',
    metaTitle: 'Google Maps Ranking Explained for Local Discovery',
    metaDescription:
      'Discover how Google Maps ranking works across your service area and why GeoGrid visibility, not single searches, shows your real reach.',
    h1: 'Google Maps Ranking Explained: How Businesses Really Get Discovered',
    introHeading: 'Understand how visibility, rank, and revenue align beyond one screenshot.',
    primaryCta: {
      href: '/free-scan',
      anchorText: 'Run a free Google Maps visibility scan',
    },
    secondaryCta: {
      href: '/pricing',
      anchorText: 'See pricing for Google Maps rank tracking',
    },
    relatedGuides: [
      {
        href: '/guides/google-maps-ranking-factors',
        anchorText: 'See all key Google Maps ranking factors',
      },
      {
        href: '/guides/how-to-rank-higher-on-google-maps',
        anchorText: 'Step-by-step guide to ranking higher on Google Maps',
      },
      {
        href: '/guides/google-maps-grid-visibility',
        anchorText: 'Understand GeoGrid visibility and coverage',
      },
    ],
    relatedFeatures: [
      {
        href: '/features/google-maps-rank-tracker',
        anchorText: 'Google Maps rank tracker',
      },
      {
        href: '/features/google-maps-ranking-grid',
        anchorText: 'GeoGrid visibility heatmap',
      },
      {
        href: '/features/revenue-forecaster',
        anchorText: 'Revenue Forecaster for local rankings',
      },
    ],
    relatedBlogPosts: [
      {
        href: '/blog/how-to-check-google-maps-ranking',
        anchorText: 'How to check your Google Maps ranking the right way',
      },
      {
        href: '/blog/google-maps-ranking-software-comparison',
        anchorText: 'Best Google Maps ranking software compared',
      },
    ],
    relatedUseCases: [
      {
        href: '/use-cases/dentists-google-maps-ranking',
        anchorText: 'Google Maps ranking for dentists',
      },
    ],
  },
  {
    slug: 'google-maps-ranking-factors',
    url: '/guides/google-maps-ranking-factors',
    metaTitle: 'Google Maps Ranking Factors That Drive Visibility',
    metaDescription:
      'Dive into proximity, relevance, and hidden signals plus how to connect them to revenue using MapsRankChecker’s ranking factors checklist.',
    h1: 'Google Maps Ranking Factors: What Actually Impacts Local Visibility',
    introHeading: 'Focus on the signals that actually influence visibility and revenue.',
    primaryCta: {
      href: '/free-scan',
      anchorText: 'Check which ranking factors are blocking your visibility',
    },
    secondaryCta: {
      href: '/features/revenue-forecaster',
      anchorText: 'Translate each ranking factor into revenue impact',
    },
    relatedGuides: [
      {
        href: '/guides/google-maps-ranking',
        anchorText: 'How Google Maps ranking works overall',
      },
      {
        href: '/guides/how-to-rank-higher-on-google-maps',
        anchorText: 'How to rank higher on Google Maps (step-by-step)',
      },
      {
        href: '/guides/google-maps-citations',
        anchorText: 'Citation strategy for Google Maps rankings',
      },
    ],
    relatedFeatures: [
      {
        href: '/features/google-maps-rank-tracker',
        anchorText: 'Track ranking factor impact over time',
      },
      {
        href: '/features/google-maps-ranking-grid',
        anchorText: 'See factor impact on each zone with GeoGrid',
      },
    ],
    relatedBlogPosts: [
      {
        href: '/blog/google-maps-ranking-2025-update',
        anchorText: 'Google Maps ranking changes in 2025',
      },
    ],
  },
  {
    slug: 'how-to-rank-higher-on-google-maps',
    url: '/guides/how-to-rank-higher-on-google-maps',
    metaTitle: 'How to Rank Higher on Google Maps (Without Guessing)',
    metaDescription:
      'A repeatable, data-backed three-step process for ranking higher on Google Maps, with GeoGrid tracking and revenue impact modeling.',
    h1: 'How to Rank Higher on Google Maps (Without Guessing)',
    introHeading: 'Turn vague tactics into a weekly habit that moves visibility and revenue.',
    primaryCta: {
      href: '/free-scan',
      anchorText: 'Start with a free Google Maps visibility scan',
    },
    secondaryCta: {
      href: '/demo',
      anchorText: 'See a live demo of MapsRankChecker in action',
    },
    relatedGuides: [
      {
        href: '/guides/google-maps-ranking',
        anchorText: 'Understand Google Maps ranking first',
      },
      {
        href: '/guides/google-maps-ranking-factors',
        anchorText: 'Check which ranking factors you’re missing',
      },
      {
        href: '/guides/google-maps-ranking-checker-tools',
        anchorText: 'Choose the right Google Maps ranking checker tools',
      },
    ],
    relatedFeatures: [
      {
        href: '/features/google-maps-rank-tracker',
        anchorText: 'Track rank improvements over time',
      },
      {
        href: '/features/revenue-forecaster',
        anchorText: 'See how rank gains convert to revenue',
      },
    ],
    relatedBlogPosts: [
      {
        href: '/blog/how-to-boost-google-maps-ranking',
        anchorText: 'Extra tactics to boost Google Maps ranking',
      },
    ],
    relatedUseCases: [
      {
        href: '/use-cases/restaurants-google-maps-ranking',
        anchorText: 'Ranking higher on Maps for restaurants',
      },
    ],
  },
  {
    slug: 'google-maps-ranking-algorithm',
    url: '/guides/google-maps-ranking-algorithm',
    metaTitle: 'Google Maps Ranking Algorithm: How It Works Simply',
    metaDescription:
      'Break down the Google Maps ranking algorithm in plain English, covering intent, proximity, and behavioral signals that shape visibility.',
    h1: 'Google Maps Ranking Algorithm: How It Works (Simply Explained)',
    introHeading: 'Behind every local result is an algorithm driven by relevance, distance, and prominence.',
    primaryCta: {
      href: '/features/google-maps-rank-tracker',
      anchorText: 'Track how algorithm changes affect your ranking',
    },
    secondaryCta: {
      href: '/free-scan',
      anchorText: 'Run a free scan to see how the algorithm treats your business',
    },
    relatedGuides: [
      {
        href: '/guides/google-maps-ranking-factors',
        anchorText: 'Full list of Google Maps ranking factors',
      },
      {
        href: '/guides/google-maps-ranking',
        anchorText: 'Overview guide to Google Maps ranking',
      },
    ],
    relatedFeatures: [
      {
        href: '/features/google-maps-ranking-grid',
        anchorText: 'Visualize the algorithm with GeoGrid scans',
      },
      {
        href: '/features/revenue-forecaster',
        anchorText: 'Model algorithm changes as revenue impact',
      },
    ],
    relatedBlogPosts: [
      {
        href: '/blog/google-maps-ranking-2025-update',
        anchorText: 'Latest updates to the Google Maps algorithm',
      },
    ],
  },
  {
    slug: 'google-maps-ranking-checker-tools',
    url: '/guides/google-maps-ranking-checker-tools',
    metaTitle: 'Google Maps Ranking Checker Tools: What They Show',
    metaDescription:
      'Compare rank checkers and learn why GeoGrid, competitor tracking, and revenue translation matter for accurate visibility insights.',
    h1: 'Google Maps Ranking Checker Tools: What They Show — And Miss',
    introHeading: 'Grid + revenue beats single-location screenshots.',
    primaryCta: {
      href: '/free-scan',
      anchorText: 'Try MapsRankChecker’s GeoGrid rank checker for free',
    },
    secondaryCta: {
      href: '/pricing',
      anchorText: 'See pricing vs other Google Maps ranking tools',
    },
    relatedGuides: [
      {
        href: '/guides/google-maps-ranking',
        anchorText: 'Understand Google Maps ranking first',
      },
      {
        href: '/guides/google-maps-grid-visibility',
        anchorText: 'Why grid-based visibility is more accurate',
      },
    ],
    relatedFeatures: [
      {
        href: '/features/google-maps-rank-tracker',
        anchorText: 'Google Maps rank tracker feature',
      },
      {
        href: '/features/google-maps-ranking-grid',
        anchorText: 'Grid-based visibility heatmap feature',
      },
    ],
    relatedBlogPosts: [
      {
        href: '/blog/google-maps-ranking-software-comparison',
        anchorText: 'Google Maps ranking software comparison',
      },
      {
        href: '/blog/google-maps-ranking-service-vs-software',
        anchorText: 'Service vs software for Google Maps ranking',
      },
    ],
  },
  {
    slug: 'google-maps-local-seo-expert',
    url: '/guides/google-maps-local-seo-expert',
    metaTitle: 'Google Maps Local SEO Expert: When to Bring One In',
    metaDescription:
      'Understand when to pair tools with expert help, covering GeoGrid, revenue forecasts, and agency-grade workflows.',
    h1: 'Google Maps Local SEO Expert: When Do You Actually Need One?',
    introHeading: 'Turn MapsRankChecker into your local SEO “command center” for clients.',
    primaryCta: {
      href: '/demo',
      anchorText: 'Book a demo for your agency',
    },
    secondaryCta: {
      href: '/pricing',
      anchorText: 'See Growth & Scale plans for agencies',
    },
    relatedGuides: [
      {
        href: '/guides/google-maps-ranking',
        anchorText: 'Core Google Maps ranking guide',
      },
      {
        href: '/guides/google-maps-ranking-checker-tools',
        anchorText: 'Best rank checker tools for agencies',
      },
      {
        href: '/guides/google-maps-grid-visibility',
        anchorText: 'Using GeoGrid visibility for client reporting',
      },
    ],
    relatedFeatures: [
      {
        href: '/features/google-maps-ranking-grid',
        anchorText: 'Multi-location GeoGrid for agencies',
      },
      {
        href: '/features/revenue-forecaster',
        anchorText: 'Revenue Forecaster for client value reports',
      },
      {
        href: '/whitelabel',
        anchorText: 'White-label reporting options',
      },
    ],
    relatedBlogPosts: [
      {
        href: '/blog/google-maps-ranking-service-vs-software',
        anchorText: 'Service vs software: how experts should package Maps',
      },
    ],
    relatedUseCases: [
      {
        href: '/use-cases/clinics-google-maps-ranking',
        anchorText: 'Running Google Maps for medical clinics',
      },
    ],
  },
  {
    slug: 'google-maps-citations',
    url: '/guides/google-maps-citations',
    metaTitle: 'Google Maps Citations: What They Matter (And Don’t)',
    metaDescription:
      'Learn why accurate, consistent citations move the needle and which myths to ignore for sustained local ranking growth.',
    h1: 'Google Maps Citations: What They Matter (And What They Don’t)',
    introHeading: 'Citations matter when they are accurate, consistent, and quality-driven.',
    primaryCta: {
      href: '/free-scan',
      anchorText: 'Check if citation issues are hurting your visibility',
    },
    secondaryCta: {
      href: '/features/google-maps-rank-tracker',
      anchorText: 'Track rank changes as you fix citations',
    },
    relatedGuides: [
      {
        href: '/guides/google-maps-ranking-factors',
        anchorText: 'See where citations fit among other ranking factors',
      },
      {
        href: '/guides/how-to-rank-higher-on-google-maps',
        anchorText: 'Use citations in a broader ranking strategy',
      },
    ],
    relatedFeatures: [
      {
        href: '/features/revenue-forecaster',
        anchorText: 'Model revenue impact of citation cleanups',
      },
    ],
    relatedBlogPosts: [
      {
        href: '/blog/how-to-boost-google-maps-ranking',
        anchorText: 'Use citations as part of your ranking boost plan',
      },
    ],
  },
  {
    slug: 'google-maps-grid-visibility',
    url: '/guides/google-maps-grid-visibility',
    metaTitle: 'Google Maps Grid Visibility: The Metric That Changes Everything',
    metaDescription:
      'Explore why GeoGrid visibility provides the clarity missing from average rank reports and how to act on revenue gaps.',
    h1: 'Google Maps Grid Visibility: The Metric That Changes Everything',
    introHeading: 'Single-location screenshots lie — grid visibility shows where you win or lose.',
    primaryCta: {
      href: '/free-scan',
      anchorText: 'Run your first GeoGrid visibility scan free',
    },
    secondaryCta: {
      href: '/features/google-maps-ranking-grid',
      anchorText: 'See the GeoGrid visibility feature details',
    },
    relatedGuides: [
      {
        href: '/guides/google-maps-ranking',
        anchorText: 'How ranking works across a service area',
      },
      {
        href: '/guides/google-maps-ranking-checker-tools',
        anchorText: 'Why GeoGrid-based tools are more accurate',
      },
    ],
    relatedFeatures: [
      {
        href: '/features/google-maps-rank-tracker',
        anchorText: 'Combine GeoGrid with keyword rank tracking',
      },
      {
        href: '/features/revenue-forecaster',
        anchorText: 'Tie each grid cell to revenue potential',
      },
    ],
    relatedBlogPosts: [
      {
        href: '/blog/google-maps-ranking-report-template',
        anchorText: 'Use GeoGrid in your ranking report templates',
      },
    ],
    relatedUseCases: [
      {
        href: '/use-cases/real-estate-google-maps-ranking',
        anchorText: 'Using grid visibility for real estate teams',
      },
    ],
  },
]

export function getGuideSeoConfig(slug: GuideSlug): GuideSeoConfig | undefined {
  return guidesSeoConfig.find((g) => g.slug === slug)
}
