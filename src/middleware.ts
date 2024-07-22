import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getLikeRole, getSessionPayload } from '@/lib/auth'
import { COOKIE } from '@/lib/constants'
import { cookies } from 'next/headers'
import { Role } from '@prisma/client'

export async function middleware(request: NextRequest) {
    const session = request.cookies.get(COOKIE.SESSION)?.value
    // auth
    if (request.nextUrl.pathname === '/system/login') {
        if (!session) return NextResponse.next()
        try {
            await getSessionPayload(session)
            return NextResponse.redirect(new URL(request.nextUrl.searchParams.get('redirect')??'/system', request.url))
        } catch (error) {
            if ((error as Error).message !== 'Invalid token') console.log('middleware error message', error)
            return NextResponse.next()
        }
    } else if (request.nextUrl.pathname === '/system/logout') {
        const res = NextResponse.redirect(new URL('/system/login', request.url))
        res.cookies.delete(COOKIE.SESSION)
        return res
    }
    if (!session) return NextResponse.redirect(new URL('/system/login?redirect='+request.nextUrl.pathname, request.url))
    try {
        const res = NextResponse.next()
        // validate n set correct role in cookie
        const {payload} = await getSessionPayload(session)
        const {role} = payload
        const like = getLikeRole(role, cookies().get(COOKIE.ADMIN_LIKE)?.value ?? '')
        res.cookies.set(COOKIE.ADMIN_LIKE, `${like}`)
        // validate n set correct cinema in cookie
        if (like !== Role.MASTER && payload.role === Role.MASTER) {
            const cinema_id = cookies().get(COOKIE.CINEMA_ID)?.value ?? ''
            // TODO: api?
        }
        return res
    } catch (error) {
        if ((error as Error).message !== 'Invalid token') console.log('middleware error message', error)
        return NextResponse.redirect(new URL('/system/login?redirect='+request.nextUrl.pathname, request.url))
    }

}

export const config = {
    matcher: '/(system.*)',
}
