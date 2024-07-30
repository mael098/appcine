import { PrismaClient } from '@prisma/client'
import { Snowflake } from '@sapphire/snowflake'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { Database } from './s'

if (!process.env.NEXT_SUPABASE_SERVICE_ROLE) throw new Error('NEXT_SUPABASE_SERVICE_ROLE is not defined')
if (!process.env.NEXT_SUPABASE_URL) throw new Error('NEXT_SUPABASE_URL is not defined')

const snowflakeDate = new Date(process.env.NEXT_SNOWFLAKE_DATE ?? '2024-02-05')

export const snowflake = new Snowflake(snowflakeDate)

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient
let supabase: SupabaseClient<Database>

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
    supabase = createClient(
        process.env.NEXT_SUPABASE_URL as string,
        process.env.NEXT_SUPABASE_SERVICE_ROLE as string
    )
} else {
    // @ts-ignore
    if (!global.prisma) global.prisma = new PrismaClient()
    // @ts-ignore
    prisma = global.prisma
    // @ts-ignore
    if (!global.supabase) global.supabase = createClient(
        process.env.NEXT_SUPABASE_URL as string,
        process.env.NEXT_SUPABASE_SERVICE_ROLE as string
    )
    // @ts-ignore
    supabase = global.supabase
}
export {
    prisma,
    supabase
}