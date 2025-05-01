import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/app/services/supabaseServer'
import { validateUserRole } from '@/helpers/validateUserRole'
import { getProjectsByRole } from '@/helpers/getProjectsByRole'
import { getDesigners } from '@/helpers/getDesigners'
import PmContent from './pmContent'

export default async function ProjectManager() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const valid = await validateUserRole(supabase, user.id, 'pm')
  if (!valid) {
    redirect('/dashboard')
  }

  const projects = await getProjectsByRole(supabase, user.id, 'pm')

  const designers = await getDesigners(supabase)

  return(
    <PmContent email={user.email} projects={projects} id={user.id} designers={designers} />
  )
}
