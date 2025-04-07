import { TRPCError } from '@trpc/server'

export const assertWorkspaceAccess = (
  workspaceId: string | undefined,
  userId: string,
) => {
  if (!workspaceId) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Workspace ID is required',
    })
  }
  else if (!userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User ID is required',
    })
  }
  // Add additional workspace access checks as needed
}
