import { readFileSync } from 'fs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { join } from 'path'
import './github-markdown.css'
import { getAllPosts } from '@/lib/wiki'
import Link from 'next/link'

export default function Wiki() {
    const firstPost = getAllPosts()[0]
    const wki = readFileSync(join(process.cwd(), 'src', 'app', 'wiki', '[slug]', 'wiki.mdx'), 'utf-8')
    return <div className='p-8 pt-0'>
        <MDXRemote source={wki}/>
        <footer className='bg-gray-700 flex justify-between flex-row'>
            <span className='flex-1'></span>
            <Link className='border' href={`/wiki/${firstPost.slug}`}>
                <div>
                    <span>Next</span>
                    <span>{firstPost.data.title}</span>
                </div>
            </Link>
        </footer>
    </div>
}