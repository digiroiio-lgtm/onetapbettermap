import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const hostname = host.split(':')[0]

  if (!hostname || LOCAL_HOSTS.has(hostname)) {
    return NextResponse.next()
  }

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

  return NextResponse.next()
}
