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

  // Add additional workspace access checks as needed
}
