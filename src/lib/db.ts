import { PrismaClient } from '@prisma/client'
import { Snowflake } from '@sapphire/snowflake'

const snowflakeDate = new Date(process.env.NEXT_SNOWFLAKE_DATE??'2024-02-05')

export const snowflake = new Snowflake(snowflakeDate)

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    // @ts-ignore
    if (!global.prisma) global.prisma = new PrismaClient()
    // @ts-ignore
    prisma = global.prisma
}
export {
    prisma
}