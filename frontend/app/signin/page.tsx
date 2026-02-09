'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username) return alert("Por favor, rellena ambos campos");
    const query = new URLSearchParams({ email, username }).toString();
    router.push(`/password?${query}`);
  };

  return (
    <div className="min-h-screen md:h-screen w-full bg-white p-6 md:p-12 flex items-center justify-center font-sans relative overflow-x-hidden">
      
      <div 
        className="h-full w-full flex flex-col md:flex-row md:items-end gap-4 md:gap-[40px] justify-center"
        style={{ maxWidth: '1648px' }}
      >
        
        {/* LADO IZQUIERDO: FORMULARIO */}
        <div 
          className="w-full md:w-1/2 h-full flex flex-col justify-end order-2 md:order-1 shrink-0"
          style={{ maxWidth: '804px' }}
        >
          <form 
            onSubmit={handleNext} 
            className="bg-[#2F54EB] w-full rounded-[32px] p-8 md:p-10 shadow-2xl text-white relative z-10"
            style={{ 
              height: '500px' 
            }} 
          >
            
            <div className="flex flex-col items-start gap-6 mb-6">
              <div>
                <img 
                  src="/full-logo.png" 
                  alt="Tailor Hub" 
                  style={{ width: '194px', height: '44px', objectFit: 'contain' }}
                  className="brightness-0 invert" 
                />
              </div>
              
              <Link 
                href="/login" 
                style={{ 
                  width: '92px', 
                  height: '60px', 
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                className="hover:bg-white/10 transition-colors"
              >
                <img 
                  src="/flecha.png" 
                  style={{ width: '24px', height: '24px', objectFit: 'contain' }} 
                />
              </Link>
            </div>

            <div className="space-y-6">
              {/* CAMPO EMAIL */}
              <div className="flex flex-col gap-2" style={{ maxWidth: '504px', width: '100%' }}>
                <label className="font-semibold text-[16px] uppercase ml-1">Email:</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Añade tu email" 
                  className="w-full h-[44px] bg-transparent border border-white/40 rounded-full px-6 text-white outline-none focus:border-white transition-all placeholder:text-white/50"
                />
              </div>

              {/* CAMPO NOMBRE */}
              <div className="flex flex-col gap-2" style={{ maxWidth: '504px', width: '100%' }}>
                <label className="font-semibold text-[16px] uppercase ml-1">Nombre de usuario:</label>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Añade tu nombre" 
                  className="w-full h-[44px] bg-transparent border border-white/40 rounded-full px-6 text-white outline-none focus:border-white transition-all placeholder:text-white/50"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="bg-white text-[#000000] px-12 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </form>
        </div>

        <div 
          className="w-full md:w-1/2 h-64 md:h-full rounded-[32px] overflow-hidden relative order-1 md:order-2 shadow-md border border-black/5"
          style={{ maxWidth: '804px' }}
        >
          <img 
            src="/restaurante2.png" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>
      
      {/* COPYRIGHT */}
      <p className="md:absolute static py-4 md:py-0 bottom-3 left-10 md:left-14 text-[10px] text-gray-400 font-medium tracking-tight text-center md:text-left order-3">
        Prueba técnica ©Tailor hub SL 2019 - 2026
      </p>
    </div>
  );
}