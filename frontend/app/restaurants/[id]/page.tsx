'use client';

import { useState } from 'react';
import { Star, ChevronDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RestaurantDetailPage() {
  const params = useParams();
  const [rating, setRating] = useState(0);

  const reviews = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen w-full bg-white font-sans">
      
      {/* HEADER */}
      <header className="flex justify-end items-center px-10 py-6 sticky top-0 bg-white z-20">
        <div className="flex items-center gap-1 text-black cursor-pointer">
          <span className="text-sm font-bold">Nombre usuario</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="px-10 mb-8">
        <div className="relative w-full h-[380px] rounded-[30px] overflow-hidden shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Restaurante"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-1">Nombre de restaurante</h1>
            <p className="text-sm opacity-90 font-medium">Dirección de restaurante</p>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="px-10 max-w-7xl mx-auto flex gap-12 pb-20">
        
        {/* IZQUIERDA: Descripción y Comentarios */}
        <div className="flex-1">
          <p className="text-black text-[13px] leading-relaxed mb-12 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur. At vel elementum amet est nulla cras turpis. Fringilla ornare massa eu a sollicitudin vestibulum auctor risus. Elementum quam sit neque quis. A vestibulum consectetur tincidunt vitae.
          </p>

          <div className="space-y-0">
            {reviews.map((_, i) => (
              /* LÍNEAS AZULES ENTRE COMENTARIOS */
              <div key={i} className="border-t border-[#2F54EB] py-8 flex gap-10">
                <div className="w-32 shrink-0">
                    {/* NOMBRE CAMBIADO AQUÍ */}
                    <h4 className="font-bold text-black text-[14px] leading-tight">Alejandro García Moreno...</h4>
                </div>
                <div className="flex-1">
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3 h-3 ${s <= 4 ? 'fill-[#2F54EB] text-[#2F54EB]' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-black text-[13px] leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur. At vel elementum amet est nulla cras turpis. Fringilla ornare massa eu a sollicitudin vestibulum auctor risus.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* BOTÓN DE CIERRE CON LÍNEA AZUL */}
          <div className="flex justify-center gap-3 pt-12 border-t border-[#2F54EB]">
            <button className="px-8 py-2 rounded-full border border-gray-300 text-[12px] font-bold text-black hover:bg-gray-50 transition-colors">
              Editar
            </button>
            <button className="px-8 py-2 rounded-full border border-gray-300 text-[12px] font-bold text-black hover:bg-gray-50 transition-colors">
              Eliminar
            </button>
          </div>
        </div>

        {/* DERECHA: RECUADRO CORTO */}
        <div className="w-[250px] shrink-0">
          <div className="sticky top-24 p-3 rounded-[20px] border border-gray-200 shadow-sm bg-white">
            <div className="flex justify-start gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star 
                  key={s} 
                  onClick={() => setRating(s)}
                  className={`w-3.5 h-3.5 cursor-pointer transition-colors ${
                    s <= rating ? 'fill-[#2F54EB] text-[#2F54EB]' : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            
            <textarea 
              placeholder="Escribe tu comentario sobre el restaurante"
              className="w-full h-11 text-[12px] text-black bg-transparent border-none focus:outline-none resize-none placeholder:text-gray-400 font-medium leading-tight mb-2"
            />
            
            <div className="flex justify-start">
              <button className="px-5 py-1.5 rounded-full border border-gray-300 text-[12px] font-bold text-black hover:bg-gray-50 transition-colors">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="px-10 py-6 border-t border-gray-100">
        <p className="text-[10px] text-black font-medium opacity-50 tracking-tight">Prueba técnica ©Tailor hub SL 2019 - 2024</p>
      </footer>
    </div>
  );
}