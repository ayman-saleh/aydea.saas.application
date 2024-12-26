import { env } from 'env'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@acme/db'
import { mailer, render } from '@acme/email'
import ConfirmEmailAddressEmail from '@acme/email/confirm-email-address'
import ResetPasswordEmail from '@acme/email/reset-password'

import * as schema from './auth.sql'

export const auth = betterAuth({
  secret: env.AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    // Auto sign in after sign up
    autoSignIn: true,
    // Email can be confirmed after logging in
    requireEmailVerification: false,
    sendResetPassword: async (props) => {
      if (!env.RESEND_API_KEY) {
        console.log('[Auth] Reset password request', props)
        return
      }

      const html = await render(
        ResetPasswordEmail({
          resetUrl: props.url,
          user: {
            name: props.user.name,
            email: props.user.email,
          },
          token: props.token,
        }),
      )

      mailer.send({
        to: props.user.email,
        subject: 'Reset your password',
        html,
      })
    },
  },
  emailVerification: {
    sendVerificationEmail: async (props) => {
      const html = await render(
        ConfirmEmailAddressEmail({
          confirmUrl: props.url,
          token: props.token,
        }),
      )

      mailer.send({
        to: props.user.email,
        subject: 'Confirm your email address',
        html,
      })
    },
  },
})
