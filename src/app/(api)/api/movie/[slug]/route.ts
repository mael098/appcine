import { supabase } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const functions = await supabase.from('movies').select('*').eq('id', params.slug)
    if (functions.error) return NextResponse.error()
    return new NextResponse(JSON.stringify(functions.data[0]))
}