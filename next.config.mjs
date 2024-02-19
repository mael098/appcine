import withMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import { NEXT_URL } from '@/lib/constants'

export default withMDX({
    options: {
        remarkPlugins: [remarkGfm],
    }
})({
    rewrites: async () => ([
        {
            source: '/images/movies/:path*',
            destination: `${NEXT_URL}/storage/v1/object/public/movies/images/:path*`
        },
        {
            source: '/images/covers/:path*',
            destination: `${NEXT_URL}/storage/v1/object/public/movies/covers/:path*`
        }
    ]),
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
