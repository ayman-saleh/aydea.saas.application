import { createAuthService } from '@acme/auth-authjs/client'

// import {
//   createAuthService,
//   createSupabaseBrowserClient,
// } from '@acme/auth-supabase/client'

// export const supabase = createSupabaseBrowserClient()

// export const authService = createAuthService(supabase, {
//   loginOptions: {
//     redirectTo: '/auth/callback',
//   },
//   signupOptions: {
//     emailRedirectTo: '/auth/callback',
//   },
// })

export const authService = createAuthService()
