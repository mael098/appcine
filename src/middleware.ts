import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getLikeRole, getSessionPayload } from '@/lib/auth'
import { COOKIE } from '@/lib/constants'
import { cookies } from 'next/headers'

let count = 0
export async function middleware(request: NextRequest) {
    const c = count++
    console.log('middleware', c)

    const session = request.cookies.get(COOKIE.SESSION)?.value
    // auth
    if (request.nextUrl.pathname === '/system/login') {
        console.log('login', c)

        if (!session) return NextResponse.next()
        console.log('login session', c)

        try {
            await getSessionPayload(session)
            return NextResponse.redirect(new URL(request.nextUrl.searchParams.get('redi')??'/system', request.url))
        } catch (error) {
            if ((error as Error).message !== 'Invalid token') console.log('middleware error message', error)
            return NextResponse.next()
        }
    } else if (request.nextUrl.pathname === '/system/logout') {
        const res = NextResponse.redirect(new URL('/system/login', request.url))
        res.cookies.delete(COOKIE.SESSION)
        return res
    }
    console.log('other', c)

    if (!session) return NextResponse.redirect(new URL('/system/login?redi='+request.nextUrl.pathname, request.url))
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
        return NextResponse.redirect(new URL('/system/login?redi='+request.nextUrl.pathname, request.url))
    }

}

export const config = {
    matcher: '/(system.*)',
}
