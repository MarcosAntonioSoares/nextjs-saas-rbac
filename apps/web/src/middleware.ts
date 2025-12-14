import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|public|sign-in|sign-up|forgot-password).*)'],
}
