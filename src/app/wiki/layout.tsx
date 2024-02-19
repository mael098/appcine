import { getAllPosts } from '@/lib/wiki'
import Link from 'next/link'
import { ReactNode } from 'react'

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
                <nav className="bg-black p-2 max-h-12 min-h-12 text-white flex justify-between items-center">
                    <label>
                        menu
                        <input type="checkbox" className='hidden' />
                    </label>
                    <div className='flex gap-4 flex-1 justify-end'>
                        <Link href={'/app'}>App</Link>
                        <Link href={'/wiki'}>Wiki</Link>
                        <Link href={'/changelog'}>Changelog</Link>
                    </div>
                </nav>
                <div className="bg-white flex-1 flex">
                    <nav className='p-4 transition-all ease-in-out overflow-hidden w-fit max-w-64 flex flex-col'>
                        <Link href={'/wiki'}> welcome </Link>
                        {posts.map((post) =>
                            <Link key={post.slug} href={`/wiki/${post.slug}`}>
                                {post.data.title}
                            </Link>
                        )}
                    </nav>
                    <main className='bg-gray-900 flex-1 h-full text-white'>{children}</main>
                </div>
            </div>
        </>
    )
}
