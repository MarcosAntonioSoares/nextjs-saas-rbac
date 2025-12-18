import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found.' },
      { status: 400 }
    )
  }

  const backendURL = new URL('http://localhost:3333/sessions/github')

  backendURL.searchParams.set('code', code)

  return NextResponse.redirect(backendURL.toString())
}
