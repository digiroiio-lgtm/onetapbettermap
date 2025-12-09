export type FaqItem = {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'Will MapsRankChecker actually improve my Google Maps ranking?',
    answer:
      'Yes. We show your real ranking footprint, prioritize what’s blocking you, and provide clear fixes so you can act immediately.',
  },
  {
    question: 'Do I need SEO experience to use it?',
    answer:
      'No. The platform translates complex local SEO signals into a simple score and guided tasks anyone can follow.',
  },
  {
    question: 'Do I need access to my Google account?',
    answer:
      'You can start scans without connecting anything. Connect later if you want automated tracking, alerts, or reporting.',
  },
  {
    question: 'How accurate are the scans?',
    answer:
      'Each scan checks 49 geocoordinates across your service area so you see rankings the way nearby customers do.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no contracts. Cancel or downgrade whenever you like from the billing page.',
  },
  {
    question: 'Does the free plan expire?',
    answer:
      'No. You get 100 free scans every month forever. Upgrade only when you’re ready for unlimited scans and automation.',
  },
  {
    question: 'How is this different from Google Search Console?',
    answer:
      'Search Console shows web clicks from one location. MapsRankChecker scans 49+ coordinates across your city to reveal the real local pack rankings customers see.',
  },
  {
    question: 'How quickly do I see results after acting on a scan?',
    answer:
      'Most customers spot measurable movement in 1–3 weeks. Rank changes happen in batches, so we start reporting once you move the needle across multiple cells.',
  },
  {
    question: 'Can I share ranking reports with stakeholders?',
    answer:
      'Yes. Exporting CSVs and white-label reports is built in, so you can hand off slices of data to marketing, ops, or leadership on demand.',
  },
  {
    question: 'Do you integrate with Google Business Profile or reporting tools?',
    answer:
      'We sit next to GBP. Connect the same account once you want automated alerts, compare to GBP metrics, or sync to the Revenue Forecaster for CRM exports.',
  },
]

export const faqSections = [
  {
    title: 'MapsRankChecker in practice',
    subtitle: 'Understand the data we surface and how it guides action.',
    items: [faqItems[0], faqItems[1], faqItems[3], faqItems[6]],
  },
  {
    title: 'Integration & setup',
    subtitle: 'Connect when you’re ready and keep everything in one place.',
    items: [faqItems[2], faqItems[9]],
  },
  {
    title: 'Plans, reports, and results',
    subtitle: 'Billing, sharing, and measuring success.',
    items: [faqItems[4], faqItems[5], faqItems[7], faqItems[8]],
  },
]
