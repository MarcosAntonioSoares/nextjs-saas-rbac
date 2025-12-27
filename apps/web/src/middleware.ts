import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth_token')?.value

  const isAuthPage =
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/forgot-password')

  if (!token) {
    if (isAuthPage) {
      const response = NextResponse.next()
      response.cookies.delete('org')
      return response
    }

    const response = NextResponse.redirect(new URL('/sign-in', request.url))
    response.cookies.delete('org')
    return response
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/org/')) {
    const [, , slug] = pathname.split('/')

    if (slug) {
      const response = NextResponse.next()
      response.cookies.set('org', slug, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|public|favicon.ico).*)'],
}
