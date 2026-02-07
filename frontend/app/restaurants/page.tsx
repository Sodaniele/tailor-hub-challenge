'use client';

import { useState, useEffect, useCallback } from 'react';
import Map, { Marker, ViewStateChangeEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/navigation'; 
import { useRestaurantStore } from '@/store/useRestaurantStore';
import Navbar from '@/components/NavBar';
import { Restaurant } from '@/types/restaurant'; 
import { ListStar } from '@/components/icons/ListStar';

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
    latitude: 40.7128, longitude: -74.0060, zoom: 11, pitch: 0, bearing: 0
  });

  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const goToRestaurant = useCallback(
    (res: Restaurant) => {
      setActiveId(res.id);
      setViewState((prev) => ({
        ...prev,
        latitude: res.latitude || 40.7128,
        longitude: res.longitude || -74.0060,
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

  const isAnyActive = activeId !== null;

  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col overflow-hidden relative font-sans">
      <Navbar />

      <div className="flex-1 w-full max-w-[1648px] mx-auto flex flex-col lg:flex-row gap-[40px] px-4 py-6 overflow-hidden relative pb-12">
        
        {/* MAPA */}
        <div className="w-full h-[40vh] lg:w-1/2 lg:h-full rounded-[32px] overflow-hidden shadow-sm border border-gray-200 bg-gray-200 flex-shrink-0 relative">
          <Map
            {...viewState}
            onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {restaurants.map((res) => {
              const isActive = res.id === activeId;
              const lat = res.latitude || 0;
              const lng = res.longitude || 0;
              if (lat === 0 && lng === 0) return null;

              return (
                <Marker key={res.id} latitude={lat} longitude={lng} anchor="bottom">
                  <div
                    onClick={() => {
                      setActiveId(res.id);
                      setViewState((prev) => ({ ...prev, latitude: lat, longitude: lng, zoom: 14 }));
                    }}
                    className={`cursor-pointer transition-all duration-300 ${isActive ? 'scale-110 z-50' : 'hover:scale-105 opacity-90 hover:opacity-100'}`}
                  >
                    <img src={isActive ? '/pin-selected.png' : '/pin-default.png'} className="w-12 drop-shadow-lg" alt="pin" />
                  </div>
                </Marker>
              );
            })}
          </Map>
        </div>

        {/* LISTA PANEL ÚNICO */}
        <div className="w-full lg:w-1/2 h-full bg-white rounded-[32px] shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-y-auto h-full pr-1 custom-scrollbar">
            {restaurants.map((res, index) => {
              const isActive = activeId === res.id;
              const reviewCount = res.reviews?.length || 0;
              const isFavorite = favorites?.includes(res.id);
              const isDimmed = isAnyActive && !isActive;

              return (
                <div 
                  key={res.id} 
                  onClick={() => goToRestaurant(res)} 
                  className={`
                    p-3 flex gap-4 cursor-pointer transition-all duration-300 relative items-center
                    ${index !== restaurants.length - 1 ? 'border-b border-gray-100' : ''}
                    ${isActive ? 'bg-gray-50/80 z-10' : 'hover:bg-gray-50/50'}
                    ${isDimmed ? 'opacity-40 grayscale-[50%]' : 'opacity-100'}
                  `}
                >
                  <img 
                    src={res.image || PLACEHOLDER_IMAGE} 
                    className={`
                       w-[100px] h-[100px] rounded-[16px] object-cover shadow-sm shrink-0 transition-all duration-300
                       ${isActive ? 'scale-[1.02]' : ''}
                    `}
                    alt={res.name} 
                    onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
                  />

                  <div className="flex flex-col justify-center flex-1 py-1 min-w-0">
                    <h3 className={`text-[18px] leading-tight mb-1 font-semibold tracking-tight truncate transition-colors ${isActive ? 'text-black' : 'text-gray-800'}`}>
                      {res.name}
                    </h3>
                    
                    <p className="text-[13px] text-[#7D7D7D] font-normal mb-2 truncate">
                      {res.address}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <div key={idx}>
                             <ListStar size={14} />
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-[#7D7D7D] ml-1">
                        ({reviewCount} comentarios)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(res.id);
                    }}
                    className={`
                      absolute top-3 right-3 p-2 transition-all active:scale-90 hover:opacity-70
                      ${isDimmed ? 'opacity-20' : 'opacity-100'}
                    `}
                  >
                    <img 
                      src={isFavorite ? '/heart-filled.svg' : '/heart-empty.svg'} 
                      alt="Fav" 
                      className="w-4 h-4" 
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-2 left-4">
          <p className="text-[10px] text-gray-400 font-medium tracking-tight">
            Prueba técnica ©Tailor hub SL 2019 - 2026
          </p>
        </div>
      </div>
    </div>
  );
}