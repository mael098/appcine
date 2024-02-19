import { supabase } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
    const functions = await supabase.rpc('get_available_functions_by_movie', { date: new Date().toISOString(), movie: params.slug })
    if (functions.error) return NextResponse.error()
    return new NextResponse(JSON.stringify(functions.data))
}