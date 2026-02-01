'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
// 1. Importamos el Hook del estado global
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  // 2. Extraemos la función login del contexto
  const { login } = useAuth();
  
  // 1. Estados para capturar los datos
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Función de Login Real
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // CAMBIO AQUÍ: Enviamos 'email' para que el backend lo reconozca
      const res = await axios.post('http://localhost:4000/api/auth/login', {
        email: username, 
        password: password
      });

      // Si el servidor responde OK 
      if (res.data.token) {
        // 3. Uso la función global para guardar usuario y token
        login(res.data.user, res.data.token);
        router.push('/restaurants'); 
      }
    } catch (error: any) {
      // Si la contraseña está mal, el backend devuelve 401 y cae aca
      alert(error.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-white p-2 pb-10 flex gap-2 font-sans overflow-hidden relative">
      
      {/* LADO IZQUIERDO: FORMULARIO */}
      <div className="w-1/2 h-full flex flex-col justify-end pl-2">
        {/* Cambiamos el div por un FORM para capturar el Enter del teclado */}
        <form onSubmit={handleLogin} className="bg-[#2F54EB] w-full rounded-[32px] p-8 md:p-10 shadow-2xl text-white relative z-10">
          
          <div className="mb-10">
            <img 
              src="/full-logo.png" 
              alt="Tailor Hub" 
              className="h-12 w-auto object-contain brightness-0 invert" 
            />
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase">Email:</label>
              <input 
                type="email" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Escribe tu email" 
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase">Contraseña:</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe tu contraseña" 
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" 
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="bg-white text-[#2F54EB] px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md disabled:opacity-70 flex items-center justify-center gap-2 min-w-[120px]"
              >
                {loading ? (
                  <>
                    {/* SVG del Spinner animado */}
                    <svg className="animate-spin h-4 w-4 text-[#2F54EB]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Cargando...</span>
                  </>
                ) : (
                  'Siguiente'
                )}
              </button>
            </div>

            <div className="text-[10px] mt-4 font-medium">
              <span className="text-white/70">¿No tienes cuenta? </span>
              <Link href="/signin" className="text-white underline hover:text-gray-200 transition-colors">
                Regístrate
              </Link>
            </div>
          </div>
        </form>
      </div>

      {/* LADO DERECHO: IMAGEN DE FONDO */}
      <div className="w-1/2 h-full rounded-[32px] overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?q=80&w=1924&auto=format&fit=crop" 
          alt="Greenhouse Restaurant" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <p className="absolute bottom-3 left-6 text-[10px] text-gray-400 font-medium tracking-tight">
        Prueba técnica ©Tailor hub SL 2019 - 2026
      </p>
    </div>
  );
}