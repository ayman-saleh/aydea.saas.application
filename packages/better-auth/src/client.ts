'use client'

import type { AuthProviderProps } from '@saas-ui/auth-provider'
import type { User } from 'better-auth'
import { createAuthClient } from 'better-auth/react'
import type { SocialProvider } from 'better-auth/social-providers'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
})

export function createAuthService() {
  return {
    onLogin: async (
      params: {
        provider?: string
        email?: string
        password?: string
      },
      options?: {
        redirectTo?: string
      },
    ) => {
      const redirectTo = options?.redirectTo ?? '/'

      if (params.provider) {
        await authClient.signIn.social({
          provider: params.provider as SocialProvider,
          callbackURL: redirectTo,
        })
        return null
      } else if (params.email && params.password) {
        const { data, error } = await authClient.signIn.email({
          email: params.email,
          password: params.password,
          callbackURL: redirectTo,
        })

        if (error) {
          throw new Error('Invalid email or password', {
            cause: error,
          })
        }

        return data.user
      }

      throw new Error('Invalid parameters')
    },
    onSignup: async (
      params: {
        provider?: string
        name?: string
        email?: string
        password?: string
      },
      options?: {
        redirectTo?: string
      },
    ) => {
      const redirectTo = options?.redirectTo ?? '/'

      if (params.provider) {
        await authClient.signIn.social({
          provider: params.provider as SocialProvider,
          callbackURL: redirectTo,
        })
        return null
      } else if (params.email && params.password) {
        const { data, error } = await authClient.signUp.email({
          email: params.email,
          name: params.name ?? '',
          password: params.password,
          callbackURL: redirectTo,
        })

        if (error) {
          throw new Error('Invalid email or password', {
            cause: error,
          })
        }

        return data.token
      }

      throw new Error('Invalid parameters')
    },
    onResetPassword: async (
      params: { email: string },
      options?: {
        redirectTo?: string
      },
    ) => {
      const { data, error } = await authClient.forgetPassword({
        email: params.email,
        redirectTo: options?.redirectTo,
      })

      if (error) {
        throw new Error('Could not send reset email', {
          cause: error,
        })
      }

      return data
    },
    onUpdatePassword: async (params: { password: string; token: string }) => {
      const { data, error } = await authClient.resetPassword({
        newPassword: params.password,
        token: params.token,
      })

      if (error) {
        const message =
          error.code === 'INVALID_TOKEN'
            ? 'Token is invalid or expired'
            : 'Could not reset password'

        throw new Error(message, {
          cause: error,
        })
      }

      return data
    },
    onLogout: async () => {
      return await authClient.signOut()
    },
    onLoadUser: async () => {
      const session = await authClient.getSession()

      return session?.data?.user ?? null
    },
  } satisfies AuthProviderProps<User>
}
