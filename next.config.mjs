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
            destination: `${process.env.NEXT_SUPABASE_URL}/storage/v1/object/public/movies/images/:path*`
        },
        {
            source: '/images/covers/:path*',
            destination: `${process.env.NEXT_SUPABASE_URL}/storage/v1/object/public/movies/covers/:path*`
        }
    ]),
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
console.log(
    `${process.env.NEXT_SUPABASE_URL}/storage/v1/object/public/movies/images/:path*`
)