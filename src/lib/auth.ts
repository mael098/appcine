import { jwtVerify } from 'jose'
import { JWT_SECRET } from './constants'

/**
 *
 * @param {string} token
 * @returns {Promise<JWTVerifyResult<{cinema_id: string;created_at: string;id: string;name: string;active: boolean;role: number;email: string;exp: number;}>>}
 * @throws {Error} invalid token
 */
export async function getSessionPayload(token: string) {
    try {
        const payload = await jwtVerify<{
            cinema_id:string,
            created_at:string,
            id:string,
            name:string,
            active:boolean,
            role:number,
            email:string,
            exp:number
        }>(token, JWT_SECRET)
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