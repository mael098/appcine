import { PrismaClient } from '@prisma/client'
import { Snowflake } from '@sapphire/snowflake'

const snowflakeDate = new Date(process.env.NEXT_SNOWFLAKE_DATE??'2024-02-05')

export const prisma = new PrismaClient()
export const snowflake = new Snowflake(snowflakeDate)