import { z } from 'zod'

import { createInsertSchema, users } from '@acme/db'

const UserSchema = createInsertSchema(users)

export type UserDTO = z.infer<typeof UserSchema>

export const CreateUserSchema = createInsertSchema(users)

export const UpdateUserSchema = createInsertSchema(users)
