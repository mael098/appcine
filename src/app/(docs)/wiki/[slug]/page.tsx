import { MDXRemote } from 'next-mdx-remote/rsc'
import { genTOC, getAllPosts, getPostBySlug } from '@/lib/wiki'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function RemoteMdxPage({ params }: { params: { slug: string } }) {
    const rmd = getPostBySlug(params.slug)
    // console.log(rmd)
    if (!rmd) return notFound()
    const toc = genTOC(rmd.content)
    let tocid = 0
    const allPosts = getAllPosts()
    const allPostsSlugs = allPosts.map(p => p.slug)
    const idx = allPostsSlugs.indexOf(params.slug)

    return <div className='flex h-full'>
        <div className='p-8 pt-0'>
            <h1 className='mb-0'>{rmd.data.title}</h1>
            <small>by {rmd.data.author} - {rmd.data.date}</small>
            <MDXRemote source={rmd.content} components={{
                h2: (props) => <h2 id={`toc-${tocid++}`} {...props} />,
                h3: (props) => <h3 id={`toc-${tocid++}`} {...props} />,
                h4: (props) => <h4 id={`toc-${tocid++}`} {...props} />,
                h5: (props) => <h5 id={`toc-${tocid++}`} {...props} />,
                h6: (props) => <h6 id={`toc-${tocid++}`} {...props} />,
            }} />
            <footer className='bg-gray-700 flex justify-between flex-row'>
                <Link className='border' href={idx?`/wiki/${allPostsSlugs[idx-1]}`:'/wiki'}>
                    <div>
                        <span>Back</span>
                        <span>{idx?allPosts[idx-1].data.title:'welcome'}</span>
                    </div>
                </Link>
                <span className='flex-1'></span>
                {idx < allPosts.length-1
                    ? <Link className='border' href={`/wiki/${allPostsSlugs[idx+1]}`}>
                        <div>
                            <span>Next</span>
                            <span>{allPosts[idx+1].data.title}</span>
                        </div>
                    </Link>
                    : <></>}
            </footer>
        </div>
        <aside className='flex flex-col bg-gray-600 min-w-44'>
            <MDXRemote source={toc} components={{
                ul: (props) => <ul className='p-2 text-sm' {...props} />,
            }} />
        </aside>
    </div>
}
