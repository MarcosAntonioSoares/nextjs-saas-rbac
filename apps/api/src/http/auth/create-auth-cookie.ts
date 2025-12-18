import { FastifyReply } from 'fastify'

type CreateAuthCookieParams = {
  reply: FastifyReply
  userId: string
}

export async function createAuthCookie({
  reply,
  userId,
}: CreateAuthCookieParams) {
  const token = await reply.jwtSign(
    {
      sub: userId,
    },
    {
      sign: {
        expiresIn: '7d',
      },
    }
  )

  reply.setCookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}
