'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white font-sans">
      
      {/* SECCIÓN 1: HOME */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start snap-always relative p-4 md:p-8">
        <div className="w-full h-full bg-[#F2F2F2] rounded-[32px] flex flex-col items-center justify-center relative shadow-sm overflow-hidden">
          <div className="select-none">
            <img 
              src="/full-logo.png" 
              alt="Tailor Hub Full Logo" 
              style={{ width: '194px', height: '44px', objectFit: 'contain' }} 
            />
          </div>
          <div className="absolute bottom-10 animate-bounce text-gray-400 flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-widest mb-2 text-center">Desliza</p>
            <div className="w-[1px] h-10 bg-black/20"></div>
          </div>
        </div>
        <div className="absolute bottom-3 left-10">
          <p className="text-[10px] text-gray-400 font-medium tracking-tight">
            Prueba técnica ©Tailor hub SL 2019 - 2026
          </p>
        </div>
      </section>

      {/* SECCIÓN 2: 50/50 */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start snap-always relative p-4 md:p-8">
        
        <div 
          className="h-full w-full flex flex-col md:flex-row md:items-end gap-4 md:gap-[40px] justify-center"
          style={{ maxWidth: '1648px' }}
        >
          
          {/* LADO IZQUIERDO: TEXTO */}
          <div 
            className="w-full md:w-1/2 bg-[#F2F2F2] p-4 md:p-8 rounded-[32px] flex flex-col justify-center order-2 md:order-1 border border-black/5 shadow-sm"
            style={{ 
              height: '425px', 
              maxWidth: '804px' 
            }} 
          >
            <div className="space-y-6">
              <div>
                <img 
                  src="/full-logo.png" 
                  alt="Tailor Hub Full Logo" 
                  style={{ width: '194px', height: '44px', objectFit: 'contain' }} 
                />
              </div>
              
              <div 
                style={{ 
                  maxWidth: '718px', 
                  width: '100%',
                  height: '193px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <h2 className="text-3xl font-light text-black leading-tight">
                  Hola,
                </h2>
                <p className="text-xl font-light text-black/80 leading-relaxed">
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
          </div>

          {/* LADO DERECHO */}
          <div 
            className="w-full md:w-1/2 h-64 md:h-full rounded-[32px] overflow-hidden shadow-md border border-black/5 order-1 md:order-2"
            style={{ maxWidth: '804px' }}
          >
            <img 
              src="/restaurante1.png" 
              alt="Restaurante Interior"
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* COPYRIGHT */}
        <p className="md:absolute static py-4 md:py-0 bottom-3 left-10 text-[10px] text-gray-400 font-medium tracking-tight text-center md:text-left order-3">
          Prueba técnica ©Tailor hub SL 2019 - 2026
        </p>
      </section>
      
    </div>
  );
}