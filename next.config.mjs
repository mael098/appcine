import withMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

export default withMDX({
    options: {
        remarkPlugins: [remarkGfm],
    }
})({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
