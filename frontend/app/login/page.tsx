'use client';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
  return (
    // CONTENEDOR PRINCIPAL (Misma estructura que las otras para consistencia)
    <div className="h-screen w-full bg-white p-2 pb-10 flex gap-2 font-sans overflow-hidden relative">
      
      {/* --- COLUMNA IZQUIERDA --- */}
      <div className="w-1/2 h-full flex flex-col justify-end pl-2">
        
        {/* Texto superior 'Login' */}
        <div className="text-gray-300 text-sm font-medium mb-auto pt-4 pl-2">
          Login
        </div>

        {/* TARJETA AZUL */}
        <div className="bg-[#2F54EB] w-full rounded-[32px] p-8 md:p-10 shadow-2xl text-white relative z-10">
          
          {/* Header: Solo Logo (sin flecha de volver esta vez) */}
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 fill-white text-white" />
            <span className="text-3xl font-bold tracking-tight">tailor</span>
          </div>

          {/* Formulario */}
          <div className="space-y-5">
            
            {/* Campo Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Email</label>
              <input 
                type="email" 
                placeholder="Escribe tu email"
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Contraseña</label>
              <input 
                type="password" 
                placeholder="Escribe tu contraseña"
                className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            {/* Botón Siguiente -> VA AL MAPA */}
            <div className="pt-4">
              <Link href="/restaurants">
                <button className="bg-white text-[#2F54EB] px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md">
                  Siguiente
                </button>
              </Link>
            </div>

            {/* Enlace de Registro */}
            <div className="text-[10px] mt-4 font-medium">
              <span className="text-white/70">¿No tienes cuenta? </span>
              <Link href="/signin" className="text-white underline hover:text-gray-200 transition-colors">
                Regístrate
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* --- COLUMNA DERECHA (FOTO) --- */}
      <div className="w-1/2 h-full rounded-[32px] overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?q=80&w=1924&auto=format&fit=crop" 
          alt="Greenhouse Restaurant" 
          className="w-full h-full object-cover"
        />
        {/* Capa oscura sutil */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* --- TEXTO LEGAL --- */}
      <p className="absolute bottom-3 left-6 text-[10px] text-gray-400 font-medium tracking-tight">
        Prueba técnica ©Tailor hub SL 2019 - 2024
      </p>

    </div>
  );
}