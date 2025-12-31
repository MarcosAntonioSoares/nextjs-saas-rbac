import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import prisma from '@/lib/client'
import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      throw new UnauthorizedError('Invalid auth token')
    }

    request.getCurrentUserId = async () => {
      return request.user.sub
    }

    request.getUserMembership = async (slug: string) => {
      const userId = request.user.sub

      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedError(`You're not a member of this organization.`)
      }

      const { organization, ...membership } = member
      return { organization, membership }
    }
  })
})
