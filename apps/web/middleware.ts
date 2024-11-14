import { auth } from '@acme/auth-authjs/middleware'

const publicRoutes = ['/login', '/signup']

export default auth((req) => {
  if (!req.auth && !publicRoutes.includes(req.nextUrl.pathname)) {
    const redirectTo = new URL(req.nextUrl.pathname, req.nextUrl.origin)
    const newUrl = new URL('/login', req.nextUrl.origin)
    newUrl.searchParams.set('callbackUrl', redirectTo.toString())
    return Response.redirect(newUrl)
  }
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|_next/static|_next/image|static|img|favicons|favicon.ico|sitemap.xml|robots.txt$).*)',
  ],
}
