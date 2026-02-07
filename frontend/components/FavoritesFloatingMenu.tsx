'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useRestaurantStore } from '@/store/useRestaurantStore';

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop";

export default function FavoritesFloatingMenu() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isListOpen, setIsListOpen] = useState(false);

  const restaurants = useRestaurantStore((state) => state.restaurants);
  const favorites = useRestaurantStore((state) => state.favorites);
  const toggleFavorite = useRestaurantStore((state) => state.toggleFavorite);

  const favoriteRestaurants = restaurants.filter(res => favorites?.includes(res.id));

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsListOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div className="absolute top-6 left-10 z-[150]" ref={menuRef}>
        
      {/* --- BOTÓN ACTIVADOR --- */}
      <div 
        onClick={() => setIsListOpen(!isListOpen)}
        className={`
          relative z-20 flex items-center gap-3 cursor-pointer group px-6 py-3 rounded-full shadow-lg border transition-all duration-300 select-none
          ${isListOpen 
            ? 'bg-black border-black text-white' 
            : 'bg-white border-transparent hover:border-gray-200 text-black'}
        `}
      >
        <img 
          src="/list-icon.svg" 
          alt="Lista" 
          className={`w-4 h-4 transition-transform ${isListOpen ? 'invert brightness-0' : 'opacity-60 group-hover:scale-110'}`} 
        />
        <div className="flex flex-col">
          <span className={`text-[9px] uppercase font-bold tracking-widest leading-none mb-1 ${isListOpen ? 'text-gray-400' : 'text-[#7D7D7D]'}`}>
            Favoritos
          </span>
          <span className={`text-[15px] font-bold leading-none`}>
            {favorites?.length || 0}
          </span>
        </div>
      </div>

      {/* --- MENÚ DESPLEGABLE --- */}
      {isListOpen && (
        <div className="absolute top-full left-0 mt-3 z-10 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
          
          {/* 1. EL "PICO" (Triangulito conector) - Esto hace que parezca un bocadillo real */}
          <div className="absolute -top-[8px] left-8 w-5 h-5 bg-white border-t border-l border-gray-100 transform rotate-45 z-20"></div>

          {/* 2. LA CAJA PRINCIPAL */}
          <div className={`
             w-[340px] bg-white shadow-2xl border border-gray-100 overflow-hidden flex flex-col relative z-10
             
             /* FORMA DE BURBUJA: Arriba-Izquierda en punta (0px), el resto muy curvo (32px) */
             rounded-[0px_32px_32px_32px]
          `}>
            
            {/* Cabecera */}
            <div className="pt-6 px-6 pb-4 flex justify-between items-center bg-white">
              <h4 className="text-black font-bold text-[18px] tracking-tight">Mis Guardados</h4>
              <button 
                onClick={() => setIsListOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="text-black w-4 h-4" />
              </button>
            </div>
            
            <div className="h-px w-full bg-gray-50 mb-2"></div>

            {/* Lista (Sin bg-white propio para no tapar los bordes del padre) */}
            <div className="max-h-[360px] overflow-y-auto px-4 pb-4 custom-scrollbar space-y-2">
              {favoriteRestaurants.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center opacity-50">
                  <img src="/heart-empty.svg" className="w-8 h-8 mb-3 opacity-20" alt="empty" />
                  <p className="text-[13px] font-medium text-gray-400">Tu lista está vacía</p>
                </div>
              ) : (
                favoriteRestaurants.map((res) => (
                  <div 
                    key={res.id}
                    onClick={() => {
                      router.push(`/restaurants/${res.id}`);
                      setIsListOpen(false);
                    }}
                    className="flex items-center gap-4 p-3 hover:bg-[#F9F9F9] rounded-[20px] cursor-pointer transition-colors group relative"
                  >
                    <img 
                      src={res.image || PLACEHOLDER_IMAGE} 
                      className="w-12 h-12 rounded-[14px] object-cover shadow-sm group-hover:scale-105 transition-transform shrink-0" 
                      alt={res.name}
                      onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
                    />
                    
                    <div className="flex-1 min-w-0 pr-8">
                      <p className="text-[14px] font-bold text-black truncate leading-tight group-hover:text-[#2F54EB] transition-colors">
                        {res.name}
                      </p>
                      <p className="text-[11px] text-[#7D7D7D] truncate mt-1 font-medium">{res.address}</p>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(res.id);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-red-50 rounded-full transition-colors group/btn"
                    >
                      <img 
                        src="/heart-filled.svg" 
                        className="w-4 h-4 transition-transform group-hover/btn:scale-110" 
                        alt="unfav" 
                      />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}