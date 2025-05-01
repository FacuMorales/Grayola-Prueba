import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/app/services/supabaseServer'
import { validateUserRole } from '@/helpers/validateUserRole'
import { getProjectsByRole } from '@/helpers/getProjectsByRole'
import { getDesigners } from '@/helpers/getDesigners'
import DiseñadorContent from './disenadorContent'

export default async function Diseñador() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const valid = await validateUserRole(supabase, user.id, 'diseñador')
  if (!valid) {
    redirect('/dashboard')
  }

  const projects = await getProjectsByRole(supabase, user.id, 'diseñador')

  const designers = await getDesigners(supabase)

  return(
    <DiseñadorContent email={user.email} projects={projects} designers={designers} />
  )
}
