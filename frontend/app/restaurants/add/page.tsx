'use client';

import { useState, useRef } from 'react';
import { MoveDown, MoveUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importamos el router

export default function AddRestaurantPage() {
  const router = useRouter(); // Inicializamos el router
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Función para manejar el guardado y redirección
  const handleSave = () => {
    // Aquí podrías añadir lógica de validación si quisieras
    router.push('/restaurants/add/success');
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="flex justify-end items-center px-10 py-6 sticky top-0 bg-white z-50">
        <div className="relative">
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-black cursor-pointer"
          >
            <span className="font-bold text-sm">Nombre usuario</span>
            {isMenuOpen ? <MoveUp className="w-3 h-3" /> : <MoveDown className="w-3 h-3" />}
          </div>

          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-[#2F54EB] rounded-[24px] p-4 shadow-2xl z-50 text-white">
              <div className="space-y-3 mb-4">
                <Link href="/restaurants" className="block text-xs font-medium hover:text-white/80">Volver al mapa</Link>
                <button className="block text-xs font-medium hover:text-white/80">Mi cuenta</button>
              </div>
              <div className="h-[1px] bg-white/20 w-full mb-4" />
              <Link href="/login" className="block">
                <button className="w-full bg-white text-black font-extrabold py-2 rounded-full text-[10px] uppercase">Salir</button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col items-center justify-center px-10 pb-20 max-w-7xl mx-auto w-full">
        
        <div className="mb-8 text-[#2F54EB]"><AsteriskIcon /></div>

        <div className="flex gap-12 w-full items-start justify-center">
          
          {/* CUADRO DE IMAGEN CON BORDE NEGRO */}
          <div 
            onClick={() => !image && fileInputRef.current?.click()}
            className="w-[480px] aspect-square bg-[#F2F2F2] rounded-[24px] border border-black overflow-hidden flex items-center justify-center relative cursor-pointer"
          >
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

            {image ? (
              <div className="relative w-full h-full group">
                <img src={image} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImage(null); }}
                    className="px-8 py-2 border border-white rounded-full text-white font-bold text-sm backdrop-blur-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ) : (
              <span className="text-black font-bold text-sm">Añadir imágen</span>
            )}
          </div>

          {/* FORMULARIO */}
          <div className="flex-1 max-w-md space-y-6">
            <div className="space-y-2">
              <label className="block text-black font-bold text-sm">Nombre de restaurante:</label>
              <input type="text" placeholder="Nombre del restaurante" className="w-full px-6 py-2 rounded-full border border-black bg-white text-sm focus:outline-none placeholder:text-black" />
            </div>

            <div className="space-y-2">
              <label className="block text-black font-bold text-sm">Dirección del restaurante</label>
              <input type="text" placeholder="Dirección" className="w-full px-6 py-2 rounded-full border border-black bg-white text-sm focus:outline-none placeholder:text-black" />
            </div>

            <div className="space-y-2">
              <label className="block text-black font-bold text-sm">Descripción del restaurante</label>
              <textarea placeholder="Escribe información acerca del restaurante" className="w-full h-32 px-6 py-4 rounded-[24px] border border-black bg-white text-sm focus:outline-none resize-none placeholder:text-black" />
            </div>

            {/* BOTÓN CONECTADO */}
            <button 
              onClick={handleSave}
              className="px-10 py-2.5 rounded-full border border-black bg-white text-black font-bold text-sm hover:bg-gray-50 transition-all shadow-sm"
            >
              Guardar
            </button>
          </div>
        </div>

        <div className="mt-12 text-[#2F54EB]"><AsteriskIcon /></div>
      </main>

      <footer className="px-10 py-6 border-none">
        <p className="text-[10px] text-black font-medium opacity-40">Prueba técnica ©Tailor hub SL 2019 - 2024</p>
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