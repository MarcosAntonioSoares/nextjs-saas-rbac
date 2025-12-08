'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'
import z from 'zod'

const signInSchema = z.object({
  email: z.email('Email inválido').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const { fieldErrors, formErrors } = z.flattenError(result.error)

    return { success: false, message: null, fieldErrors, formErrors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, fieldErrors: null, formErrors: null }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      fieldErrors: null,
      formErrors: null,
    }
  }

  return { success: true, message: null, fieldErrors: null, formErrors: null }
}
