import { z } from 'zod'

export function createEnv<Schema extends z.AnyZodObject>(
  schema: Schema,
  clientEnv?: Record<string, string>,
): z.infer<Schema> {
  const result = schema.safeParse({
    ...process.env,
    ...clientEnv,
  })

  if (!result.success) {
    throw new Error(
      'Invalid environment variables:\n' +
        result.error.errors
          .map((error) => `❗'${error.path['0']}' ${error.message}`)
          .join('\n'),
    )
  }

  return result.data
}
