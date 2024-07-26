import { readdir } from 'node:fs/promises'
const allFiles = await readdir('src/app', {
    recursive: true
})
const routes = allFiles.filter(file => file.endsWith('page.tsx'))
const parsed = routes.map(route => new URL(route.replace('page.tsx', ''), 'http://localhost').pathname)
// eslint-disable-next-line no-undef
function generateRoutes(routes) {
    const orderedRoutes = routes.sort().filter(route => route !== '/')
    let output = `const root = {
    \npath: '/',`
    const nroutes = {}
    for (const route of orderedRoutes) {
        const parts = route.split('/').filter(part => part !== '')
        let current = nroutes
        for (const part of parts) {
            if (!current[part]) {
                current[part] = {}
            }
            current = current[part]
        }
    }
    for (const [key, value] of Object.entries(nroutes)) {
        console.log(value)
        output += `\n${key}: {`
        output += '\n},'
    }
    output += '\n}'
    console.log(output)
}
generateRoutes(parsed)
