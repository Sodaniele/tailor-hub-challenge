'use client';

import { useState } from 'react';
import { MoveDown, MoveUp } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col">
      
      {/* HEADER COHERENTE CON TODA LA APP */}
      <header className="flex justify-end items-center px-10 py-6 sticky top-0 bg-white z-50">
        <div className="relative">
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-black cursor-pointer"
          >
            <span className="font-bold text-sm">Nombre usuario</span>
            {isMenuOpen ? <MoveUp className="w-3 h-3" /> : <MoveDown className="w-3 h-3" />}
          </div>

          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-[#2F54EB] rounded-[24px] p-4 shadow-2xl z-50 text-white animate-in fade-in zoom-in duration-200">
              <div className="space-y-3 mb-4">
                <Link href="/restaurants" className="block text-xs font-medium hover:text-white/80 transition-colors">
                  Volver al mapa
                </Link>
                <button className="block text-xs font-medium hover:text-white/80 transition-colors">
                  Mi cuenta
                </button>
              </div>
              <div className="h-[1px] bg-white/20 w-full mb-4" />
              <Link href="/login" className="block">
                <button className="w-full bg-white text-black font-extrabold py-2 rounded-full text-[10px] uppercase tracking-wider">
                  Salir
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* CONTENIDO DE ERROR CENTRADO */}
      <main className="flex-1 flex flex-col items-center justify-center px-10">
        
        {/* Icono Azul Superior */}
        <div className="mb-6 text-[#2F54EB]">
          <AsteriskIcon />
        </div>

        {/* Mensaje de Error Calcado a la captura */}
        <div className="text-center space-y-8">
          <h2 className="text-[#2F54EB] font-bold text-lg tracking-tight">
            Ups, algo salió mal
          </h2>

          <Link href="/restaurants/add">
            <button className="px-14 py-2.5 rounded-full border border-black bg-white text-black font-bold text-sm hover:bg-gray-50 transition-all shadow-sm">
              Volver
            </button>
          </Link>
        </div>

        {/* Icono Azul Inferior */}
        <div className="mt-8 text-[#2F54EB]">
          <AsteriskIcon />
        </div>

      </main>

      {/* FOOTER */}
      <footer className="px-10 py-8">
        <p className="text-[10px] text-black font-medium opacity-40">
          Prueba técnica ©Tailor hub SL 2019 - 2024
        </p>
      </footer>
    </div>
  );
}

// Icono decorativo SVG
function AsteriskIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22M12 2L12 22M2 12H22M2 12L22 12M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}