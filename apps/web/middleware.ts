import { auth } from '@acme/auth-authjs/middleware'

export default auth

// In case you need more control you can wrap the middleware like this:
// export default auth((req) => {
//   console.log(req.auth) // { user: { ... } }
// })

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|favicons|img$).*)',
  ],
}
