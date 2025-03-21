import { z } from 'zod'

export const createValidationSchema = <T extends z.ZodType>(
  schema: T,
  options?: {
    stripUnknown?: boolean
  },
) => {
  return schema.transform((data, ctx) => {
    if (options?.stripUnknown) {
      // Remove unknown fields
      const known = schema.parse(data)
      return known
    }
    return data
  })
}

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
