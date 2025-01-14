import { z } from 'zod'

export const schema = z.object({
  password: z.string().min(8).max(32),
})

export type PasswordFormInput = z.infer<typeof schema>
