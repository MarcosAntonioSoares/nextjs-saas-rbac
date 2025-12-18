// src/validators/sign-up.ts

import { PASSWORD_RULES, PasswordRule } from '@/lib/password/password-rules'
import { z } from 'zod'

function hasMin(zod?: PasswordRule['zod']): zod is { min: number } {
  return typeof zod?.min === 'number'
}

function hasRegex(zod?: PasswordRule['zod']): zod is { regex: RegExp } {
  return zod?.regex instanceof RegExp
}

export function applyPasswordRules(schema: z.ZodString) {
  let result = schema

  for (const rule of Object.values(PASSWORD_RULES)) {
    if (hasMin(rule.zod)) {
      result = result.min(rule.zod.min, rule.label)
    }

    if (hasRegex(rule.zod)) {
      result = result.regex(rule.zod.regex, rule.label)
    }
  }

  return result
}

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email'),
    password: applyPasswordRules(z.string()),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>
