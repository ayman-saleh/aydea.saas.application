import * as z from 'zod'

export const schema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordFormInput = z.infer<typeof schema>
