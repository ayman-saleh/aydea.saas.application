import { TRPCError } from '@trpc/server'
import { headers } from 'next/headers'

/**
 * Validate CSRF token if needed
 */
export const validateCSRFToken = () => {
  // If using next-auth or similar, CSRF is usually handled for you
  // This is just an example of manual validation if needed
  const headersList = headers()
  const token = headersList.get('csrf-token')

  if (!token) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'CSRF token missing',
    })
  }
}

/**
 * Rate limiting helper (if needed)
 */
export const checkRateLimit = async (
  key: string,
  limit: number,
  windowMs: number,
) => {
  // Implement rate limiting logic here if needed
  // Could use Redis or similar for distributed rate limiting
  return {
    isRateLimited: false,
    remaining: Infinity,
    resetTime: new Date(Date.now() + windowMs),
    success: true,
  };
}

/**
 * Security headers helper
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}
