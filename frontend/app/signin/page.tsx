'use client';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function SignInPage() {
  return (
    // CONTENEDOR PRINCIPAL
    <div className="h-screen w-full bg-white p-2 pb-10 flex gap-2 font-sans overflow-hidden relative">
      
      {/* --- COLUMNA IZQUIERDA --- */}
      <div className="w-1/2 h-full flex flex-col justify-end pl-2">
        
        {/* Se ha eliminado el div que contenía el texto 'SignIn' */}

        {/* TARJETA AZUL */}
        <div className="bg-[#2F54EB] w-full rounded-[32px] p-8 md:p-10 shadow-2xl text-white relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-start gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 fill-white text-white" />
              <span className="text-3xl font-bold tracking-tight">tailor</span>
            </div>
            
            <Link 
              href="/login" 
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          {/* Formulario */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Email:</label>
              <input 
                type="email" 
                placeholder="Añade tu email"
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Nombre de usuario:</label>
              <input 
                type="text" 
                placeholder="Añade tu nombre"
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            <div className="pt-2">
              <Link href="/password">
                <button className="bg-white text-[#2F54EB] px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md">
                  Siguiente
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- COLUMNA DERECHA (FOTO) --- */}
      <div className="w-1/2 h-full rounded-[32px] overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" 
          alt="Restaurant Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* --- TEXTO LEGAL --- */}
      <p className="absolute bottom-3 left-6 text-[10px] text-gray-400 font-medium tracking-tight">
        Prueba técnica ©Tailor hub SL 2019 - 2024
      </p>

    </div>
  );
}