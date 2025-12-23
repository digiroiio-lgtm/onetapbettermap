'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type AppGuardProps = {
  children: React.ReactNode
}

export default function AppGuard({ children }: AppGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true'
    if (!loggedIn) {
      const query = searchParams?.toString()
      const nextPath = query ? `${pathname}?${query}` : pathname
      router.replace(`/login?next=${encodeURIComponent(nextPath)}`)
      return
    }
    setReady(true)
  }, [pathname, router, searchParams])

  if (!ready) {
    return null
  }

  return <>{children}</>
}
