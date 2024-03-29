import matter from 'gray-matter'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const postsDirectory = join(process.cwd(), 'src', 'app', 'wiki', '(posts)')

export function getAllPosts() {
    const slugs = readdirSync(postsDirectory)
    const posts = slugs.map((slug) => getPostBySlug(slug.replace('.mdx', '')) as Exclude<ReturnType<typeof getPostBySlug>, null>)
    return posts.sort((a, b) => new Date(a.data.date) < new Date(b.data.date) ? 1 : -1)
}

export function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx?$/, '')

    const fullPath = join(postsDirectory, `${realSlug}.mdx`)
    try {
        const fileContents = readFileSync(fullPath)
        const mdx = matter(fileContents)
        return {
            ...mdx,
            slug: realSlug,
        }
    } catch (e) {
        console.log(e)
        return null
    }
}

export function getPostSlugs() {
    return readdirSync(postsDirectory)
}

export function genTOC(md: string) {
    const toc = md.match(/(^#{2,6} )(.*)/gm) ?? []
    return toc.map((t, i) => {
        const level = t.match(/#/g)!.length
        const title = t.replace(/#/g, '').trim()
        return `${'  '.repeat(level)}- [${title}](#toc-${i})`
    }).join('\n')
}

