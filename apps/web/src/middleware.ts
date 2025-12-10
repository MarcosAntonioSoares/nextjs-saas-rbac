import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  const isAuthPage = request.nextUrl.pathname.startsWith('/sign-in')

  // 🔒 Se NÃO estiver logado e tentar entrar em página protegida → redireciona
  if (!token && !isAuthPage) {
    const redirectUrl = new URL('/sign-in', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // 🔓 Se estiver logado e tentar acessar /sign-in → manda para home
  if (token && isAuthPage) {
    const redirectUrl = new URL('/', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|public|sign-in|sign-up|forgot-password).*)'],
}
