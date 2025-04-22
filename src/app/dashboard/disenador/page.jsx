import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/app/services/supabaseServer'
import { validateUserRole } from '@/helpers/validateUserRole'
import DiseñadorContent from './disenadorContent'
import Header from '@/app/components/Header'

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

  return(
    <section>
      <Header/>
      <DiseñadorContent email={user.email} />
    </section>
  )
}
