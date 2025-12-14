import { signInWithPassword } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'
import z from 'zod'

const signInSchema = z.object({
  email: z.email('Email inválido').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export async function signInClient(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const { fieldErrors, formErrors } = z.flattenError(result.error)

    return {
      success: true,
      message: null,
      fieldErrors: fieldErrors ?? {},
      formErrors: formErrors ?? [],
    }
  }

  try {
    await signInWithPassword(result.data)

    return { success: true, message: null, fieldErrors: {}, formErrors: [] }
  } catch (error) {
    if (error instanceof HTTPError) {
      try {
        const errorData = await error.response.json<{ message: string }>()
        return {
          success: false,
          message: errorData.message || 'Sign in failed',
          fieldErrors: {},
          formErrors: [],
        }
      } catch {
        return {
          success: false,
          message: 'Sign in failed. Please try again.',
          fieldErrors: {},
          formErrors: [],
        }
      }
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
      fieldErrors: {},
      formErrors: [],
    }
  }
}
