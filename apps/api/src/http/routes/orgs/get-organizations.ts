import { auth } from '@/http/middlewares/auth'
import prisma from '@/lib/client'
import { roleSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getOrganizations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get organizations where user is a member',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              organizations: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  slug: z.string(),
                  avatarUrl: z.url().nullable(),
                  role: roleSchema,
                  lastAccessedAt: z.date().nullable(),
                })
              ),
            }),
          },
        },
      },
      async (request) => {
        const userId = await request.getCurrentUserId()

        const organizations = await prisma.organization.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            avatarUrl: true,
            members: {
              select: {
                role: true,
                lastAccessedAt: true,
              },
              where: { userId },
            },
          },
          where: {
            members: {
              some: {
                userId,
              },
            },
          },
        })

        const organizationsWithUserRole = organizations.map(
          ({ members, ...org }) => {
            return {
              ...org,
              role: members[0]?.role,
              lastAccessedAt: members[0]?.lastAccessedAt,
            }
          }
        )

        organizationsWithUserRole.sort((a, b) => {
          if (a.lastAccessedAt && b.lastAccessedAt) {
            return b.lastAccessedAt.getTime() - a.lastAccessedAt.getTime()
          }
          if (a.lastAccessedAt) return -1
          if (b.lastAccessedAt) return 1
          return 0
        })

        return {
          organizations: organizationsWithUserRole,
        }
      }
    )
}
