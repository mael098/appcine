import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionPayload } from '@/lib/auth'
import { COOKIE } from '@/lib/constants'
import { getLikeRole } from '@/lib/roles'
import { cookies } from 'next/headers'

const MasterRoutes = []
const AdminRoutes = ['/new/room']

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
        // validate n set correct role in cookie
        const {payload} = await getSessionPayload(session)
        const {role} = payload
        const like = getLikeRole(role, cookies().get(COOKIE.ADMIN_LIKE)?.value ?? '')
        const res = NextResponse.next()
        res.cookies.set(COOKIE.ADMIN_LIKE, `${like}`)
        return res
    } catch (error) {
        if ((error as Error).message !== 'Invalid token') console.log('middleware error message', error)
        return NextResponse.redirect(new URL('/system/login?redirect='+request.nextUrl.pathname, request.url))
    }

}

export const config = {
    matcher: '/(system.*)',
}
