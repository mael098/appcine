import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionPayload } from './lib/auth'

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value
    if (request.nextUrl.pathname === '/system/login') {
        if (!session) return NextResponse.next()
        try {
            await getSessionPayload(session)
            return NextResponse.redirect(new URL(request.nextUrl.searchParams.get('redirect')??'/system', request.url))
        } catch (error) {
            if ((error as Error).message !== 'Invalid token') console.log('middleware error message', error)
            return NextResponse.next()
        }
    } else {
        if (!session) return NextResponse.redirect(new URL('/system/login?redirect='+request.nextUrl.pathname, request.url))
        try {
            await getSessionPayload(session)
            return NextResponse.next()
        } catch (error) {
            if ((error as Error).message !== 'Invalid token') console.log('middleware error message', error)
            return NextResponse.redirect(new URL('/system/login?redirect='+request.nextUrl.pathname, request.url))
        }
    }
}

export const config = {
    matcher: '/(system.*)',
}