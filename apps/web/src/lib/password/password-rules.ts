export type PasswordRule = {
  label: string
  validate: (password: string) => boolean
  zod?: {
    min?: number
    regex?: RegExp
  }
}

export const PASSWORD_RULES = {
  minLength: {
    label: 'At least 8 characters',
    validate: (pwd) => pwd.length >= 8,
    zod: {
      min: 8,
    },
  },
  uppercase: {
    label: 'One uppercase letter',
    validate: (pwd) => /[A-Z]/.test(pwd),
    zod: {
      regex: /[A-Z]/,
    },
  },
  lowercase: {
    label: 'One lowercase letter',
    validate: (pwd) => /[a-z]/.test(pwd),
    zod: {
      regex: /[a-z]/,
    },
  },
  number: {
    label: 'One number',
    validate: (pwd) => /\d/.test(pwd),
    zod: {
      regex: /\d/,
    },
  },
  specialChar: {
    label: 'One special character',
    validate: (pwd) => /[^A-Za-z0-9]/.test(pwd),
    zod: {
      regex: /[^A-Za-z0-9]/,
    },
  },
} satisfies Record<string, PasswordRule>
