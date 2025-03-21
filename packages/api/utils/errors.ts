export class ServiceError extends Error {
  constructor(
    public code: string,
    message: string,
    public meta?: Record<string, unknown>,
  ) {
    super(message)
    this.name = 'ServiceError'
  }
}

export const handleServiceError = (error: unknown): never => {
  if (error instanceof ServiceError) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: error.message,
      cause: error,
    })
  }

  // Handle unexpected errors
  console.error(error)
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
  })
}
