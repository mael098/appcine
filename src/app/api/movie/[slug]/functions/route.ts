import { supabase } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const functions = await supabase.from('functions').select('*').eq('movie_id', params.slug).gte('start_at', new Date().toISOString())
    console.log(functions)

    if (functions.error) return NextResponse.error()
    return new NextResponse(JSON.stringify(functions.data))
}