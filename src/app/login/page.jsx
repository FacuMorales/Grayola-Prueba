'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import "@/app/globals.css"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: perfil } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (perfil?.role === 'cliente') router.push('/dashboard/cliente')
        else if (perfil?.role === 'pm') router.push('/dashboard/pm')
        else if (perfil?.role === 'diseñador') router.push('/dashboard/diseñador')
      }
    }

    checkUser();
    
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100">
      <h1 className="text-4xl text-red-500 font-bold bg-yellow-300">LOGIN</h1>
    </div>
  )
}