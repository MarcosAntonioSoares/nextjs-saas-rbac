'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

const signInSchema = z.object({
  email: z.email('Email inválido').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))
  const cookieStore = await cookies()

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

    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
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

  redirect('/')
}
