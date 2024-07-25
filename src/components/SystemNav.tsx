import Link from 'next/link'
import Image from 'next/image'
import { SystemNavLikeRole } from './SystemNavLikeRole'
import { getLikeRoleProbables, getSessionPayload } from '@/lib/auth'
import { cookies } from 'next/headers'
import { COOKIE } from '@/lib/constants'
import { Role } from '@prisma/client'

export interface NavOptions {
    name: string,
    link: string
}
export interface SystemNavProps {
    options: NavOptions[]
}
export async function SystemNav(prop: SystemNavProps) {
    const { payload } = await getSessionPayload(cookies().get(COOKIE.SESSION)?.value ?? '').catch(() => ({ payload: null }))

    return (
        <nav className="flex bg-[#3BCC52] h-16 p-2 justify-between items-center px-4">
            <div className="flex items-center gap-4 text-white">
                <Link href='/system'>
                    <Image src='/logo.png' alt='logo' width={48} height={48} className="h-full" />
                </Link>
                {prop.options.map((option, i) => (
                    <Link href={option.link} key={i}>
                        {option.name}
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <SystemNavLikeRole roles={getLikeRoleProbables(payload?.role??Role.SELLER)} />
                <Link href='/system/logout'>
                    <svg className="w-8" fill="#000000" viewBox="0 0 56 56">
                        <path d="M54.424,28.382c0.101-0.244,0.101-0.519,0-0.764c-0.051-0.123-0.125-0.234-0.217-0.327L42.208,15.293,c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L51.087,27H20.501c-0.552,0-1,0.447-1,1s0.448,1,1,1h30.586L40.794,39.293,c-0.391,0.391-0.391,1.023,0,1.414C40.989,40.902,41.245,41,41.501,41s0.512-0.098,0.707-0.293l11.999-11.999,C54.299,28.616,54.373,28.505,54.424,28.382z" />
                        <path d="M36.501,33c-0.552,0-1,0.447-1,1v20h-32V2h32v20c0,0.553,0.448,1,1,1s1-0.447,1-1V1c0-0.553-0.448-1-1-1h-34,c-0.552,0-1,0.447-1,1v54c0,0.553,0.448,1,1,1h34c0.552,0,1-0.447,1-1V34C37.501,33.447,37.053,33,36.501,33z" />
                    </svg>
                </Link>
            </div>
        </nav>
    )
}
