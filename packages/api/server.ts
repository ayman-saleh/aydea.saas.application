import { createHTTPServer } from '@trpc/server/adapters/standalone'

import { corsOptions } from './utils/cors'

const server = createHTTPServer({
  router: appRouter,
  createContext,
  middleware: cors(corsOptions),
})
