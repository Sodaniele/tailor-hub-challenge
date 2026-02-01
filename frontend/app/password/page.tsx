'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

function PasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const username = searchParams.get('username') || '';
  
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return alert("Escribe una contraseña");
    setLoading(true);

    try {
     await axios.post('http://localhost:4000/api/auth/register', {
        username: username,
        password: password,
        email: email
      });

      alert("¡Registro completado con éxito!");
      router.push('/login'); 
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-white p-2 pb-10 flex gap-2 font-sans overflow-hidden relative">
      <div className="w-1/2 h-full flex flex-col justify-end pl-2">
        <form onSubmit={handleFinish} className="bg-[#2F54EB] w-full rounded-[32px] p-8 md:p-10 shadow-2xl text-white relative z-10">
          <div className="flex flex-col items-start gap-6 mb-6">
            <img src="/full-logo.png" alt="Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            <Link href="/signin" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-light ml-1 block">
                Crea una contraseña para finalizar:
              </label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Añade una contraseña"
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-all"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="bg-white text-[#2F54EB] px-12 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md disabled:opacity-50"
              >
                {loading ? 'REGISTRANDO...' : 'FINALIZAR'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="w-1/2 h-full rounded-[32px] overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" alt="Restaurant" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <p className="absolute bottom-3 left-6 text-[10px] text-gray-400 font-medium tracking-tight">
        Prueba técnica ©Tailor hub SL 2019 - 2026
      </p>
    </div>
  );
}


export default function PasswordPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-white" />}>
      <PasswordForm />
    </Suspense>
  );
}