export type CaseStudySlug = 'dentist' | 'restaurant' | 'law_firm' | 'medical_clinic' | 'real_estate'

export interface CaseStudy {
  slug: CaseStudySlug
  title: string
  description: string
  context: string
  problem: string
  insight: string
  action: string
  result: string
  quote: string
  revenue: string
  ctaText?: string
  featuresUsed: { name: string; reason: string; href?: string }[]
  plan: { name: string; focus: string; link: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'dentist',
    title: 'SmileWorks Dental — Antalya',
    description: 'Single-location implant & cosmetic clinic locking revenue in exhausted neighborhoods.',
    context: 'SmileWorks Dental – Antalya\nSingle-location, implant & cosmetic focus',
    problem:
      'Rank hovered #6–#7 overall but implant searches slipped below #10, costing ~2 implant cases per month.',
    insight:
      'GeoGrid showed 17 of 49 zones ranking #10+ and Revenue Forecaster modeled that moving #7 → #3 recovers ~$7,200/month.',
    action:
      'Keyword-focused grid, review + photo checklist, and competitor alerts aligned the improvements.',
    result: 'Avg rank improved to #3, +3 implant cases per month and ~$8,400/month recovered revenue.',
    quote: '“SEO’ja değil, kaç hasta kaybettiğimizi görmek bütçeyi açtırdı.”',
    revenue: 'Moving from #7 → #3 adds 2–3 implant cases (~$7,200).',
    ctaText: 'See how much revenue you’re missing',
    featuresUsed: [
      { name: 'Revenue Forecaster', reason: 'Implant cases are high-ticket and modeled for revenue impact' },
      { name: 'Ranking Grid', reason: 'Patients won’t travel beyond 3 km without visibility' },
      { name: 'Rank Tracker', reason: 'Focused on implant / emergency / cosmetic keywords' },
    ],
    plan: {
      name: 'Growth',
      focus: 'Enough depth to predict and recover high-ticket cases without agency cost.',
      link: '/pricing?source=case_dentist&plan=growth',
    },
  },
  {
    slug: 'restaurant',
    title: 'Urban Table Bistro – İstanbul',
    description: 'Lunch & dinner flagship battling fluctuating foot traffic despite “busy” nights.',
    context: 'Urban Table Bistro – İstanbul\nLunch & dinner ağırlıklı, tek lokasyon',
    problem:
      '“Busy” photo op—yet some days tables stayed empty because rank dropped in certain streets.',
    insight:
      'GeoGrid confirmed lunchtime blind spots and 9 weekly reservations lost, pulling the revenue impact into view.',
    action: 'Expanded to 14×14 grid, tracked “open now” keywords, and analyzed hourly zones.',
    result: '+38 reservations/month and ~ $4,600/month extra revenue.',
    quote: '“Maps’te görünmediğin sokak = boş masa.”',
    revenue: '9 missed reservations per week = ~$1,100 in weekly revenue.',
    ctaText: 'See how much revenue you’re missing',
    featuresUsed: [
      { name: 'Ranking Grid', reason: 'Lunch vs dinner zones differ across streets' },
      { name: 'Competitor Movement', reason: 'Trending restaurants jump visibility fast' },
      { name: 'Revenue Forecaster', reason: 'Daily cadence shows opportunity' },
    ],
    plan: {
      name: 'Scale',
      focus: 'Owning multiple zones — Scale shows the whole map, not samples.',
      link: '/pricing?source=case_restaurant&plan=scale',
    },
  },
  {
    slug: 'law_firm',
    title: 'Atlas Injury Law – Miami',
    description: 'Accident-focused firm with ads but lagging Maps visibility.',
    context: 'Atlas Injury Law – Miami',
    problem: 'High-cost ad spend but few cases from Maps; competitor two blocks away surged.',
    insight: 'Accident searches proved hyper-local; competitor alerts uncovered the move before revenue dropped.',
    action: 'Enabled competitor movement, expanded emergency keywords, and surfaced the full forecast.',
    result: '+1–2 extra cases/month (~$12k pipeline), revenue increases matched service costs.',
    quote: '“One case justified the entire tool.”',
    revenue: 'An additional case equals ~$5k in pipeline.',
    ctaText: 'See how much revenue you’re missing',
    featuresUsed: [
      { name: 'Revenue Forecaster', reason: 'Single case equals thousands in revenue' },
      { name: 'Competitor Movement', reason: 'Alerts detect opponent surges' },
      { name: 'Rank Tracker', reason: 'Keyword expansion (accident/injury) broadens visibility' },
    ],
    plan: {
      name: 'Growth → Scale',
      focus: 'Start with Growth; Scale for ultra-local dominance once you defend revenue.',
      link: '/pricing?source=case_law_firm&plan=growth',
    },
  },
  {
    slug: 'medical_clinic',
    title: 'ClinicOne Health – Berlin',
    description: 'High-quality specialists yet sudden drop in insured patient bookings.',
    context: 'ClinicOne Health – Berlin',
    problem: 'Insured patient volume fell despite strong credentials.',
    insight: 'Insurance zones showed invisibility—MapsRankChecker flagged coverage gaps.',
    action: 'Tracked insurance keywords, launched location-based checklist, and tied results to forecasts.',
    result: '+27 insured patients/month, ~$5,300/month recurring revenue.',
    quote: '“Visibility in insured zones made the waiting room full again.”',
    revenue: 'Drawing 27 more insured patients adds ~$5,300 recurring revenue.',
    ctaText: 'See how much revenue you’re missing',
    featuresUsed: [
      { name: 'Ranking Grid', reason: 'Insurance zones require coverage proof' },
      { name: 'Revenue Forecaster', reason: 'Recurring patient value models' },
      { name: 'Action Checklist', reason: 'Operational clarity on next steps' },
    ],
    plan: {
      name: 'Growth',
      focus: 'Depth and cost balance for recurring patient flow.',
      link: '/pricing?source=case_medical_clinic&plan=growth',
    },
  },
  {
    slug: 'real_estate',
    title: 'Coastal Realty – Barcelona',
    description: 'Multi-agent team losing leads across six neighborhoods.',
    context: 'Coastal Realty – Barcelona',
    problem: 'Three rival agencies dominated calls, so buyer leads were unequally split.',
    insight: '21×21 grid revealed six invisible districts whose leads routed to competitors.',
    action: 'Ran multi-location grid, weekly alerts, and competitor growth tracking.',
    result: '+14 buyer calls/month and two extra deals (~$18k potential).',
    quote: '“Buyers call whoever owns the map.”',
    revenue: '14 extra calls translate to ~ $18,000 potential deal value.',
    ctaText: 'See how much revenue you’re missing',
    featuresUsed: [
      { name: 'Multi-location Grid', reason: 'Neighborhood dominance requires 21×21 views' },
      { name: 'Competitor Movement', reason: 'Watch agencies expanding zones' },
      { name: 'Revenue Forecaster', reason: 'Pipeline forecasted against buyer calls' },
    ],
    plan: {
      name: 'Scale',
      focus: 'Scale handles multi-location visibility per block.',
      link: '/pricing?source=case_real_estate&plan=scale',
    },
  },
]

export function getCaseStudy(slug: CaseStudySlug): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}
