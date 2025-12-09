import type { Metadata } from 'next'
import Link from 'next/link'
import CaseStudyLayout from '../_components/CaseStudyLayout'
import { caseStudies, getCaseStudy, CaseStudySlug } from '@/lib/caseStudies'

const metaTitles: Record<CaseStudySlug, string> = {
  dentist: 'Dental Maps Case Study | SmileWorks Revenue',
  restaurant: 'Restaurant Maps Case Study | Urban Table Bistro',
  law_firm: 'Law Firm Maps Case Study | Atlas Injury',
  medical_clinic: 'Clinic Maps Case Study | ClinicOne Health',
  real_estate: 'Real Estate Maps Case Study | Coastal Realty',
}

const metaDescriptions: Record<CaseStudySlug, string> = {
  dentist:
    'SmileWorks Dental recovered 3 implant cases/month (~$8.4k) by fixing GeoGrid visibility and revenue modeling.',
  restaurant:
    'Urban Table Bistro healed empty tables by mapping lunch/dinner blind spots and booking 38 extra seats.',
  law_firm:
    'Atlas Injury Law uses competitor alerts and forecasts to capture 1–2 more cases (~$12k pipeline).',
  medical_clinic:
    'ClinicOne Health regained 27 insured patients/month (~$5.3k recurring revenue) by improving coverage.',
  real_estate:
    'Coastal Realty turned 6 invisible districts into 14 extra buyer calls and $18k deal value.',
}

type Params = {
  slug: CaseStudySlug
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const title = metaTitles[params.slug]
  const description = metaDescriptions[params.slug]
  const url = `https://mapsrankchecker.com/case-studies/${params.slug}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const study = getCaseStudy(params.slug)

  if (!study) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <p className="text-2xl font-semibold">Case study not found</p>
          <p className="mt-3 text-slate-400">
            Browse our other success stories for proof of MapsRankChecker’s impact.
          </p>
          <Link
            href="/use-cases"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Back to use cases
          </Link>
        </div>
      </div>
    )
  }

  const sections = [
    { heading: 'Who', copy: [study.context] },
    { heading: 'Problem', copy: [study.problem] },
    { heading: 'Insight', copy: [study.insight] },
    { heading: 'Action', copy: [study.action] },
    { heading: 'Result', copy: [study.result] },
  ]

  return (
    <CaseStudyLayout
      title={`${study.title} • ${study.description}`}
      sections={sections}
      revenue={study.revenue}
      quote={study.quote}
      ctaText={study.ctaText ?? 'See how much revenue you’re missing'}
    />
  )
}
