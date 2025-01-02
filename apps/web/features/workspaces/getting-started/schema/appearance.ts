import * as z from 'zod'

export const schema = z.object({})
export type AppearanceFormInput = z.infer<typeof schema>
