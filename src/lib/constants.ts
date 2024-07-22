export const DEV = process.env.NODE_ENV === 'development'

export const NEXT_URL = `http${DEV?'':'s'}://${process.env.VERCEL_URL}` as const

export const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_JWT_SECRET!)

export const COOKIE = {
    SESSION: 'session',
    ADMIN_LIKE: 'admin-like',
    CINEMA_ID: 'cinema-id',
}