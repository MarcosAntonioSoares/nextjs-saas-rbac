'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AlertCircle, AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { signInWithGithub } from '@/app/(auth)/sign-up/actions'
import githubIcon from '@/assets/github-icon.svg'

import { signInClient } from '@/app/(auth)/sign-in/sign-in.client'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

type FormState = {
  success: boolean | null
  message: string | null
  fieldErrors: Record<string, string[]>
  formErrors: string[]
}

export function SignInForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [{ success, message, fieldErrors, formErrors }, setState] =
    useState<FormState>({
      success: null,
      message: null,
      fieldErrors: {},
      formErrors: [],
    })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await signInClient(formData)

      setState(result)

      if (result.success) {
        router.push('/')
        router.refresh()
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full flex-col gap-7">
            <form onSubmit={handleSubmit}>
              {success === false && message && (
                <Alert variant="destructive">
                  <AlertTriangle className="size-4" />
                  <AlertTitle>Sign in failed!</AlertTitle>
                  <AlertDescription>
                    <p>{message}</p>
                  </AlertDescription>
                </Alert>
              )}
              {formErrors && formErrors?.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle>Form validation failed</AlertTitle>
                  <AlertDescription>
                    <ul className="list-inside list-disc space-y-1">
                      {formErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  {fieldErrors?.email && (
                    <FieldDescription className="text-red-500">
                      {fieldErrors.email}
                    </FieldDescription>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" />
                  {fieldErrors?.password && (
                    <FieldDescription className="text-red-500">
                      {fieldErrors.password}
                    </FieldDescription>
                  )}
                  <div className="self-start">
                    <Link
                      href="/forgot-password"
                      className="inline text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </Field>

                <Field>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
            <FieldSeparator>Or continue with</FieldSeparator>
            <form action={signInWithGithub}>
              <Field>
                <Button variant="outline" type="submit">
                  <Image
                    src={githubIcon}
                    alt=""
                    width={16}
                    height={16}
                    className="dark:invert"
                  />
                  Login with GitHub
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{' '}
                  <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
