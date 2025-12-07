interface OnboardingStep {
  id: string
  title: string
  description: string
  status: 'done' | 'current' | 'todo'
  action?: {
    label: string
    href: string
  }
}

interface OnboardingPanelProps {
  steps: OnboardingStep[]
}

const statusStyles: Record<OnboardingStep['status'], string> = {
  done: 'bg-emerald-50 border-emerald-200',
  current: 'bg-blue-50 border-blue-200',
  todo: 'bg-gray-50 border-gray-200',
}

const statusIcon: Record<OnboardingStep['status'], string> = {
  done: '✓',
  current: '•',
  todo: '○',
}

export default function OnboardingPanel({ steps }: OnboardingPanelProps) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-gray-100">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-1">Onboarding</p>
          <h2 className="text-xl font-semibold text-gray-900">Get the most out of One Tap, Better Map</h2>
          <p className="text-sm text-gray-600">
            Follow the checklist below to finish setting up your workspace. Questions?{' '}
            <a href="/support" className="text-primary font-medium hover:text-blue-600">
              Visit Support
            </a>
          </p>
        </div>
      </div>
      <ol className="divide-y divide-gray-100">
        {steps.map(step => (
          <li key={step.id} className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-l-4 ${statusStyles[step.status]}`}>
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
                  step.status === 'done'
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : step.status === 'current'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {statusIcon[step.status]}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
            {step.action && (
              <a
                href={step.action.href}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                {step.action.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
