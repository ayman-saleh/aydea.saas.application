import * as z from 'zod'

export const schema = z.object({
  newsletter: z.boolean(),
})

export type SubscribeFormInput = z.infer<typeof schema>
