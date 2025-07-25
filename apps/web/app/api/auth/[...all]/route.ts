import { handlers } from '@acme/better-auth'

const { GET: originalGET, POST: originalPOST } = handlers

export const GET = async (request: Request) => {
  try {
    return await originalGET(request)
  } catch (error) {
    console.error('Auth GET Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const POST = async (request: Request) => {
  try {
    return await originalPOST(request)
  } catch (error) {
    console.error('Auth POST Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
