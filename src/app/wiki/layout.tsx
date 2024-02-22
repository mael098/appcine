import { getAllPosts } from '@/lib/wiki'
import Link from 'next/link'
import { ReactNode } from 'react'
import Nav from './Menu'

export default function WikiLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const posts = getAllPosts()
    // console.log(posts)

    return (
        <>
            <div className="ly w-screen h-screen flex flex-col overflow-x-hidden">
                <Nav/>
                <main className='bg-[#1b1b1d] h-full flex flex-row'>{children}</main>
            </div>
        </>
    )
}
