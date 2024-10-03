'use client'

import {
  type SignInResponse,
  getSession,
  signIn,
  signOut,
} from 'next-auth/react'

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
      const callbackUrl = options?.redirectTo ?? '/'

      let response: SignInResponse | undefined

      if (params.provider) {
        response = await signIn(params.provider, {
          callbackUrl,
        })

        if (response?.error) {
          throw new Error('Failed to sign in with provider', {
            cause: response.error,
          })
        }
      } else if (params.email && params.password) {
        response = await signIn('credentials', {
          email: params.email,
          password: params.password,
          redirect: false,
          callbackUrl,
        })

        if (response?.error) {
          throw new Error('Invalid email or password', {
            cause: response.error,
          })
        }
      } else if (params.email) {
        response = await signIn('email', {
          email: params.email,
          redirect: false,
          callbackUrl,
        })

        if (response?.error) {
          throw new Error('Failed to send magic link', {
            cause: response.error,
          })
        }
      }

      if (response && !response?.ok) {
        throw new Error(response.error ?? 'Login failed')
      }

      if (!response) {
        throw new Error('Invalid parameters')
      }

      return null
    },
    onSignup: async () => {
      // return await signIn(params)

      return null
    },
    onLogout: async () => {
      return await signOut()
    },
    onLoadUser: async () => {
      const session = await getSession()

      return session?.user ?? null
    },
  }
}
