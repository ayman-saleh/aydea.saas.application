import { cache } from 'react'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { toNextJsHandler } from 'better-auth/next-js'
import { headers as getHeaders } from 'next/headers'

import { db } from '@acme/db'

import * as schema from './auth.sql'
import { env } from './env'

export const auth = betterAuth({
  secret: env.AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async (props) => {
      console.log('Reset password request', props)
    },
  },
  session: {
    fields: {
      expiresAt: 'expires_at',
      userId: 'user_id',
      sessionToken: 'session_token',
    },
  },
  accounts: {
    fields: {
      accountId: 'account_id',
      refreshToken: 'refresh_token',
      accessToken: 'access_token',
      accessTokenExpiresAt: 'expires_at',
      idToken: 'id_token',
    },
  },
})

/**
 * Returns the session object, if the user is logged in.
 * Can be called in server components, the result is cached.
 */
export const getSession = cache(async () => {
  const headers = await getHeaders()
  return await auth.api.getSession({ headers })
})

export const handlers = toNextJsHandler(auth)
