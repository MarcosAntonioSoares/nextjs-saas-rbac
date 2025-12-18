import { createAuthCookie } from '@/http/auth/create-auth-cookie'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Create a new account',
        tags: ['Auth'],
        body: z.object({
          name: z.string().min(1, 'Name is required'),
          email: z.email('Invalid e-mail'),
          password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .regex(
              /[a-z]/,
              'Password must contain at least one lowercase letter'
            )
            .regex(
              /[A-Z]/,
              'Password must contain at least one uppercase letter'
            )
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(
              /[^A-Za-z0-9]/,
              'Password must contain at least one special character'
            ),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (userWithSameEmail) {
        throw new BadRequestError('User with same e-mail already exists.')
      }

      const [, domain] = email.split('@')

      const autoJoinOrganization = await prisma.organization.findFirst({
        where: {
          domain,
          shouldAttachUsersByDomain: true,
        },
      })

      const passwordHash = await hash(password, 6)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          member_on: autoJoinOrganization
            ? {
                create: {
                  organizationId: autoJoinOrganization.id,
                },
              }
            : undefined,
        },
      })

      await createAuthCookie({
        reply,
        userId: user.id,
      })

      return reply.status(201).send()
    }
  )
}
