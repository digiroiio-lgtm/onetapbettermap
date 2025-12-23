import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const hostname = host.split(':')[0]

  const isLocal = !hostname || LOCAL_HOSTS.has(hostname)
  if (!isLocal) {
    const forwardedProto = request.headers.get('x-forwarded-proto')
    const protocol = forwardedProto ? `${forwardedProto}:` : request.nextUrl.protocol
    const isWww = hostname.startsWith('www.')
    const canonicalHost = isWww ? hostname.replace(/^www\./, '') : hostname

    if (protocol !== 'https:' || isWww) {
      const url = request.nextUrl.clone()
      url.protocol = 'https:'
      url.host = canonicalHost
      return NextResponse.redirect(url, 301)
    }
  }

  const { pathname, searchParams } = request.nextUrl
  const redirectTo = (path: string, keepSearch = true) => {
    const url = request.nextUrl.clone()
    url.pathname = path
    if (!keepSearch) {
      url.search = ''
    }
    return NextResponse.redirect(url, 301)
  }

  if (pathname === '/landing') {
    return redirectTo('/', false)
  }

  if (pathname === '/upgrade') {
    return redirectTo('/pricing', false)
  }

  if (pathname === '/dashboard') {
    return redirectTo('/app/dashboard', false)
  }

  if (pathname === '/scanning') {
    return redirectTo('/app/new', true)
  }

  if (pathname === '/results' && !searchParams.has('businessName')) {
    return redirectTo('/app/projects', false)
  }

  return NextResponse.next()
}
