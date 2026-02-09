'use client';

import Link from 'next/link';
import Navbar from '@/components/NavBar'; 

export default function ErrorPage() {
  
  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col overflow-x-hidden">
      
      {/* HEADER REAL CONECTADO */}
      <Navbar />

      {/* CONTENIDO DE ERROR */}
      <main className="flex-1 flex flex-col items-center justify-center px-10 py-12">
        
        {/* LOGO SUPERIOR */}
        <div className="mb-10 shrink-0">
          <img 
            src="/logo-azul.png" 
            alt="Tailor Hub Logo" 
            style={{ width: '194px', height: '40px', objectFit: 'contain' }} 
          />
        </div>

        <div className="text-center space-y-10 flex flex-col items-center">
          <h2 className="text-[#2F54EB] font-bold text-lg tracking-tight uppercase">
            Ups, algo salió mal
          </h2>

          <Link href="/restaurants/add">
            <button 
              style={{
                width: '232px',
                height: '60px',
                borderRadius: '9999px',
                borderWidth: '1px',
              }}
              className="border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 uppercase flex items-center justify-center"
            >
              Volver
            </button>
          </Link>
        </div>

        {/* LOGO INFERIOR */}
        <div className="mt-14 shrink-0">
          <img 
            src="/logo-azul.png" 
            alt="Tailor Hub Logo" 
            style={{ width: '194px', height: '40px', objectFit: 'contain' }} 
          />
        </div>

      </main>

      <footer className="px-10 py-8 text-center">
        <p className="text-[10px] text-black font-bold uppercase tracking-tight opacity-40">
          Prueba técnica ©Tailor hub SL 2019 - 2026
        </p>
      </footer>
    </div>
  );
}