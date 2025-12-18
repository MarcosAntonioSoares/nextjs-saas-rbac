import { authenticateGithubUser } from '@/http/services/auth/github-auth-service'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { z } from 'zod'

export async function authenticateWithGitHub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/sessions/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with GitHub',
        querystring: z.object({
          code: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { code } = request.query

      await authenticateGithubUser(code, reply)

      return reply.redirect(process.env.WEB_APP_URL ?? 'http://localhost:3000')
    }
  )
}
