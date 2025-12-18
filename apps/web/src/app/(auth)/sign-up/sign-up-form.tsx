'use client'

import { signInWithGithub } from '@/app/(auth)/sign-up/actions'

import githubIcon from '@/assets/github-icon.svg'
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
import { signUp } from '@/http/sign-up'
import { passwordRequirements } from '@/lib/password'
import { cn } from '@/lib/utils'
import { SignUpFormData, signUpSchema } from '@/validators/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

export function SignUpForm() {
  const router = useRouter()

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = form

  const password = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  })

  async function onSubmit(data: SignUpFormData) {
    try {
      await signUp(data)

      toast.success('Account created 🎉')

      router.push('/')
    } catch {
      toast.error('Failed to create account')
    }
  }

  function getPasswordFeedback(passed: number, total: number) {
    if (passed < total) {
      return {
        label: 'Incomplete',
        color: 'bg-red-500',
        valid: false,
      }
    }

    return {
      label: 'Strong',
      color: 'bg-green-500',
      valid: true,
    }
  }

  const totalRules = passwordRequirements.length
  const passedRules = passwordRequirements.filter((r) =>
    r.validator(password)
  ).length

  const isValidPassword = passedRules === totalRules

  const feedback = getPasswordFeedback(passedRules, totalRules)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <FieldDescription className="text-destructive">
                    {errors.name.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="m@example.com"
                  required
                />
                {errors.email ? (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                ) : (
                  <FieldDescription>
                    We will not share your email with anyone else.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={errors.password ? 'border-destructive' : ''}
                  required
                />
                {password.length > 0 && (
                  <>
                    <div className="mt-3 space-y-2">
                      <div className="flex gap-1">
                        {Array.from({ length: totalRules }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              'h-2 flex-1 rounded transition-all',
                              i < passedRules ? feedback.color : 'bg-muted'
                            )}
                          />
                        ))}
                      </div>

                      {!feedback.valid && (
                        <p className="text-destructive text-sm">
                          Password does not meet all requirements
                        </p>
                      )}

                      {feedback.valid && (
                        <p className="text-sm font-medium text-green-600">
                          Password is strong
                        </p>
                      )}
                    </div>
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, index) => {
                        const isValid = req.validator(password)
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            {isValid ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="text-destructive h-4 w-4" />
                            )}
                            <span
                              className={
                                isValid
                                  ? 'text-green-600'
                                  : 'text-muted-foreground'
                              }
                            >
                              {req.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}

                {errors.password && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-destructive' : ''}
                  required
                />
                {errors.confirmPassword ? (
                  <FieldDescription className="text-destructive">
                    {errors.confirmPassword.message}
                  </FieldDescription>
                ) : (
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={!isValidPassword || isSubmitting}
                >
                  Create Account
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
                Sign up with GitHub
              </Button>
              <FieldDescription className="px-6 text-center">
                Already have an account? <Link href="/sign-in">Sign in</Link>
              </FieldDescription>
            </Field>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
