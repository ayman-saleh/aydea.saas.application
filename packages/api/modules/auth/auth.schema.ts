import { z } from 'zod'

export const UpdatePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})
