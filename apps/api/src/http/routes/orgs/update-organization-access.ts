import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import prisma from '@/lib/client'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function updateOrganizationAccess(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:slug/access',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Update last accessed organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { slug } = request.params

        const member = await prisma.member.findFirst({
          where: {
            userId,
            organization: { slug },
          },
        })

        if (!member) {
          throw new BadRequestError('No access to this organization.')
        }

        await prisma.member.update({
          where: { id: member.id },
          data: { lastAccessedAt: new Date() },
        })

        return reply.status(204).send()
      }
    )
}
