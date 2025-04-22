import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/app/services/supabaseServer'
import { validateUserRole } from '@/helpers/validateUserRole'
import ClienteContent from './clienteContent'
import Header from '@/app/components/Header'

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

  return(
    <section>
      <Header/>
      <ClienteContent email={user.email} />
    </section>
  )
}
