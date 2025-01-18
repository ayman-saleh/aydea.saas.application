import { authService } from '#modules/auth/index'
import { userService } from '#modules/users/index'
import { TRPCError, createTRPCRouter, protectedProcedure } from '#trpc'

export const authRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Not logged in',
      })
    }

    let me = await userService.userById(ctx.session.user.id)

    // When using Supabase you should use a trigger function
    // instead to create the user in your public schema.
    if (!me) {
      me = await userService.createUser({
        id: ctx.session.user.id,
        email: ctx.session.user.email,
        name: ctx.session.user.name,
      })
    }

    const authAccount = await authService.accountById(ctx.session.user.id)

    // This should never happen
    if (!authAccount) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Auth account not found',
      })
    }

    return {
      authAccount: {
        provider: authAccount?.providerId,
        updatedAt: authAccount?.updatedAt || authAccount?.createdAt,
      },
      ...me,
    }
  }),
})
