'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white font-sans">
      
      {/* SECCIÓN 1: EL LOGO (SIN CAMBIOS) */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start snap-always relative">
        <div className="flex items-center gap-3 select-none">
          <span className="text-4xl font-light mb-1">✳︎</span>
          <h1 className="text-5xl font-bold tracking-tighter lowercase text-black">
            tailor
          </h1>
        </div>
        
        <div className="absolute bottom-10 animate-bounce text-gray-300">
          <p className="text-[10px] uppercase tracking-widest mb-2">Desliza</p>
          <div className="w-[1px] h-10 bg-gray-200 mx-auto"></div>
        </div>

        <div className="absolute bottom-8 w-full text-center">
          <p className="text-[10px] text-gray-400 font-medium tracking-tight">
            Prueba técnica ©Tailor hub SL 2019 - 2024
          </p>
        </div>
      </section>

      {/* SECCIÓN 2: 50/50 CON CAJA GRIS MÁS CORTA */}
      <section className="h-screen w-full flex items-center p-6 md:p-12 snap-start snap-always bg-white">
        
        <div className="w-full h-full flex flex-col md:flex-row md:items-end gap-6">
          
          {/* Lado Izquierdo: CAJA MÁS CORTA (menos padding y espacio) */}
          <div className="flex-1 w-full bg-[#EBEBEB] p-8 md:p-10 rounded-[32px] flex flex-col justify-center shrink-0 relative">
            
            <div className="space-y-5"> {/* Reducido de space-y-8 a 5 */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-light">✳︎</span>
                <span className="text-2xl font-bold lowercase tracking-tighter">tailor</span>
              </div>
              
              <div className="space-y-3"> {/* Reducido espacio entre títulos */}
                <h2 className="text-2xl font-light text-gray-900 leading-snug">
                  Hola,
                </h2>
                <p className="text-2xl font-light text-gray-900 leading-snug">
                  Bienvenido a la prueba de Tailor hub, en ella has de añadir los restaurantes favoritos donde te gustaría ir en tu onboarding.
                </p>
              </div>

              <div className="pt-2">
                <Link 
                href="/signin"
                  className="inline-block w-fit px-8 py-2 border border-gray-400 rounded-full text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition-all duration-300"
                >
                  Entrar
                </Link>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 font-medium tracking-tight mt-6"> {/* Margen reducido */}
              Prueba técnica ©Tailor hub SL 2019 - 2024
            </p>
          </div>

          {/* Lado Derecho: Imagen (OCUPA TODA LA ALTURA) */}
          <div className="flex-1 w-full h-full rounded-[32px] overflow-hidden shadow-sm bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
              alt="Restaurante Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
    </div>
  );
}