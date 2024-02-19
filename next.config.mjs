import withMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

export default withMDX({
    options: {
        remarkPlugins: [remarkGfm],
    }
})({
    rewrites: async () => ([
        {
            source: '/images/movies/:path*',
            destination: `http${process.env.VERCEL_ENV==='development'?'':'s'}://${process.env.VERCEL_URL}/storage/v1/object/public/movies/images/:path*`
        },
        {
            source: '/images/covers/:path*',
            destination: `http${process.env.VERCEL_ENV==='development'?'':'s'}://${process.env.VERCEL_URL}/storage/v1/object/public/movies/covers/:path*`
        }
    ]),
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
