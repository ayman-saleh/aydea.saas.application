import * as z from 'zod'

import { schema as passwordSchema } from './password'

export const schema = z
  .object({
    password: passwordSchema.shape.password.describe('Current password'),
    newPassword: passwordSchema.shape.password.describe('New password'),
    confirmPassword: passwordSchema.shape.password.describe('Confirm password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.password !== data.newPassword, {
    message: 'New password and current password cannot be the same',
    path: ['newPassword'],
  })
  .refine(
    (data) => {
      const password = data.password.toLowerCase()
      const newPassword = data.newPassword.toLowerCase()
      return !password.includes(newPassword)
    },
    {
      message: 'Password and new password cannot be similar',
      path: ['newPassword'],
    },
  )

export type UpdatePasswordFormInput = z.infer<typeof schema>
