import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function logout(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/sessions/logout',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Logout user',
        response: {
          204: z.null(),
        },
      },
    },
    async (_, reply) => {
      reply.clearCookie('auth_token', {
        path: '/',
      })

      return reply.status(204).send()
    }
  )
}
