import Link from 'next/link'
import { ReactNode } from 'react'
import './global.css'

export default function WikiLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {

    return (
        <>
            <div id='ly' className="w-screen h-screen flex flex-col overflow-x-hidden">
                <nav className="bg-black p-2 max-h-12 min-h-12 text-white flex items-center">
                    <Link id='back' className='px-2' href={'/changelog'}>{'<= back'}</Link>
                    <div className='flex-1 flex gap-4 justify-end'>
                        <Link href={'/app'}>App</Link>
                        <Link href={'/wiki'}>Wiki</Link>
                        <Link href={'/changelog'}>Changelog</Link>
                    </div>
                </nav>
                <main className='bg-gray-900 flex-1 h-full text-white lg:px-64 xl:px-72 2xl:px-96'>{children}</main>
            </div>
        </>
    )
}
