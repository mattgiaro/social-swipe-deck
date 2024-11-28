import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json([])
  }

  const { data, error } = await supabaseAdmin
    .from('creators')
    .select('*')
    .or(`name.ilike.%${query}%, x_handle.ilike.%${query}%, linkedin_handle.ilike.%${query}%, substack_handle.ilike.%${query}%`)
    .limit(5)

  if (error) {
    console.error('Search error:', error)
    return NextResponse.json([], { status: 500 })
  }

  return NextResponse.json(data)
} 