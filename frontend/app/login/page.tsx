'use client';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="h-screen w-full bg-white p-2 pb-10 flex gap-2 font-sans overflow-hidden relative">
      <div className="w-1/2 h-full flex flex-col justify-end pl-2">
        <div className="bg-[#2F54EB] w-full rounded-[32px] p-8 md:p-10 shadow-2xl text-white relative z-10">
          
          {/* LOGO CORREGIDO: Igual a la Home */}
          <div className="flex items-center gap-3 mb-8">
            <div className="text-white">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V22M12 2L12 22M2 12H22M2 12L22 12M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-3xl font-bold tracking-tighter lowercase">tailor</span>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Email</label>
              <input type="email" placeholder="Escribe tu email" className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Contraseña</label>
              <input type="password" placeholder="Escribe tu contraseña" className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all" />
            </div>
            <div className="pt-4">
              <Link href="/restaurants">
                <button className="bg-white text-[#2F54EB] px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md">Siguiente</button>
              </Link>
            </div>
            <div className="text-[10px] mt-4 font-medium">
              <span className="text-white/70">¿No tienes cuenta? </span>
              <Link href="/signin" className="text-white underline hover:text-gray-200 transition-colors">Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full rounded-[32px] overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?q=80&w=1924&auto=format&fit=crop" alt="Greenhouse Restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      <p className="absolute bottom-3 left-6 text-[10px] text-gray-400 font-medium tracking-tight">Prueba técnica ©Tailor hub SL 2019 - 2024</p>
    </div>
  );
}