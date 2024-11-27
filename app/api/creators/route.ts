import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: creators, error } = await supabaseAdmin
      .from('creators')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching creators:', error)
      return NextResponse.json({ error: 'Failed to fetch creators' }, { status: 500 })
    }

    return NextResponse.json({ creators })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 