'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/services/supabaseClient'
import { getUserRole } from '@/helpers/validateUserRole';
import "@/app/globals.css"

export default function Confirm() {

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
  
      if (session) {
        const role = await getUserRole(supabase, session.user.id);
        if (role) {
          router.push(`/dashboard/${role}`);
        }
      }
    };
  
    checkSession();
  }, []);  

  const handleIrALanding = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-cyan-200 to-gray-200">
      <div className="text-center p-10 bg-white rounded-3xl shadow-xl max-w-md">
        <img
          onClick={handleIrALanding}
          src="https://grayola.io/wp-content/uploads/2024/05/Grayola-Logo-SVG.svg"
          alt="grayola"
          className="w-42 mx-auto mb-6 cursor-pointer"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Confirmá tu correo!</h1>
        <p className="text-gray-600 mb-6">
          Te enviamos un link de confirmación a tu correo. Por favor revisalo y seguí las instrucciones para activar tu cuenta.
        </p>
        <div className="flex justify-center">
          <span className="inline-block px-6 py-2 rounded-full bg-[#9AFF1A] text-black font-semibold shadow-md shadow-black">
            Esperando confirmación...
          </span>
        </div>
      </div>
    </div>
  );
}