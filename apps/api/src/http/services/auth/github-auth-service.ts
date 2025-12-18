import { createAuthCookie } from '@/http/auth/create-auth-cookie'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { env } from '@saas/env'
import { FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticateGithubUser(
  code: string,
  reply: FastifyReply
) {
  const githubOAuthURL = new URL('https://github.com/login/oauth/access_token')

  githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubOAuthURL.searchParams.set(
    'client_secret',
    env.GITHUB_OAUTH_CLIENT_SECRET
  )
  githubOAuthURL.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
  )
  githubOAuthURL.searchParams.set('code', code)

  const githubAccessTokenResponse = await fetch(githubOAuthURL, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  })

  const githubAccessTokenData = await githubAccessTokenResponse.json()

  const { access_token: githubAccessToken } = z
    .object({
      access_token: z.string(),
      token_type: z.literal('bearer'),
      scope: z.string(),
    })
    .parse(githubAccessTokenData)

  const githubUserResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${githubAccessToken}`,
    },
  })

  const githubUserData = await githubUserResponse.json()

  const {
    id: githubId,
    name,
    email,
    avatar_url: avatarUrl,
  } = z
    .object({
      id: z.number().int().transform(String),
      avatar_url: z.url(),
      name: z.string().nullable(),
      email: z.email().nullable(),
    })
    .parse(githubUserData)

  if (!email) {
    throw new BadRequestError(
      'Your GitHub account must have an email to authenticate.'
    )
  }

  let user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    user = await prisma.user.create({
      data: { name, email, avatarUrl },
    })
  }

  let account = await prisma.account.findUnique({
    where: {
      provider_userId: {
        provider: 'GITHUB',
        userId: user.id,
      },
    },
  })

  if (!account) {
    await prisma.account.create({
      data: {
        provider: 'GITHUB',
        providerAccountId: githubId,
        userId: user.id,
      },
    })
  }

  await createAuthCookie({
    reply,
    userId: user.id,
  })
}
