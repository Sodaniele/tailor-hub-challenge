'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  
  // ESTADOS para capturar los datos iniciales
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username) return alert("Por favor, rellena ambos campos");
    
    // Pasamos el email y el username a la pantalla de password por la URL
    const query = new URLSearchParams({ email, username }).toString();
    router.push(`/password?${query}`);
  };

  return (
    <div className="h-screen w-full bg-white p-2 pb-10 flex gap-2 font-sans overflow-hidden relative">
      
      {/* LADO IZQUIERDO: FORMULARIO */}
      <div className="w-1/2 h-full flex flex-col justify-end pl-2">
        <form onSubmit={handleNext} className="bg-[#2F54EB] w-full rounded-[32px] p-8 md:p-10 shadow-2xl text-white relative z-10">
          
          <div className="flex flex-col items-start gap-6 mb-6">
            {/* LOGO */}
            <div>
              <img 
                src="/full-logo.png" 
                alt="Tailor Hub" 
                className="h-10 w-auto object-contain brightness-0 invert" 
              />
            </div>
            
            {/* BOTÓN VOLVER */}
            <Link href="/login" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          <div className="space-y-6">
            {/* CAMPO EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase">Email:</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Añade tu email" 
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" 
              />
            </div>

            {/* CAMPO NOMBRE */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase">Nombre de usuario:</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Añade tu nombre" 
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" 
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="bg-white text-[#2F54EB] px-10 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md"
              >
                SIGUIENTE
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* LADO DERECHO: IMAGEN DE FONDO (RECUPERADA) */}
      <div className="w-1/2 h-full rounded-[32px] overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" 
          alt="Restaurant Interior" 
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