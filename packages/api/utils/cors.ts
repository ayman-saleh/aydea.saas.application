import { type CorsOptions } from '@trpc/server/adapters/standalone'

const ALLOWED_ORIGINS = [
  // Add your frontend domains
  'https://app.yourdomain.com',
  'https://yourdomain.com',
  // Add development URLs if needed
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
]

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true)
      return
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc)
  methods: ['GET', 'POST', 'OPTIONS'], // tRPC typically only needs these methods
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-trpc-source', // Required for tRPC
    'trpc-batch-mode', // Required for tRPC batching
  ],
  maxAge: 86400, // Cache preflight requests for 24 hours
}
