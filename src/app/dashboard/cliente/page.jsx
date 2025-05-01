import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/app/services/supabaseServer'
import { validateUserRole } from '@/helpers/validateUserRole'
import { getProjectsByRole } from '@/helpers/getProjectsByRole'
import { getDesigners } from '@/helpers/getDesigners'
import ClienteContent from './clienteContent'

export default async function Cliente() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const valid = await validateUserRole(supabase, user.id, 'cliente')
  if (!valid) {
    redirect('/dashboard')
  }

  const projects = await getProjectsByRole(supabase, user.id, 'cliente')

  const designers = await getDesigners(supabase)

  return(
    <ClienteContent email={user.email} id={user.id} projects={projects} designers={designers} />
  )
}
