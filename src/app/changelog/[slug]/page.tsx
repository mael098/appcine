/* eslint-disable @next/next/no-img-element */
import { MDXRemote } from 'next-mdx-remote/rsc'
import { genTOC, getPostBySlug } from '@/lib/changelog'
import { notFound } from 'next/navigation'

export default async function RemoteMdxPage({ params }: { params: { slug: string } }) {
    const rmd = getPostBySlug(params.slug)

    if (!rmd) return notFound()
    const toc = genTOC(rmd.content)
    let tocid = 0

    return <div id='changelog' className='flex h-full'>
        <div className='p-8 pt-0'>
            <h1 className='mb-0'>{rmd.data.title}</h1>
            <small>by {rmd.data.author} - {rmd.data.date}</small>
            <div className='bg-no-repeat bg-cover bg-center aspect-video h-80 w-full' style={{backgroundImage: `url('${rmd.data.image??'/tohru.png'}')`}}></div>
            <MDXRemote source={rmd.content} components={{
                h2: (props) => <h2 id={`toc-${tocid++}`} {...props} />,
                h3: (props) => <h3 id={`toc-${tocid++}`} {...props} />,
                h4: (props) => <h4 id={`toc-${tocid++}`} {...props} />,
                h5: (props) => <h5 id={`toc-${tocid++}`} {...props} />,
                h6: (props) => <h6 id={`toc-${tocid++}`} {...props} />,
            }} />
        </div>
        <aside className='flex flex-col bg-gray-600 min-w-44'>
            <MDXRemote source={toc} components={{
                ul: (props) => <ul className='p-2 text-sm' {...props} />,
            }} />
        </aside>
    </div>
}
