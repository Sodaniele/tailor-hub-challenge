'use client';

import { useState } from 'react';
import { ChevronDown, MoveDown, MoveUp } from 'lucide-react';
import Link from 'next/link';

export default function AddRestaurantPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="flex justify-end items-center px-10 py-6 bg-transparent sticky top-0 z-50">
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
                <Link href="/restaurants" className="block w-full text-left hover:text-white/80 transition-colors">
                  <span className="text-xs font-medium">Volver al mapa</span>
                </Link>
                <button className="block w-full text-left hover:text-white/80 transition-colors">
                  <span className="text-xs font-medium">Mi cuenta</span>
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col items-center justify-center px-10 pb-20 max-w-7xl mx-auto w-full">
        
        {/* ICONO AZUL SUPERIOR */}
        <div className="mb-8 text-[#2F54EB]">
          <AsteriskIcon />
        </div>

        <div className="flex gap-12 w-full items-start justify-center">
          
          {/* CUADRO DE IMAGEN CON BORDE NEGRO */}
          <div className="w-[480px] aspect-square bg-[#F2F2F2] rounded-[24px] flex items-center justify-center border border-black shadow-sm cursor-pointer">
            <span className="text-black font-medium text-sm">Añadir imágen</span>
          </div>

          {/* FORMULARIO LADO DERECHO */}
          <div className="flex-1 max-w-md space-y-6">
            
            {/* Nombre */}
            <div className="space-y-2 text-left">
              <label className="block text-black font-bold text-sm">Nombre de restaurante:</label>
              <input 
                type="text" 
                placeholder="Nombre del restaurante"
                className="w-full px-6 py-2 rounded-full border border-black bg-white text-sm focus:outline-none placeholder:text-black placeholder:font-normal"
              />
            </div>

            {/* Dirección */}
            <div className="space-y-2 text-left">
              <label className="block text-black font-bold text-sm">Dirección del restaurante</label>
              <input 
                type="text" 
                placeholder="Dirección"
                className="w-full px-6 py-2 rounded-full border border-black bg-white text-sm focus:outline-none placeholder:text-black placeholder:font-normal"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2 text-left">
              <label className="block text-black font-bold text-sm">Descripción del restaurante</label>
              <textarea 
                placeholder="Escribe información acerca del restaurante"
                className="w-full h-24 px-6 py-4 rounded-[24px] border border-black bg-white text-sm focus:outline-none resize-none placeholder:text-black placeholder:font-normal leading-tight"
              />
            </div>

            {/* Botón Guardar */}
            <div className="pt-2 flex justify-start">
              <button className="px-10 py-2.5 rounded-full border border-black bg-white text-black font-bold text-sm hover:bg-gray-50 transition-all">
                Guardar
              </button>
            </div>

          </div>
        </div>

        {/* ICONO AZUL INFERIOR */}
        <div className="mt-12 text-[#2F54EB]">
          <AsteriskIcon />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-10 py-6">
        <p className="text-[10px] text-black font-medium">
          Prueba técnica ©Tailor hub SL 2019 - 2024
        </p>
      </footer>
    </div>
  );
}

function AsteriskIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22M12 2L12 22M2 12H22M2 12L22 12M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}