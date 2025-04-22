import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/app/services/supabaseServer'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Obtener el rol del usuario desde la base de datos
  const { data: userData, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !userData) {
    // Manejo simple en caso de error o usuario sin rol
    redirect('/login')
  }

  // Redirigir según el rol
  switch (userData.role) {
    case 'cliente':
      redirect('/dashboard/cliente')
    case 'pm':
      redirect('/dashboard/pm')
    case 'diseñador':
      redirect('/dashboard/disenador')
    default:
      redirect('/login') // o página de error
  }
}