import Link from 'next/link'
import React from 'react'

import { IndustryVariant } from './types'

type Section = {
  title: string
  paragraphs: React.ReactNode[]
  subheadings?: { title: string; paragraphs: React.ReactNode[] }[]
  inlineCta?: { text: string; href: string }
}

type MiniKpi = {
  label: string
  value: string
  detail: string
}

export type FeatureContent = {
  intro?: string
  sections: Section[]
  finalCta: { text: string; href: string }
  heroKpi: string
  miniKpis: MiniKpi[]
  revenueHook: string
  planLock: {
    currentPlan: string
    unlockPlan: string
    bullets: string[]
  }
  industryVariants?: IndustryVariant[]
}

export const featureContent: Record<string, FeatureContent> = {
  'google-maps-rank-tracker': {
    intro:
      'The rank tracker pinpoints where visibility collapses so you can stop losing customers.',
    sections: [
      {
        title: 'Why traditional rank trackers mislead local businesses',
        paragraphs: [
          'They report a single position per keyword and ignore the actual zones that drive calls.',
          'When a competitor outranks you in a high-intent neighborhood, you lose revenue even if your average rank looks solid.',
        ],
      },
      {
        title: 'What makes Google Maps ranking location-dependent',
        paragraphs: [],
        subheadings: [
          {
            title: 'Why your ranking changes every few blocks',
            paragraphs: [
              'Differences in proximity, relevance, and behavior create micro-shifts.',
              'The rank tracker tracks those swings with neighborhood-level granularity.',
            ],
          },
          {
            title: 'Why average rank hides real performance',
            paragraphs: [
              'A #5 average can mask #1 in one block and #20 in another.',
              'True understanding requires a grid-driven approach.',
            ],
          },
        ],
      },
      {
        title: 'How our Google Maps rank tracker works',
        paragraphs: [],
        subheadings: [
          {
            title: '49-point GeoGrid tracking',
            paragraphs: ['Every cell reports a rank, giving you a full coverage heatmap.'],
          },
          {
            title: 'Weekly ranking timeline',
            paragraphs: ['Track progress over time and spot slipping confidence before it hits revenue.'],
          },
          {
            title: 'Competitor position comparison',
            paragraphs: ['Detect when rivals gain traction so you can respond fast.'],
          },
        ],
      },
      {
        title: 'What rankings really mean for calls & customers',
        paragraphs: [
          <>
            Translate rank performance into customer value with the <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">Revenue Forecaster</Link>.
          </>,
          <>
            See what guides like <Link href="/guides/google-maps-ranking" className="text-emerald-300 underline-offset-4 hover:underline">Google Maps Ranking Explained</Link> teach about coverage.
          </>,
        ],
        inlineCta: { text: 'Check your real Google Maps ranking', href: '/free-scan' },
      },
      {
        title: 'Plan boundary: keyword caps',
        paragraphs: [
          'You’re tracking 5 keywords. Most profitable accounts monitor 12–20 keywords per location.',
          '🔓 Unlimited keyword tracking available on Growth.',
        ],
      },
    ],
    finalCta: { text: 'Track your real Google Maps rank', href: '/free-scan' },
    heroKpi: '📈 Avg. +2.8 ranking improvement within 30 days',
    miniKpis: [
      { label: 'Coverage gap detected', value: '18%', detail: 'Zones missing visibility' },
      { label: 'Keywords tracked', value: '12', detail: 'High-intent phrases under watch' },
      { label: 'Extra calls unlocked', value: '~22/month', detail: 'Revenue from the gap' },
    ],
    revenueHook:
      'Moving from rank #10 → #5 typically unlocks $1,200–$2,000/month in inbound demand.',
    planLock: {
      currentPlan: 'Starter',
      unlockPlan: 'Growth',
      bullets: [
        'Unlimited keyword tracking',
        'Advanced behaviour analytics',
        'More revenue gap coverage',
      ],
    },
    industryVariants: [
      {
        slug: 'dentist',
        label: 'Dentists',
        kpiHint: 'Tracking keywords like implant, emergency, and cosmetic keeps high-ticket patients visible.',
        revenueCopy: 'Capturing one implant-related keyword can recover $1k+ in revenue per month.',
        example: 'Ranking #5 for “implant surgeon near me” unlocks 2–3 cases monthly.',
      },
      {
        slug: 'restaurant',
        label: 'Restaurants',
        kpiHint: 'Differentiating lunch, dinner, and cuisine keywords keeps diners from slipping away.',
        revenueCopy: 'The top hospitality accounts monitor 12–20 keywords to keep tables full.',
        example: 'Winning “open now bistro” after-hours nudges more reservations your way.',
      },
      {
        slug: 'medical_clinic',
        label: 'Medical Clinics',
        kpiHint: 'Specialty + insurance keyword coverage keeps referral patients in your funnel.',
        revenueCopy: 'Each insurance-backed keyword translates to recurring visits worth thousands per month.',
        example: 'Ranking for “insurance urgent care” helped ClinicOne add 27 insured patients monthly.',
      },
      {
        slug: 'law_firm',
        label: 'Law Firms',
        kpiHint: 'Accident, injury, and lawyer terms surface the highest-value callers.',
        revenueCopy: 'One missed “accident attorney” call can be $5k+ in lost pipeline.',
        example: 'Ranking #3 for “accident lawyer near me” adds 1–2 cases every month.',
      },
      {
        slug: 'real_estate',
        label: 'Real Estate',
        kpiHint: 'District + agent keywords reveal which neighborhoods bring buyers.',
        revenueCopy: 'Owning 12–20 location-specific keywords keeps your pipeline full.',
        example: 'Owning “real estate agent [district]” can unlock two extra deals.',
      },
    ],
  },
  'google-maps-ranking-grid': {
    intro: 'Ranking grids show exactly where hungry customers see you and where you drop off.',
    sections: [
      {
        title: 'What is a Google Maps ranking grid?',
        paragraphs: [
          'A grid spans your service area with dozens of search positions.',
          'Each cell reveals where visibility wins or leaks.',
        ],
      },
      {
        title: 'Why grid-based ranking beats single-point checks',
        paragraphs: [
          'Single searches blame your devices. Grids reflect real customer locations.',
          'Coverage beats perfection; you need both.',
        ],
      },
      {
        title: 'How 49-point grids expose visibility gaps',
        paragraphs: [],
        subheadings: [
          {
            title: 'Strong zones vs weak zones',
            paragraphs: ['Keep strong zones green, repair weak ones, and watch revenue recover.'],
          },
          {
            title: 'Revenue-dense zones vs invisible zones',
            paragraphs: ['Missing visibility in money-making neighborhoods costs more than a single rank point.'],
          },
        ],
      },
      {
        title: 'Using ranking grids to prioritize actions',
        paragraphs: [
          <>
            Read <Link href="/guides/google-maps-grid-visibility" className="text-emerald-300 underline-offset-4 hover:underline">why grid visibility matters</Link> to tie actions to dollars.
          </>,
          <>
            Pair grids with the <Link href="/guides/google-maps-ranking-checker-tools" className="text-emerald-300 underline-offset-4 hover:underline">ranking checker guide</Link> for tool selection.
          </>,
        ],
      },
      {
        title: 'Plan boundary: grid depth',
        paragraphs: [
          'Visibility changes every few streets. Starter shows basic rows while Growth gives more detail, and Scale unlocks the entire 21×21 coverage.',
          '🔓 See full zone-level revenue opportunities with Scale.',
        ],
      },
    ],
    finalCta: { text: 'View your ranking grid map', href: '/free-scan' },
    heroKpi: '🔍 See ranking differences every 300 meters',
    miniKpis: [
      { label: 'Zones visible', value: '31 / 49', detail: 'Cells showing your brand' },
      { label: 'Blind spots', value: '18', detail: 'Areas where you disappear' },
      { label: 'Hidden revenue', value: '≈ $2,900/month', detail: 'Potential calls lost' },
    ],
    revenueHook: 'Most businesses lose calls simply because they don’t see where customers find competitors first.',
    planLock: {
      currentPlan: 'Starter',
      unlockPlan: 'Scale',
      bullets: ['Advanced grid depth', 'Revenue-ready coverage', 'Priority zone alerts'],
    },
    industryVariants: [
      {
        slug: 'dentist',
        label: 'Dentists',
        kpiHint: 'Patients travel just a few blocks—grid coverage shows where you fade out.',
        revenueCopy: 'Losing visibility in those zones costs implant cases worth ~$7k per month.',
        example: '17/49 zones at #10+ meant losing two implant cases to nearby practices.',
      },
      {
        slug: 'restaurant',
        label: 'Restaurants',
        kpiHint: 'Lunch vs dinner zones shift hourly; grids reveal both.',
        revenueCopy: 'Coverage gaps hide +38 reservations/month (~$4,600) in busy districts.',
        example: 'The grid spotted missing midday visibility in a key lunch street.',
      },
      {
        slug: 'medical_clinic',
        label: 'Medical Clinics',
        kpiHint: 'Insurance coverage zones drop when you lose grid depth.',
        revenueCopy: 'Missing high-coverage cells costs recurring visits worth thousands.',
        example: 'ClinicOne saw certain insurance-heavy cells vanish without the grid.',
      },
      {
        slug: 'law_firm',
        label: 'Law Firms',
        kpiHint: 'Hyper-local grids keep you aware when rivals target a block.',
        revenueCopy: 'A single blind spot can shift a $12k pipeline case to another firm.',
        example: 'Two zones flipped to competitors right before drop-off calls arrived.',
      },
      {
        slug: 'real_estate',
        label: 'Real Estate',
        kpiHint: 'Neighborhood dominance is visible only with a full grid.',
        revenueCopy: 'Six invisible zones mean buyer calls flowing to other agencies (~$18k in lost deals).',
        example: 'Grid coverage highlighted three neighborhoods where visibility disappeared.',
      },
    ],
  },
  'revenue-forecaster': {
    intro: 'Tie every rank change to the revenue it delivers.',
    sections: [
      {
        title: 'Why rankings without revenue context are meaningless',
        paragraphs: [
          'A rank jump is only valuable if it also boosts calls and customers.',
          'Revenue Forecaster keeps that chain transparent.',
        ],
      },
      {
        title: 'How Revenue Forecaster works',
        paragraphs: [],
        subheadings: [
          {
            title: 'Rank → CTR → Calls → Customers → Revenue',
            paragraphs: [
              'We model click-through rate by rank, convert clicks to calls, and then compute customers.',
              'This reveals the dollars behind every position.',
            ],
          },
          {
            title: 'Industry-based benchmarks',
            paragraphs: [
              'Each industry has a different conversion profile.',
              'We bake those assumptions into forecasts so you can compare apples-to-apples.',
            ],
          },
        ],
      },
      {
        title: 'What each ranking position is worth',
        paragraphs: [
          'Targeting rank #3 instead of #12 translates into measurable revenue.',
          'Show stakeholders the math so investment decisions stay grounded.',
        ],
      },
      {
        title: 'Forecast scenarios: #12 → #3 → #1',
        paragraphs: [
          'We model multiple scenarios so you can plan action sequences.',
          'Use the revenue gap to justify growth spend in the pricing conversation.',
        ],
      },
      {
        title: 'How businesses use forecasts to justify growth spend',
        paragraphs: [
          <>
            Link forecasts to <Link href="/pricing" className="text-emerald-300 underline-offset-4 hover:underline">pricing</Link> conversations and say “This move will add X calls.”'
          </>,
          <>
            Send readers to <Link href="/guides/google-maps-ranking-factors" className="text-emerald-300 underline-offset-4 hover:underline">the ranking factors guide</Link> to understand the inputs.
          </>,
        ],
        inlineCta: { text: 'See your revenue forecast', href: '/free-scan' },
      },
      {
        title: 'Plan boundary: forecast coverage',
        paragraphs: [
          'This is a partial forecast based on limited data.',
          'Full rank → revenue modeling unlocks on Growth & Scale.',
        ],
      },
    ],
    finalCta: { text: 'See your revenue forecast', href: '/free-scan' },
    heroKpi: '💸 You’re leaving $3,360/month on the table',
    miniKpis: [
      { label: 'Current rank', value: '#12', detail: 'Baseline visibility' },
      { label: 'Target rank', value: '#3', detail: 'Goal set for revenue' },
      { label: 'Calls gained', value: '+55/month', detail: 'Revenue impact modeled' },
    ],
    revenueHook: 'Every rank position has a dollar value. We show it before you invest time or money.',
    planLock: {
      currentPlan: 'Starter',
      unlockPlan: 'Growth',
      bullets: ['Full forecast scenarios', 'Rank → revenue modeling', 'Zone-level pricing'],
    },
    industryVariants: [
      {
        slug: 'dentist',
        label: 'Dentists',
        kpiHint: 'Moving from #7 → #3 adds 2–3 implant cases per month.',
        revenueCopy: 'That shift recovers ~$6k–$9k in monthly revenue.',
        example: 'Forecasting high-ticket implant terms makes every rank move measurable.',
      },
      {
        slug: 'restaurant',
        label: 'Restaurants',
        kpiHint: 'You’re missing nine reservations each week in key zones.',
        revenueCopy: 'That’s roughly $1,100 of revenue slipping through by rank gaps.',
        example: 'See which targets (like “open now bistro”) move the needle this weekend.',
      },
      {
        slug: 'law_firm',
        label: 'Law Firms',
        kpiHint: 'One missed accident case equals $5k+ in lost fees.',
        revenueCopy: 'Forecasts show exactly how much each rank drop costs your pipeline.',
        example: 'Modeling “accident lawyer near me” reveals ~$12k in recoverable pipeline.',
      },
      {
        slug: 'medical_clinic',
        label: 'Medical Clinics',
        kpiHint: 'Lower map rank means fewer insured patients each month.',
        revenueCopy: '+27 insured patients = $5,300 in recurring revenue reclaimed.',
        example: 'Forecast insurance zones to prioritize the highest-value coverage.',
      },
      {
        slug: 'real_estate',
        label: 'Real Estate',
        kpiHint: 'Losing visibility in six neighborhoods hands buyers to agencies.',
        revenueCopy: 'That’s roughly $18k in abandoned deals you can recover.',
        example: 'Rank improvements in high-value districts show pipeline lift instantly.',
      },
    ],
  },
  'competitor-movement': {
    intro: 'Competitor movement uncovers silent revenue leaks before your own rank shifts.',
    sections: [
      {
        title: 'Why competitor movement matters more than your own rank',
        paragraphs: [
          'You can do everything right and still lose visibility if a rival surges.',
          'Tracking their velocity tells you when to defend.',
        ],
      },
      {
        title: 'How MapsRankChecker detects competitor shifts',
        paragraphs: [],
        subheadings: [
          {
            title: 'Zone-based competitor gains',
            paragraphs: ['See when rivals win important zones and how quickly they climb.'],
          },
          {
            title: 'Velocity and trend detection',
            paragraphs: ['We surface acceleration so you act before the revenue bleed widens.'],
          },
        ],
      },
      {
        title: 'Turning competitor alerts into defensive actions',
        paragraphs: [
          'Alerts prompt you to refresh content, respond to reviews, or launch campaigns.',
          'Internal linking to the grid and guides makes your workflow measurable.',
        ],
      },
      {
        title: 'Preventing silent revenue leaks',
        paragraphs: [
          'Rivals climbing unnoticed means you lose calls without seeing the drop.',
          'Alerting your team keeps you in the loop and ready to act.',
        ],
        inlineCta: { text: 'Monitor competitor movement now', href: '/free-scan' },
      },
      {
        title: 'Plan boundary: alert cadence',
        paragraphs: [
          'Starter shows a current snapshot; Growth adds weekly alerts while Scale gives real-time updates with history.',
          '🔔 Automated competitor alerts unlock on Growth.',
        ],
      },
    ],
    finalCta: { text: 'Monitor competitor movement now', href: '/free-scan' },
    heroKpi: '🚨 Detect competitor jumps before revenue drops',
    miniKpis: [
      { label: 'Competitor rank changes/week', value: '7', detail: 'Movements tracked' },
      { label: 'Avg reaction lag', value: '3 days', detail: 'Time before you act' },
      { label: 'Revenue at risk', value: '~$980/month', detail: 'Silent losses detected' },
    ],
    revenueHook: 'Most ranking losses happen silently — and turn into lost revenue within days.',
    planLock: {
      currentPlan: 'Starter',
      unlockPlan: 'Growth',
      bullets: ['Weekly alerts', 'History & velocity', 'Revenue-level threats'],
    },
    industryVariants: [
      {
        slug: 'dentist',
        label: 'Dentists',
        kpiHint: 'New clinic openings show up as sudden jumps in nearby zones.',
        revenueCopy: 'Alerts keep you ahead of implant revenue losses worth $7k+.',
        example: 'Velocity spikes flagged rivals climbing 2–3 blocks in a week.',
      },
      {
        slug: 'restaurant',
        label: 'Restaurants',
        kpiHint: 'Trending restaurants surface through frequent rank movement.',
        revenueCopy: 'Weekly alerts stop rank drops that cost ~38 reservations/month.',
        example: 'Seven competitor rank changes were detected before lunch rush.',
      },
      {
        slug: 'medical_clinic',
        label: 'Medical Clinics',
        kpiHint: 'Chains expanding insured zones show up with fast velocity.',
        revenueCopy: 'Protecting those zones preserves $5.3k in recurring patient revenue.',
        example: 'Alerts cut reaction lag to three days, saving crucial bookings.',
      },
      {
        slug: 'law_firm',
        label: 'Law Firms',
        kpiHint: 'Ad spend spikes appear as rapid climbs in neighboring cells.',
        revenueCopy: 'Catching them quickly protects $12k+ pipelines per case.',
        example: 'Alerted when a rival moved into your top-tier accident zone.',
      },
      {
        slug: 'real_estate',
        label: 'Real Estate',
        kpiHint: 'Agencies expanding coverage cause sudden neighborhood jumps.',
        revenueCopy: 'Early detection keeps $18k deals from drifting to others.',
        example: 'Velocity reports highlighted a multi-location push northward.',
      },
    ],
  },
}
