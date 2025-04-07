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

  const data = await fetch(`${baseURL}/api/auth/get-session`, {
    headers: {
      //get the cookie from the request
      cookie: request.headers.get('cookie') || ''
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        return null
      }
      return res.json()
    })
    .catch(() => null)
  return data as Session
}

interface BetterAuthRequest extends NextRequest {
  auth: Session
}

type BetterAuthMiddleware = (
  request: BetterAuthRequest,
  event: NextFetchEvent,
) => NextResponse