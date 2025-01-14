import * as z from 'zod'

import { schema as passwordSchema } from './password'

export const schema = z
  .object({
    password: passwordSchema.shape.password.describe('Current password'),
    newPassword: passwordSchema.shape.password.describe('New password'),
    confirmPassword: passwordSchema.shape.password.describe('Confirm password'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })
  .superRefine((data, ctx) => {
    if (data.password === data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password and current password cannot be the same',
        path: ['newPassword'],
      })
    }
  })

export type UpdatePasswordFormInput = z.infer<typeof schema>
