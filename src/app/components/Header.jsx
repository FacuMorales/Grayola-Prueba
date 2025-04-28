'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '../services/supabaseClient'; 

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleIrALanding = () => {
    router.push('/');
  };

  return (
    <header className="flex justify-between items-center pt-6 pb-6 pr-24 pl-6 bg-gray-50 shadow-md">
      <div className="flex items-center">
        <img
            onClick={handleIrALanding}
            src="https://grayola.io/wp-content/uploads/2024/05/Grayola-Logo-SVG.svg"
            alt="grayola"
            width="100%"
            className='cursor-pointer h-12'
        />
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
      >
        Cerrar sesión
      </button>
    </header>
  );
}