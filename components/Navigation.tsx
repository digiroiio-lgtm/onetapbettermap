'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/upgrade' },
  { label: 'Guides', href: '/guide' },
  { label: 'Blog', href: '/blog' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') return
      setIsLoggedIn(window.localStorage.getItem('isLoggedIn') === 'true')
    }
    checkAuth()
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const renderPrimaryCTAs = () => {
    if (isLoggedIn) {
      return (
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-full bg-white text-black text-sm font-semibold px-5 py-2 transition hover:bg-white/90"
        >
          Go to Dashboard
        </Link>
      )
    }

    return (
      <>
        <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white">
          Login
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
        >
          Sign Up Free
        </Link>
      </>
    )
  }

  const isUpgradeActive = pathname === '/upgrade'

  return (
    <header className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur border-b border-white/5 text-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-16 h-20">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          MapsRankChecker™
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => {
            const isActive = isUpgradeActive
              ? link.label === 'Pricing'
              : link.href === '/#features' && pathname === '/'
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          {renderPrimaryCTAs()}
          <Link
            href="/#scan-section"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Start Free Scan
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#020617] px-5 py-4 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-slate-300"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="block text-center rounded-full bg-white text-black text-sm font-semibold px-4 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block text-center rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up Free
              </Link>
            </>
          )}
          <Link
            href="/#scan-section"
            className="block text-center rounded-full bg-white text-black text-sm font-semibold px-4 py-2"
            onClick={() => setMenuOpen(false)}
          >
            Start Free Scan
          </Link>
        </div>
      )}
    </header>
  )
}
