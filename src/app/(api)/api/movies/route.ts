import { supabase } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const movies = await supabase.from('movies').select('*')
    if (movies.error) {
        return new NextResponse(JSON.stringify({status: 500, body: 'Error fetching movies'}), { status: 500 })
    }
    return new NextResponse(JSON.stringify(movies.data), { status: 200 })
}
