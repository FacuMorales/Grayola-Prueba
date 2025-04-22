'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/services/supabaseClient'
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { getUserRole } from '@/helpers/validateUserRole';
import "@/app/globals.css"

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(''); // Para mostrar el error de login

  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const [isLoading, setIsLoading] = useState(false); // Para mostrar cargando en login/register

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

  const validateForm = () => {
    const newErrors = {
      email: formData.email ? '' : 'El nombre de usuario es obligatorio.',
      password: formData.password ? '' : 'La contraseña es obligatoria.',
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoginError('');
    setIsLoading(true);
  
    const { email, password} = formData;
  
    if (isLogin) {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        setLoginError('Email o contraseña incorrectos.');
        console.log(error.message);
      } else {
        router.push('/dashboard');
      }
  
    } else {
      // REGISTER
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (signUpError) {
        setLoginError(signUpError.message);
        setIsLoading(false);
        return;
      }
  
      const userId = data?.user?.id;
  
      if (userId) {
        const { error: insertError } = await supabase.from('users').insert([
          {
            id: userId,
            email,
            role: "cliente",
          },
        ]);
  
        if (insertError) {
          setLoginError('Error al registrar el usuario en la base de datos.');
          console.log(insertError.message);
          setIsLoading(false);
          return;
        }
  
        router.push('/login/confirm');
      }
    }

    setIsLoading(false);
  };

  const handleIrALanding = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="hidden w-5/12 bg-gradient-to-br from-yellow-100 via-cyan-200 to-white lg:block "></div>
        <div className="w-full p-16 px-12 lg:px-[75px] lg:w-7/12">
          <div className="flex justify-center">
            <img
              onClick={handleIrALanding}
              src="https://grayola.io/wp-content/uploads/2024/05/Grayola-Logo-SVG.svg"
              alt="grayola"
              width="50%"
              className='cursor-pointer'
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-6">
            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-700 font-bold"
              >
                Email
              </label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id='email'
                  type="text"
                  placeholder='Ingrese su email'
                  className={
                    'flex h-10 w-full bg-background px-3 py-2 focus-visible:outline-none pl-10 border-0 rounded-none border-b-2 border-[#BFBFBF]'
                  }
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    // Validar en tiempo real
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      email: e.target.value
                        ? ''
                        : 'El email es obligatorio.',
                    }));
                  }}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="password"
                className="text-sm text-gray-700 font-bold"
              >
                Contraseña
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Ingrese su contraseña'
                  className={
                    'flex h-10 w-full bg-background px-3 py-2 focus-visible:outline-none pl-10 border-0 rounded-none border-b-2 border-[#BFBFBF]'
                  }
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      password: e.target.value
                        ? ''
                        : 'La contraseña es obligatoria.',
                    }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Alternar el estado
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Mostrar el error del login */}
            {loginError && (
              <p className="text-xs text-red-500 mt-2">{loginError}</p>
            )}

            <button
              type="submit"
              className={`font-semibold px-6 py-3 rounded-full border border-black transition mt-6
                ${!formData.email || !formData.password
                  ? 'bg-[#9AFF1A] opacity-50 text-gray-500 cursor-not-allowed'
                  : 'bg-[#9AFF1A] text-black shadow-black shadow-lg hover:bg-[#D06CFF] cursor-pointer'}
              `}
              disabled={ !formData.email || !formData.password || isLoading}
            >
              {isLoading ? 'Cargando...' : (isLogin ? "Iniciar Sesión" : "Registrarse")}
            </button>
            
            <p className="mt-4 text-sm text-center text-gray-600">
              {isLogin ? '¿No tenés cuenta?' : '¿Ya tenés cuenta?'}{' '}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                {isLogin ? 'Registrate' : 'Iniciar sesión'}
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}