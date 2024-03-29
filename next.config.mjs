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
            destination: `${process.env.NEXT_SUPABASE_URL}/storage/v1/object/public/movies/images/:path*`,
            basePath: false
        },
        {
            source: '/images/covers/:path*',
            destination: `${process.env.NEXT_SUPABASE_URL}/storage/v1/object/public/movies/covers/:path*`,
            basePath: false
        }
    ]),
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})

if (!process.env.NEXT_JWT_SECRET) {
    throw new Error('missing NEXT_JWT_SECRET')
}