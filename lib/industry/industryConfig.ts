export type IndustryKey = 'dental' | 'restaurants' | 'law' | 'multiLocation' | 'agencies'
export type PlanKey = 'starter' | 'growth' | 'scale' | 'enterprise'

export interface IndustryHeroCopy {
  eyebrow: string
  headline: string
  subheadline: string
}

export interface IndustryKpi {
  label: string
  value: string
  helper?: string
}

export interface IndustryCopyBlock {
  id: string
  title: string
  body: string
  bullets?: string[]
}

export interface IndustryConfig {
  key: IndustryKey
  label: string
  shortLabel: string
  navOrder: number
  hero: IndustryHeroCopy
  primaryPainPoints: string[]
  primaryOutcomes: string[]
  kpis: IndustryKpi[]
  copyBlocks: IndustryCopyBlock[]
  recommendedPlan: PlanKey
  pricingBadge: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  featurePriority: string[]
  trackingKey: string
  segmentTag?: string
}

export const INDUSTRY_CONFIG: Record<IndustryKey, IndustryConfig> = {
  dental: {
    key: 'dental',
    label: 'Dental Clinics',
    shortLabel: 'Dental',
    navOrder: 1,
    hero: {
      eyebrow: 'For dental clinics & implant centers',
      headline: 'Fill your chairs with patients who expect you to show up on Maps.',
      subheadline:
        'See exactly how you rank for “dentist near me”, fix the weak zones, and turn nearby searches into booked treatment plans.',
    },
    primaryPainPoints: [
      'You rank well by your front door but disappear just a few streets away.',
      'Booking platforms take high commissions while Maps visibility slips.',
      'You don’t know which keywords or neighborhoods actually drive implant or cosmetic cases.',
    ],
    primaryOutcomes: [
      'Own “implant dentist” and “emergency dentist” queries in your city.',
      'Shift patient flow from listing sites to direct bookings.',
      'Target reviews, photos, and content to the cells that matter most.',
    ],
    kpis: [
      { label: 'Maps Visibility Lift', value: '+18–32 pts', helper: 'After 60–90 days of focused work.' },
      { label: 'New Patient Growth', value: '+15–25%', helper: 'Clinics that act weekly on the playbook.' },
    ],
    copyBlocks: [
      {
        id: 'use-case',
        title: 'Turn “near me” searches into treatment chairs.',
        body:
          'MapsRankChecker scans 49 points around your clinic and highlights where you rank for implant, braces, emergency, and cosmetic keywords.',
        bullets: [
          'See green/yellow/red zones on a live heatmap.',
          'Spot competitors winning the discovery slots.',
          'Focus reviews and photos on revenue-driving cells.',
        ],
      },
      {
        id: 'workflow',
        title: 'Weekly actions your clinical team can follow.',
        body:
          'Each scan becomes a 3–5 step list: review, photos, review replies, and citation updates for the highest-risk zones.',
        bullets: [
          'Run a scan for implant + emergency keywords.',
          'Identify “red” cells outside the immediate office.',
          'Deploy micro-campaigns to the exact blocks that lost visibility.',
          'Re-scan and watch visibility shift toward the top.',
        ],
      },
    ],
    recommendedPlan: 'growth',
    pricingBadge: 'Best for growth-minded dental clinics',
    primaryCta: { text: 'Start Free Dental Scan', href: '/free-scan?industry=dental' },
    secondaryCta: { text: 'See Growth plan →', href: '/pricing?highlight=growth' },
    featurePriority: ['revenue-forecaster', 'google-maps-rank-tracker', 'google-maps-ranking-grid'],
    trackingKey: 'dental_clinics',
    segmentTag: 'segment_dental',
  },
  restaurants: {
    key: 'restaurants',
    label: 'Restaurants & Cafés',
    shortLabel: 'Restaurants',
    navOrder: 2,
    hero: {
      eyebrow: 'For restaurants, cafés & fast-casual',
      headline: 'Turn “restaurants near me” into tonight’s reservations.',
      subheadline:
        'See if you appear when diners search, fix the neighborhoods where they disappear, and outrank delivery-only brands.',
    },
    primaryPainPoints: [
      'You have reviews but still can’t crack the top 3 on Maps.',
      'Delivery apps own your margins and customer relationships.',
      'You don’t know which neighborhoods actually see your listing.',
    ],
    primaryOutcomes: [
      'Increase walk-ins and direct reservations from Google Maps.',
      'Spot the zones where a focused review push moves the needle.',
      'Reduce reliance on high-fee delivery partners.',
    ],
    kpis: [
      { label: 'Discovery Searches Lift', value: '+20–40%', helper: 'When visibility boosts on dinner keywords.' },
      { label: 'Direct Reservations', value: '+10–25%', helper: 'Restaurants that act weekly on the playbook.' },
    ],
    copyBlocks: [
      {
        id: 'use-case',
        title: 'Make sure hungry customers can find you.',
        body:
          'MapsRankChecker reveals where you rank block by block for “restaurant near me”, “best burgers”, “open now”, and more.',
        bullets: [
          'Locate the blocks where your listing disappears.',
          'Compare your visibility to nearby competitors.',
          'Push reviews and photos where they deliver bookings.',
        ],
      },
      {
        id: 'workflow',
        title: '15-minute weekly visibility check.',
        body: 'Generate a map and action list before your weekend rush.',
        bullets: [
          'Run a scan for high-intent dinner + lunch keywords.',
          'Pick 2–3 “red” cells to fix.',
          'Collect reviews from diners in those zones.',
        ],
      },
    ],
    recommendedPlan: 'starter',
    pricingBadge: 'Perfect for single-location restaurants',
    primaryCta: { text: 'See hungry zones now', href: '/free-scan?industry=restaurants' },
    secondaryCta: { text: 'Compare plans →', href: '/pricing' },
    featurePriority: ['google-maps-ranking-grid', 'revenue-forecaster', 'competitor-movement'],
    trackingKey: 'restaurants',
    segmentTag: 'segment_restaurants',
  },
  law: {
    key: 'law',
    label: 'Law Firms',
    shortLabel: 'Law Firms',
    navOrder: 3,
    hero: {
      eyebrow: 'For law firms & solo attorneys',
      headline: 'Own the map for high-intent legal searches.',
      subheadline:
        'Track how you rank for “divorce lawyer”, “injury attorney”, or niche terms across your city and stay ahead of competitors.',
    },
    primaryPainPoints: [
      'You invest in SEO yet can’t see how it impacts Maps.',
      'Competitors suddenly outrank you in specific neighborhoods.',
      'You don’t know which keywords are worth optimizing on Maps.',
    ],
    primaryOutcomes: [
      'See your real Maps presence for each money keyword.',
      'Protect your top rankings before rivals jump in.',
      'Prioritize spend based on true map gaps.',
    ],
    kpis: [
      { label: 'High-Intent Calls', value: '+10–30%', helper: 'When you improve visibility for core keywords.' },
      { label: 'Cost per Client', value: '-15–25%', helper: 'By shifting from broad ads to map dominance.' },
    ],
    copyBlocks: [
      {
        id: 'use-case',
        title: 'Map what matters: high-value legal searches.',
        body:
          'Stop guessing. See block-by-block how your firm ranks for practice areas that drive revenue.',
        bullets: [
          'Track grids for each practice area keyword.',
          'Detect new competitors before they dominate.',
          'Share proof-ready maps with your marketing team.',
        ],
      },
    ],
    recommendedPlan: 'growth',
    pricingBadge: 'Ideal for competitive legal markets',
    primaryCta: { text: 'Track legal visibility', href: '/free-scan?industry=law' },
    secondaryCta: { text: 'See Growth plan →', href: '/pricing?highlight=growth' },
    featurePriority: ['revenue-forecaster', 'competitor-movement', 'google-maps-rank-tracker'],
    trackingKey: 'law_firms',
    segmentTag: 'segment_law',
  },
  multiLocation: {
    key: 'multiLocation',
    label: 'Multi-Location Brands',
    shortLabel: 'Multi-Location',
    navOrder: 4,
    hero: {
      eyebrow: 'For multi-location chains & franchises',
      headline: 'See which locations win on Maps — and which leak revenue.',
      subheadline:
        'Monitor visibility across dozens of locations, catch underperforming branches, and run proven playbooks that move revenue per store.',
    },
    primaryPainPoints: [
      'You have no single view of Maps performance across locations.',
      'Some branches dominate while others are invisible in the same city.',
      'Local teams act without a consistent plan.',
    ],
    primaryOutcomes: [
      'Score and benchmark every location on Maps visibility.',
      'Roll out playbooks from top performers to weak stores.',
      'Track brand-wide lifts after campaigns.',
    ],
    kpis: [
      { label: 'Locations Tracked', value: '10–200+', helper: 'Scale without extra overhead.' },
      { label: 'Revenue Uplift per Location', value: '+3–8%', helper: 'Once underperformers catch up.' },
    ],
    copyBlocks: [
      {
        id: 'use-case',
        title: 'One dashboard for every location.',
        body:
          'Stop managing Maps performance in spreadsheets. Get a grid-based score per store and per keyword.',
        bullets: [
          'Compare cities on a single screen.',
          'Tag locations by region, manager, or brand.',
          'Export reports for leadership and franchisees.',
        ],
      },
    ],
    recommendedPlan: 'scale',
    pricingBadge: 'Built for chains & franchises',
    primaryCta: { text: 'Score all locations', href: '/free-scan?industry=multiLocation' },
    secondaryCta: { text: 'See Scale plan →', href: '/pricing?highlight=scale' },
    featurePriority: ['google-maps-rank-tracker', 'google-maps-ranking-grid', 'revenue-forecaster'],
    trackingKey: 'multi_location_brands',
    segmentTag: 'segment_multilocation',
  },
  agencies: {
    key: 'agencies',
    label: 'Agencies (Local SEO & marketing)',
    shortLabel: 'Agencies',
    navOrder: 5,
    hero: {
      eyebrow: 'For local SEO & marketing agencies',
      headline: 'Turn Maps visibility into a repeatable product.',
      subheadline:
        'Ship heatmaps, KPIs, and action plans in minutes and justify retainers with clear before/after proof.',
    },
    primaryPainPoints: [
      'Clients don’t understand rankings and question whether SEO is working.',
      'You spend hours preparing screenshots and reports.',
      'It is hard to standardize local SEO into a scalable offer.',
    ],
    primaryOutcomes: [
      'Productize Maps visibility as a measurable monthly service.',
      'Show heatmap wins to clients every sprint.',
      'Build replicable reporting across niches.',
    ],
    kpis: [
      { label: 'Time Saved per Report', value: '2–4 hours', helper: 'Per client, per month.' },
      { label: 'Upsell Lift', value: '+15–30%', helper: 'When Maps reporting becomes a line item.' },
    ],
    copyBlocks: [
      {
        id: 'use-case',
        title: 'Productize local SEO.',
        body:
          'Package Maps scans, heatmaps, and action lists as a recurring offer your clients understand.',
        bullets: [
          'Run baseline scans during discovery.',
          'Include monthly zip-level heatmaps in retainers.',
          'Use wins in one niche to land similar clients faster.',
        ],
      },
    ],
    recommendedPlan: 'scale',
    pricingBadge: 'Best for agencies & consultants',
    primaryCta: { text: 'Productize Maps visibility', href: '/free-scan?industry=agencies' },
    secondaryCta: { text: 'See Scale plan →', href: '/pricing?highlight=scale' },
    featurePriority: ['revenue-forecaster', 'competitor-movement', 'google-maps-ranking-grid'],
    trackingKey: 'agencies_local_seo',
    segmentTag: 'segment_agencies',
  },
}

export const INDUSTRY_LIST = Object.values(INDUSTRY_CONFIG).sort((a, b) => a.navOrder - b.navOrder)

export const isIndustryKey = (value: string): value is IndustryKey => value in INDUSTRY_CONFIG
