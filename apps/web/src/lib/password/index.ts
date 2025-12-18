import { PASSWORD_RULES } from './password-rules'

export type PasswordRequirement = {
  label: string
  validator: (password: string) => boolean
}

export const passwordRequirements: PasswordRequirement[] = Object.values(
  PASSWORD_RULES
).map((rule) => ({
  label: rule.label,
  validator: rule.validate,
}))
