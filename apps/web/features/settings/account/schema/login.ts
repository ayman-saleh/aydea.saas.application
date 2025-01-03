import * as z from 'zod'

import { schema as profileSchema } from './profile'

export const schema = z.object({
  email: profileSchema.shape.email.describe('Email'),
  password: z.string().describe('Password'),
})

export type LoginFormInput = z.infer<typeof schema>
