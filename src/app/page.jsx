'use client'
import { useEffect } from 'react'
import { supabase } from '@/app/services/supabaseClient'
import './globals.css'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-cyan-200 to-white text-black">
      <header className="flex justify-between items-center p-6">
        <img
          src={
            'https://grayola.io/wp-content/uploads/2024/05/Grayola-Logo-SVG.svg'
          }
          alt={"grayola"}
          className="h-12"
        />
      </header>

      <main className="flex flex-col items-center text-center px-6 mt-20 font-[swear-display-cilati] max-w-5xl mx-auto">
        <h2 className="text-6xl md:text-7xl font-black leading-tight mb-6 tracking-wide">
          Aplicación web para <br /> gestión de proyectos <br /> de diseño
        </h2>
        <p className="max-w-xl text-xl mb-8 text-gray-700">
          Escalá y delegá todas las operaciones de diseño de forma rápida y sencilla, sin preocuparte por contratar o administrar recursos adicionales.
        </p>
        <a
          href="/login"
          className="bg-[#9AFF1A] shadow-black shadow-lg text-black font-semibold px-6 py-3 rounded-full border border-black hover:bg-[#D06CFF] transition"
        >
          Iniciar sesión
        </a>
      </main>
    </div>
  );
}
