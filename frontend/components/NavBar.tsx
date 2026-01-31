'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // CAMBIO IMPORTANTE: Quitamos 'absolute top-0 left-0 right-0' y ponemos 'relative'.
    // Esto hace que la barra empuje el mapa hacia abajo y no se monte encima.
    <nav className="w-full flex justify-end px-10 py-6 bg-transparent relative z-[9999]">
      
      <div className="relative">
        
        {/* BOTÓN: TEXTO + FLECHA */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-black font-normal text-[16px] hover:opacity-70 transition-opacity select-none focus:outline-none"
        >
          <span>Nombre usuario</span>
          <ArrowDown 
            size={16} 
            strokeWidth={1.5}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* MENÚ DESPLEGABLE */}
        {isOpen && (
          <>
            {/* 1. Telón invisible */}
            <div 
              className="fixed inset-0 z-[9998] cursor-default" 
              onClick={() => setIsOpen(false)}
            />

            {/* 2. La Tarjeta Azul */}
            <div className="absolute right-0 top-full mt-2 w-[231px] bg-[#2F54EB] rounded-[24px] p-6 shadow-2xl z-[9999] flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              
              <div className="flex flex-col gap-4 text-white text-[16px]">
                <Link 
                  href="/account" 
                  onClick={() => setIsOpen(false)}
                  className="hover:opacity-80 transition-opacity text-left"
                >
                  Mi cuenta
                </Link>
                
                <Link 
                  href="/restaurants/add" 
                  onClick={() => setIsOpen(false)}
                  className="hover:opacity-80 transition-opacity text-left"
                >
                  Añadir restaurante
                </Link>
              </div>

              {/* Línea divisoria */}
              <div className="w-full h-[1px] bg-white/20"></div>

              {/* Botón Salir */}
              <button 
                onClick={() => console.log("Cerrar sesión")}
                className="w-full bg-white text-black font-bold text-[14px] py-3 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
              >
                Salir
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}