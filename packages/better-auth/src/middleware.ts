import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server'

import { auth as authConfig } from './auth'

type Session = typeof authConfig.$Infer.Session

/**
 * Edge compatible middleware
 * @see https://www.better-auth.com/docs/integrations/next#middleware
 */
export function auth(middleware: BetterAuthMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const session = await getSession(request)

    const augmentedReq = request as BetterAuthRequest
    augmentedReq.auth = session

    return await middleware(augmentedReq, event)
  }
}

async function getSession(request: NextRequest) {
  const baseURL = request.nextUrl.origin

  const response = await fetch(`${baseURL}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get('cookie') || ''
    },
  });
  try {
    const data = await response.json();
    return data; // Return the parsed JSON
  } catch (e) {
    console.error('Error parsing session data:', e);
    return null;
  }
}

interface BetterAuthRequest extends NextRequest {
  auth: Session
}

type BetterAuthMiddleware = (
  request: BetterAuthRequest,
  event: NextFetchEvent,
) => NextResponse