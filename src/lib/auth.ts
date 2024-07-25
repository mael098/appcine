import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { COOKIE, JWT_SECRET } from './constants'
import { employees, Role } from '@prisma/client'
import { redirect } from 'next/navigation'

/**
 *
 * @param {string} token
 * @returns {Promise<JWTVerifyResult<{cinema_id: string;created_at: string;id: string;name: string;active: boolean;role: number;email: string;exp: number;}>>}
 * @throws {Error} invalid token
 */
export async function getSessionPayload(token: string) {
    try {
        const payload = await jwtVerify<employees>(token, JWT_SECRET)
        return payload
    } catch (error) {
        if (error instanceof Error && (
            error.message.includes('JWS Protected Header is invalid') ||
            error.message.includes('signature verification failed') ||
            error.message.includes('timestamp check failed')
        )) {
            throw new Error('Invalid token', {cause: error.message})
        } else {
            throw error
        }
    }
}

export async function getAuthenticatedUser() {
    const token = cookies().get(COOKIE.SESSION)?.value
    console.log()

    if (!token) return redirect('/system/login')
    try {
        return (await getSessionPayload(token)).payload
    } catch {
        redirect('/system/login')
    }
}

export async function onlyRole(role: Role) {
    const user = await getAuthenticatedUser()
    const like = getLikeRole(user.role, cookies().get(COOKIE.ADMIN_LIKE)?.value ?? '')
    if (like !== role) return redirect('/system')
}

const ROLE_VALUE = {
    [Role.MASTER]: 3,
    [Role.ADMIN]: 2,
    [Role.PROMOTER]: 1,
    [Role.SELLER]: 0
}

export function getLikeRole(base: Role, like: string): Role {
    if (!(<string[]>Object.values(Role)).includes(like)) return base
    const likeValue = ROLE_VALUE[like as Role]
    const baseValue = ROLE_VALUE[base]
    if (likeValue <= baseValue) return like as Role
    return base
}

export function getLikeRoleProbables(base: Role): Role[] {
    return Object.values(Role).filter(role => ROLE_VALUE[role] <= ROLE_VALUE[base])
}