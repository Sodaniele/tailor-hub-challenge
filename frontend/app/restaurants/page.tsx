'use client';

import { useState, useEffect, useCallback } from 'react';
import Map, { Marker, ViewStateChangeEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Star, X } from 'lucide-react'; 
import { useRouter } from 'next/navigation'; 
import { useRestaurantStore } from '@/store/useRestaurantStore';
import Navbar from '@/components/NavBar';
import { Restaurant } from '@/types/restaurant'; 

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic29kYW5pZWxlIiwiYSI6ImNtbDE5YXF4NDAxc3AzZ3F0ZnlldTVlb2kifQ.1myKvxq_xL0TTkz0ZQ0gYQ';

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop";

export default function RestaurantsListPage() {
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const loading = useRestaurantStore((state) => state.loading);
  const fetchRestaurants = useRestaurantStore((state) => state.fetchRestaurants);
  const favorites = useRestaurantStore((state) => state.favorites);
  const toggleFavorite = useRestaurantStore((state) => state.toggleFavorite);

  const router = useRouter(); 
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 11,
    pitch: 0,
    bearing: 0
  });

  const [activeId, setActiveId] = useState<number | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  
  const favoriteRestaurants = restaurants.filter(res => favorites?.includes(res.id));

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const goToRestaurant = useCallback(
    (res: Restaurant) => {
      const lat = res.latitude || 40.7128;
      const lng = res.longitude || -74.0060;
      
      setActiveId(res.id);
      setViewState((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        zoom: 15,
      }));
      
      router.push(`/restaurants/${res.id}`);
    },
    [router]
  );

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[#2F54EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col overflow-hidden relative">
      <Navbar />

      {/* --- SECCIÓN FAVORITOS --- */}
      <div className="fixed top-6 left-10 z-[110]">
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsListOpen(!isListOpen);
          }}
          className="flex items-center gap-2 cursor-pointer group bg-white p-2 rounded-2xl shadow-lg border border-gray-100 hover:bg-gray-50 transition-all"
        >
          <img src="/list-icon.svg" alt="Lista" className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-gray-400 leading-none">Favoritos</span>
            <span className="text-xs font-extrabold text-black leading-none">{favorites?.length || 0}</span>
          </div>
        </div>

        {isListOpen && (
          <>
            <div className="fixed inset-0 z-[-1] bg-black/5" onClick={() => setIsListOpen(false)} />
            
            <div className="fixed top-20 left-10 w-64 bg-[#2F54EB] rounded-[24px] shadow-2xl overflow-hidden border border-white/20 flex flex-col">
              <div className="p-4 flex justify-between items-center border-b border-white/10">
                <h4 className="text-white font-bold text-sm">Mis Guardados</h4>
                <X 
                  className="text-white w-4 h-4 cursor-pointer hover:rotate-90 transition-transform" 
                  onClick={() => setIsListOpen(false)}
                />
              </div>
              
              <div className="max-h-[300px] overflow-y-auto p-2">
                {favoriteRestaurants.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-blue-100/50 text-[10px] italic">No hay favoritos guardados</p>
                  </div>
                ) : (
                  favoriteRestaurants.map((res) => (
                    <div 
                      key={res.id}
                      onClick={() => {
                        goToRestaurant(res);
                        setIsListOpen(false);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl cursor-pointer transition-colors mb-1"
                    >
                      <img 
                        src={res.image || PLACEHOLDER_IMAGE} 
                        className="w-10 h-10 rounded-lg object-cover border border-white/10" 
                        alt={res.name}
                        onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-white truncate">{res.name}</p>
                        <p className="text-[9px] text-blue-100/70 truncate">{res.address}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(res.id);
                        }}
                        className="p-1"
                      >
                        <img src="/heart-filled.svg" className="w-3.5 h-3.5 brightness-0 invert" alt="unfav" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 px-4 lg:px-6 py-6 overflow-hidden">
        {/* MAPA */}
        <div className="w-full h-[40vh] lg:w-1/2 lg:h-full rounded-[32px] overflow-hidden shadow-2xl bg-gray-200 flex-shrink-0">
          <Map
            {...viewState}
            onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {/* Iteramos sobre el array tipado */}
            {restaurants.map((res) => {
              const lat = res.latitude || 0;
              const lng = res.longitude || 0;
              
              if (lat === 0 && lng === 0) return null;

              const isActive = res.id === activeId;
              return (
                <Marker key={res.id} latitude={lat} longitude={lng} anchor="bottom">
                  <div
                    onClick={() => {
                      setActiveId(res.id);
                      setViewState((prev) => ({ ...prev, latitude: lat, longitude: lng, zoom: 14 }));
                    }}
                    className={`cursor-pointer transition-all ${isActive ? 'scale-110 z-50' : 'hover:scale-105'}`}
                  >
                    <img src={isActive ? '/pin-selected.png' : '/pin-default.png'} className="w-12 drop-shadow-md" alt="pin" />
                  </div>
                </Marker>
              );
            })}
          </Map>
        </div>

        {/* LISTA DE TARJETAS */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto pr-2 space-y-4 pb-10 lg:pb-0">
          {restaurants.map((res) => {
            const isActive = activeId === res.id;
            const rating = res.rating || 5; 
            const reviewCount = res.reviews?.length || 0;
            const isFavorite = favorites?.includes(res.id);

            return (
              <div 
                key={res.id} 
                onClick={() => goToRestaurant(res)} 
                className={isActive 
                  ? 'bg-white rounded-[24px] p-4 flex gap-4 cursor-pointer transition-all shadow-lg scale-[1.01] lg:scale-[1.02] z-10 ring-1 ring-black/5 relative'
                  : 'bg-white rounded-[24px] p-4 flex gap-4 cursor-pointer transition-all hover:bg-gray-50 opacity-70 relative'
                }
              >
                <img 
                  src={res.image || PLACEHOLDER_IMAGE} 
                  className={isActive ? 'w-24 h-24 lg:w-32 lg:h-32 rounded-[18px] object-cover' : 'w-24 h-24 lg:w-32 lg:h-32 rounded-[18px] object-cover grayscale-[30%]'} 
                  alt={res.name} 
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
                />

                <div className="flex flex-col justify-center flex-1">
                  <h3 className={`text-lg lg:text-xl leading-tight mb-1 font-bold ${isActive ? 'text-black' : 'text-gray-400'}`}>{res.name}</h3>
                  <p className={`text-xs lg:text-sm mb-3 line-clamp-1 ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>{res.address}</p>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 lg:gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className={star <= rating ? 'fill-[#2F54EB] text-[#2F54EB]' : 'fill-gray-100 text-gray-100'} />
                      ))}
                    </div>
                    <span className={`text-[10px] lg:text-xs font-medium ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>({reviewCount})</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(res.id);
                  }}
                  className="absolute top-5 right-5 p-1.5 transition-all active:scale-90 hover:opacity-80"
                >
                  <img 
                    src={isFavorite ? '/heart-filled.svg' : '/heart-empty.svg'} 
                    alt="Fav" 
                    className="w-5 h-5" 
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}