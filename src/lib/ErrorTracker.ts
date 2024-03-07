// import { REST } from '@discordjs/rest'
import { DEV } from './constants'
// import { WebhooksAPI } from '@discordjs/core'
// const rest = new REST({version: '10' })
// process errors
process.on('unhandledRejection', (reason: Error, promise) => {
    if (DEV) return console.error('Unhandled Rejection at:', promise, 'reason:', reason)
    // new WebhooksAPI(rest).execute('','',{embeds: [
    //     {
    //         description: `Unhandled Rejection at: ${promise} reason: ${reason}`,
    //     }]})
})

process.on('uncaughtException', (error: Error) => {
    if (DEV) return console.error('Uncaught Exception:', error)
    // new WebhooksAPI(rest).execute('','',{embeds: [
    //     {
    //         description: `Uncaught Exception: ${error}`,
    //     }]})
})

process.on('warning', (warning: Error) => {
    if (DEV) return console.warn('Warning:', warning)
    // new WebhooksAPI(rest).execute('','',{embeds: [
    //     {
    //         description: `Warning: ${warning}`,
    //     }]})
})

process.on('multipleResolves', (type, promise, reason) => {
    if (DEV) return console.warn('Multiple Resolves:', type, promise, reason)
    // new WebhooksAPI(rest).execute('','',{embeds: [
    //     {
    //         description: `Multiple Resolves: ${type} ${promise} ${reason}`,
    //     }]})
})

export async function handleErrors(e: Error) {
    if (DEV) console.error(e)
    // new WebhooksAPI(rest).execute('','',{embeds: [
    //     {
    //         description: e.message,
    //     }]})
}