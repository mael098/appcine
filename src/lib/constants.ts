export const DEV = process.env.NODE_ENV === 'development'

export const NEXT_URL = `http${DEV?'':'s'}://${process.env.VERCEL_URL}` as const

export const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_JWT_SECRET!)

export const ROLE = {
    ADMIN: 1,
    PROMOTER: 2,
    TIKETMAN: 3,
} as const

export const ROLES_NAME = {
    [ROLE.ADMIN]: 'Admin',
    [ROLE.PROMOTER]: 'Promoter',
    [ROLE.TIKETMAN]: 'Ticket Man',
} as const

export type Role = typeof ROLE[keyof typeof ROLE]

export const COOKIE = {
    SESSION: 'session'
}