import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow access to the home page and static files
  if (
    request.nextUrl.pathname === '/' || 
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  // Redirect all other routes to home
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/:path*',
} 