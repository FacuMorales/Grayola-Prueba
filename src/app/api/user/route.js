import { createSupabaseServerClient } from '@/app/services/supabaseServer' 
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return NextResponse.json({ user })
}