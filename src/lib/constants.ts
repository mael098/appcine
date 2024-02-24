export const NEXT_URL = `http${process.env.VERCEL_ENV==='development'?'':'s'}://${process.env.VERCEL_URL}` as const

export const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_JWT_SECRET!)