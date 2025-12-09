import Link from 'next/link'
import React from 'react'
import type { GuideSlug } from '@/lib/seo/guidesSeo'

type Section = {
  title: string
  paragraphs: React.ReactNode[]
  subheadings?: { title: string; paragraphs: React.ReactNode[] }[]
}

export type GuideContent = {
  subtitle?: string
  sections: Section[]
}

export const guideContent: Record<GuideSlug, GuideContent> = {
  'google-maps-ranking': {
    sections: [
      {
        title: 'What Google Maps ranking actually means',
        paragraphs: [
          'Visibility is the difference between answering a call or losing a patient to a nearby clinic.',
          'Most businesses chase boosting a vanity rank without seeing how it maps to actual discovery.',
        ],
      },
      {
        title: 'Why rankings change by location',
        paragraphs: ['Location, signals, and keywords vary street by street.'],
        subheadings: [
          {
            title: 'Proximity-based results',
            paragraphs: [
              'Google shows the nearest result even when your profile is technically superior.',
              'Matching geography with ranking data reveals which neighborhoods need attention.',
            ],
          },
          {
            title: 'Grid visibility vs average position',
            paragraphs: [
              'An average rank hides dramatic variance across zones.',
              'Grid visibility highlights those dark spots and lets you tie them to revenue via the Revenue Forecaster.',
            ],
          },
        ],
      },
      {
        title: 'The difference between ranking and coverage',
        paragraphs: [
          'Coverage is the percentage of your service area that sees your profile in the top spots.',
          'You need both rank and coverage to claim you truly own local visibility.',
        ],
      },
      {
        title: 'How to measure true Maps performance',
        paragraphs: [
          <>
            Use a <Link href="/features/google-maps-rank-tracker" className="text-emerald-300 underline-offset-4 hover:underline">rank tracker</Link> plus GeoGrid so you monitor both keyword lifts and zonal gaps.
          </>,
          <>
            Tie every change to revenue with the <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">Revenue Forecaster</Link> and track the delta in calls.
          </>,
        ],
      },
      {
        title: 'Check your real Google Maps ranking',
        paragraphs: [
          <>
            Run a <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free Google Maps visibility scan</Link> to see the revenue you are missing and map it to action.
          </>,
        ],
      },
    ],
  },
  'google-maps-ranking-factors': {
    sections: [
      {
        title: 'Primary ranking factors on Google Maps',
        paragraphs: [],
        subheadings: [
          {
            title: 'Proximity',
            paragraphs: [
              'Distance to the searcher still leads the pack of signals.',
              'Optimizing service radius and verifying your address are table stakes.',
            ],
          },
          {
            title: 'Relevance',
            paragraphs: [
              'Keyword-rich descriptions and services keep you relevant to actual intent.',
              <>
                Track relevance improvements with the{' '}
                <Link href="/features/google-maps-rank-tracker" className="text-emerald-300 underline-offset-4 hover:underline">
                  Google Maps rank tracker
                </Link>
                .
              </>,
            ],
          },
          {
            title: 'Prominence',
            paragraphs: [
              'Prominence comes from reviews, photos, and citations.',
              'Slow, steady improvement in trust signals signals consistent visibility.',
            ],
          },
        ],
      },
      {
        title: 'Hidden factors most tools ignore',
        paragraphs: [],
        subheadings: [
          {
            title: 'Zone-based visibility gaps',
            paragraphs: [
              'Tools that only sample one location miss these losses.',
              'A GeoGrid reveals pockets where your revenue slip happens.',
            ],
          },
          {
            title: 'Competitor movement velocity',
            paragraphs: [
              'Competitors jump fast; tracking that motion is how you know when to react.',
              'Automated alerts keep you ahead before the revenue loss occurs.',
            ],
          },
        ],
      },
      {
        title: 'Which factors affect revenue the most',
        paragraphs: [
          'Visibility gaps erode calls. Revenue impact comes when your rank lifts across multiple zones.',
          <>
            See{' '}
            <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">
              which ranking factors move revenue
            </Link>{' '}
            so you can prioritize confidently.
          </>,
        ],
      },
    ],
  },
  'how-to-rank-higher-on-google-maps': {
    sections: [
      {
        title: 'Why most “rank higher” advice fails',
        paragraphs: [
          'Generic tactics ignore the geography and revenue calculus of your business.',
          'You need a repeatable loop built on data, not guesses.',
        ],
      },
      {
        title: 'Step-by-step framework that actually works',
        paragraphs: [],
        subheadings: [
          {
            title: 'Step 1: Measure real visibility',
            paragraphs: [
              'Baseline visibility with a GeoGrid and note the weak zones.',
              'The rank tracker captures the lift you actually care about.',
            ],
          },
          {
            title: 'Step 2: Detect weak zones',
            paragraphs: [
              'Focus on coverage gaps, not just average position.',
              'Each hidden zone equals lost calls.',
            ],
          },
          {
            title: 'Step 3: Fix revenue-blocking gaps',
            paragraphs: [
              'Tie actions to the Revenue Forecaster to prove dollars in the pipeline.',
              'Prioritize the steps that yield the largest revenue delta.',
            ],
          },
        ],
      },
      {
        title: 'How long ranking improvements take',
        paragraphs: [
          'Expect measurable revenue shifts within 4–6 weeks when you act weekly.',
        ],
      },
      {
        title: 'Tracking progress the right way',
        paragraphs: [
          'Pair GeoGrid snapshots with revenue forecasts to show impact.',
          <>
            Build trust by showing stakeholders the data behind every action, then invite them to{' '}
            <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">
              run a free scan
            </Link>
            .
          </>,
        ],
      },
    ],
  },
  'google-maps-ranking-algorithm': {
    sections: [
      {
        title: 'Is there a single Maps algorithm?',
        paragraphs: [
          'Google blends relevance, distance, and behavior into every local result.',
          'Understanding this mix keeps you from chasing one signal.',
        ],
      },
      {
        title: 'How Google local intent changes rankings',
        paragraphs: [],
        subheadings: [
          {
            title: 'Searcher location',
            paragraphs: [
              'Proximity determines which variants are served.',
              'Mapping ranking lifts to specific neighborhoods shows the real story.',
            ],
          },
          {
            title: 'Search behavior signals',
            paragraphs: [
              'Click-through rate, calls, and direction requests influence rankings.',
              'Log these behaviors with the rank tracker to prove impact.',
            ],
          },
        ],
      },
      {
        title: 'Why rankings fluctuate daily',
        paragraphs: [
          'Local tests, new business entries, and behavioral shifts make fluctuations normal.',
          'Focus on trends across time instead of daily noise.',
        ],
      },
      {
        title: 'What businesses can control vs can’t',
        paragraphs: [
          'You control your profile, reviews, and service accuracy.',
          'You cannot control competitor investments, so monitor them with alerts.',
        ],
      },
      {
        title: 'See algorithm effects on your ranking',
        paragraphs: [
          <>
            Use a <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">Revenue Forecaster</Link> to model algorithm shifts before they hit calls.
          </>,
        ],
      },
    ],
  },
  'google-maps-ranking-checker-tools': {
    sections: [
      {
        title: 'What most rank checkers do wrong',
        paragraphs: [
          'They reward vanity numbers instead of coverage.',
          'You need clarity on which zones your business truly owns.',
        ],
      },
      {
        title: 'Grid-based vs single-point ranking tools',
        paragraphs: [
          'Grid-based tools sample many points and reveal revenue gaps.',
          'Single-point tools can falsely boost confidence.',
        ],
      },
      {
        title: 'What to look for in a Maps ranking checker',
        paragraphs: [],
        subheadings: [
          {
            title: 'Zone coverage',
            paragraphs: ['Coverage reveals where your brand is visible.', 'Use GeoGrid heatmaps to spot holes.'],
          },
          {
            title: 'Competitor tracking',
            paragraphs: ['Track rivals to know where they are gaining.', 'Alerts help you respond faster.'],
          },
          {
            title: 'Revenue translation',
            paragraphs: [
              'Each rank gain should tie to calls.',
              'Revenue Forecaster does that math for you.',
            ],
          },
        ],
      },
      {
        title: 'Choosing the right tool for your business',
        paragraphs: [
          'You need transparency, coverage, and revenue modeling.',
          <>
            Compare your real visibility now with a <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free scan</Link>.
          </>,
        ],
      },
    ],
  },
  'google-maps-local-seo-expert': {
    sections: [
      {
        title: 'What a local SEO expert really does',
        paragraphs: [
          'They diagnose ranking gaps across neighborhoods and tie those to revenue.',
          'Experts combine data, execution, and reporting for clients.',
        ],
      },
      {
        title: 'When tools outperform agencies',
        paragraphs: [
          'Tools scale better when you need weekly habit and ownership.',
          'Combine tools with expert oversight for audits and strategic push.',
        ],
      },
      {
        title: 'Signals you need expert help',
        paragraphs: [
          'Complex multistate coverage, rapid competition, or revenue-critical campaigns?',
          'Experts help build prioritization frameworks that automate revenue conversion.',
        ],
      },
      {
        title: 'Combining tools + expertise effectively',
        paragraphs: [
          'Use the rank tracker and GeoGrid for weekly clarity.',
          'Let the expert guide focus on roadmap, while you handle ops.',
          <>
            See what an expert would optimize first by scanning with <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">a free visibility scan</Link>.
          </>,
        ],
      },
    ],
  },
  'google-maps-citations': {
    sections: [
      {
        title: 'What citations are in local SEO',
        paragraphs: [
          'Citations are listings of your name, address, and phone.',
          'Consistency across directories strengthens trust.',
        ],
      },
      {
        title: 'How citations affect Maps ranking',
        paragraphs: [
          'Accurate citations prevent confusing signals for Google.',
          'Discrepancies drop you out of top visibility zones.',
        ],
      },
      {
        title: 'Common citation myths',
        paragraphs: [
          'Quantity matters less than accuracy.',
          'Spammy directories can hurt more than help.',
        ],
      },
      {
        title: 'Tracking citation impact properly',
        paragraphs: [
          'Tie citation work to rank improvements in the GeoGrid.',
          'See the revenue shift with the Revenue Forecaster.',
          <>
            Check citation impact on your ranking with a <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free scan</Link>.
          </>,
        ],
      },
    ],
  },
  'google-maps-grid-visibility': {
    sections: [
      {
        title: 'What grid visibility really means',
        paragraphs: [
          'A 49-point grid maps the real coverage across your service area.',
          'It shows which neighborhoods see you and where competitors dominate.',
        ],
      },
      {
        title: 'Why average rank misleads businesses',
        paragraphs: [
          'Average rank hides spikes and gaps.',
          'We fight that with coverage scoring.',
        ],
      },
      {
        title: 'How 49-point grids reveal revenue gaps',
        paragraphs: [
          'Each poor-performing cell equals missing calls.',
          'Scale the understanding by feeding the grid into revenue forecasting.',
        ],
      },
      {
        title: 'Using grid visibility to scale locally',
        paragraphs: [
          'Treat the grid as a heatmap and fix the red zones first.',
          <>
            View your grid visibility map and match it to revenue with a <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free scan</Link>.
          </>,
        ],
      },
    ],
  },
}
