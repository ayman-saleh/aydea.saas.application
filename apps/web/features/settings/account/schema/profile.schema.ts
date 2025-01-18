import * as z from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(40, 'Too long'),
  email: z.string().email(),
})

export type ProfileFormInput = z.infer<typeof profileSchema>
