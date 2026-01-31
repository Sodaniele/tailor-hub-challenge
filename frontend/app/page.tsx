'use client';
import Link from 'next/link';

export default function Home() {
  return (
    // CAMBIO 1: Pongo 'bg-white' aquí para que el fondo "detrás" de las tarjetas sea blanco puro.
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white font-sans">
      
      {/* SECCIÓN 1: HOME (LOGO) */}
      {/* CAMBIO 2: Añadido padding (p-4 md:p-8) para crear el marco blanco alrededor */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start snap-always relative p-4 md:p-8">
        
        {/* CAMBIO 3: Caja interna "Blanco Roto" (#F2F2F2) con bordes redondeados */}
        <div className="w-full h-full bg-[#F2F2F2] rounded-[32px] flex flex-col items-center justify-center relative shadow-sm overflow-hidden">
          
          <div className="select-none">
            <img 
              src="/full-logo.png" 
              alt="Tailor Hub Full Logo" 
              className="w-64 h-auto object-contain" 
            />
          </div>
          
          {/* Indicador de Deslizar */}
          <div className="absolute bottom-10 animate-bounce text-gray-400 flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-widest mb-2 text-center">Desliza</p>
            <div className="w-[1px] h-10 bg-black/20"></div>
          </div>

          {/* Copyright (Dentro de la caja gris) */}
          <div className="absolute bottom-8 left-8">
            <p className="text-[10px] text-black font-medium opacity-40 tracking-tight">
              Prueba técnica ©Tailor hub SL 2019 - 2024
            </p>
          </div>

        </div>
      </section>

      {/* SECCIÓN 2: 50/50 (INTACTA) */}
      <section className="h-screen w-full flex items-center p-6 md:p-12 snap-start snap-always bg-white">
        
        <div className="w-full h-full flex flex-col md:flex-row md:items-end gap-6">
          
          {/* Lado Izquierdo */}
          <div className="flex-1 w-full bg-[#F2F2F2] p-8 md:p-12 rounded-[32px] flex flex-col justify-center shrink-0 relative border border-black/5 shadow-sm">
            
            <div className="space-y-6">
              {/* Logo pequeño */}
              <div>
                <img 
                  src="/full-logo.png" 
                  alt="Tailor Hub Full Logo" 
                  className="h-12 w-auto object-contain" 
                />
              </div>
              
              {/* Textos */}
              <div className="space-y-4">
                <h2 className="text-3xl font-light text-black leading-tight">
                  Hola,
                </h2>
                <p className="text-xl font-light text-black/80 leading-relaxed max-w-md">
                  Bienvenido a la prueba de Tailor hub, en ella has de añadir los restaurantes favoritos donde te gustaría ir en tu onboarding.
                </p>
              </div>

              <div className="pt-4">
                <Link 
                  href="/signin" 
                  className="inline-block px-10 py-2.5 border border-black rounded-full text-sm font-bold text-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  Entrar
                </Link>
              </div>
            </div>

            <p className="text-[10px] text-black font-bold opacity-30 mt-10">
              Prueba técnica ©Tailor hub SL 2019 - 2024
            </p>
          </div>

          {/* Lado Derecho: Imagen */}
          <div className="flex-1 w-full h-full rounded-[32px] overflow-hidden shadow-md border border-black/5">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
              alt="Restaurante Interior"
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>
      
    </div>
  );
}