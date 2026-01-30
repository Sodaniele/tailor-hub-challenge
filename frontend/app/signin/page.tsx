'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white font-sans">
      
      {/* SECCIÓN PRINCIPAL */}
      <section className="h-screen w-full flex items-center p-6 md:p-12 snap-start snap-always bg-white">
        
        {/* Contenedor dividido 50/50 igual que en Home */}
        <div className="w-full h-full flex flex-col md:flex-row md:items-end gap-6">
          
          {/* LADO IZQUIERDO: Caja Azul */}
          <div className="flex-1 w-full bg-[#2F54EB] p-8 md:p-10 rounded-[32px] flex flex-col justify-center shrink-0 relative shadow-lg">
            
            {/* CABECERA: Logo y Flecha debajo */}
            <div className="flex flex-col items-start gap-4 mb-8">
              {/* 1. Logo */}
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl font-light">✳︎</span>
                <span className="text-2xl font-bold lowercase tracking-tighter">tailor</span>
              </div>
              
              {/* 2. Flecha (Ahora está abajo del logo) */}
              <Link 
                href="/" 
                className="flex items-center justify-center w-8 h-8 border border-white/30 rounded-full hover:bg-white/20 transition-colors text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            
            {/* FORMULARIO */}
            <div className="space-y-5">
              <div className="space-y-4">
                {/* Input Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white ml-2">Email:</label>
                  <input 
                    type="email" 
                    placeholder="Añade tu email"
                    className="w-full bg-transparent border border-white/40 rounded-full py-2.5 px-6 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>

                {/* Input Nombre */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white ml-2">Nombre de usuario:</label>
                  <input 
                    type="text" 
                    placeholder="Añade tu nombre"
                    className="w-full bg-transparent border border-white/40 rounded-full py-2.5 px-6 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              {/* Botón Siguiente */}
              <div className="pt-2">
                <button className="bg-white text-[#2F54EB] px-8 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm w-fit">
                  Siguiente
                </button>
              </div>
            </div>

            {/* Footer Legal */}
            <p className="text-[10px] text-white/40 font-medium tracking-tight mt-6">
              Prueba técnica ©Tailor hub SL 2019 - 2024
            </p>
          </div>

          {/* LADO DERECHO: Imagen Oscura (Mismas dimensiones que Home) */}
          <div className="flex-1 w-full h-full rounded-[32px] overflow-hidden shadow-sm bg-black">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
              alt="Interior Restaurante Oscuro"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

        </div>
      </section>
    </div>
  );
}