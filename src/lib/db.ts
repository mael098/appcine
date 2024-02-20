import {createClient} from '@supabase/supabase-js'
import {Database} from './supabaseTypes'
// import {Snowflake} from '@sapphire/snowflake'

const supabaseUrl = process.env.NEXT_SUPABASE_URL
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
// const snowflakeDate = new Date(process.env.NEXT_SNOWFLAKE_DATE??'2024-02-05')
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing env variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
