'use client';
import Link from 'next/link';

export default function Home() {
  return (
    // Fondo general #F2F2F2
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#F2F2F2] font-sans">
      
      {/* SECCIÓN 1: LOGO CENTRADO */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start snap-always relative">
        <div className="flex items-center gap-3 select-none">
          <div className="text-black">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V22M12 2L12 22M2 12H22M2 12L22 12M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter lowercase text-black">
            tailor
          </h1>
        </div>
        
        <div className="absolute bottom-10 animate-bounce text-gray-400">
          <p className="text-[10px] uppercase tracking-widest mb-2 text-center w-full">Desliza</p>
          <div className="w-[1px] h-10 bg-black/20 mx-auto"></div>
        </div>

        <div className="absolute bottom-8 w-full text-center">
          <p className="text-[10px] text-black font-medium opacity-40 tracking-tight">
            Prueba técnica ©Tailor hub SL 2019 - 2024
          </p>
        </div>
      </section>

      {/* SECCIÓN 2: 50/50 */}
      <section className="h-screen w-full flex items-center p-6 md:p-12 snap-start snap-always bg-[#F2F2F2]">
        
        <div className="w-full h-full flex flex-col md:flex-row md:items-end gap-6">
          
          {/* Lado Izquierdo: RECUADRO COLOR BLANCO ROTO (#EBEBEB) */}
          <div className="flex-1 w-full bg-[#EBEBEB] p-8 md:p-12 rounded-[32px] flex flex-col justify-center shrink-0 relative border border-black/5 shadow-sm">
            
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="text-black">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V22M2 12H22M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold lowercase tracking-tighter text-black">tailor</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-black leading-tight">
                  Hola,
                </h2>
                <p className="text-xl font-medium text-black/80 leading-relaxed max-w-md">
                  Bienvenido a la prueba de Tailor hub, en ella has de añadir los restaurantes favoritos donde te gustaría ir en tu onboarding.
                </p>
              </div>

              <div className="pt-4">
                <Link 
                  href="/login"
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

          {/* Lado Derecho: Imagen de restaurante */}
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