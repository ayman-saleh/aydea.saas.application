import { eq } from 'drizzle-orm'

import { accounts } from '@acme/better-auth'
import { db } from '@acme/db'

import { AuthAccountsDTO } from './auth.schema'

export const accountById = async (id: AuthAccountsDTO['id']) => {
  const account = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, id))
    .limit(1)

  if (!account) {
    return null
  }

  return account.at(0)
}
