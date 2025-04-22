import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/app/services/supabaseServer'
import { validateUserRole } from '@/helpers/validateUserRole'
import PmContent from './pmContent'
import Header from '@/app/components/Header'

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

  return(
    <section>
      <Header/>
      <PmContent email={user.email} />
    </section>
  )
}
