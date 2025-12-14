import { signInWithGithub } from '@/http/sign-in-with-github'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found.' },
      { status: 400 }
    )
  }

  await signInWithGithub({ code })

  return NextResponse.redirect('http://localhost:3000/')
}
