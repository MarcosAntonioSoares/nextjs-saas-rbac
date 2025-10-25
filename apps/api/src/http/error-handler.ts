import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    const fieldErrors = error.issues.reduce(
      (acc, issue) => {
        const path = issue.path.join('.')
        if (!acc[path]) {
          acc[path] = []
        }
        acc[path].push(issue.message)
        return acc
      },
      {} as Record<string, string[]>
    )

    return reply.status(400).send({
      message: 'Validation error',
      errors: fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  // send error to some observability plataform.

  return reply.status(500).send({
    message: 'Internal server error.',
  })
}
