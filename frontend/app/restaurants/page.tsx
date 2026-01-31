'use client';

import { useState, useEffect, useCallback } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Star } from 'lucide-react'; 
import { useRouter } from 'next/navigation'; 
import { useRestaurantStore } from '@/store/useRestaurantStore';

// 1. IMPORTAMOS EL NAVBAR
import Navbar from '@/components/NavBar';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic29kYW5pZWxlIiwiYSI6ImNtbDE5YXF4NDAxc3AzZ3F0ZnlldTVlb2kifQ.1myKvxq_xL0TTkz0ZQ0gYQ';

export default function RestaurantsListPage() {
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const loading = useRestaurantStore((state) => state.loading);
  const fetchRestaurants = useRestaurantStore((state) => state.fetchRestaurants);

  const router = useRouter(); 
  
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 11,
    pitch: 0,
    bearing: 0
  });

  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToRestaurant = useCallback(
    (res: any) => {
      const lat = parseFloat(res.latitude);
      const lng = parseFloat(res.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        setActiveId(res.id);
        setViewState((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          zoom: 15,
          transitionDuration: 1000,
        }));
      }

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
      
      {/* 2. AQUÍ ESTÁ EL NAVBAR AÑADIDO */}
      
      <Navbar />

      <div className="flex-1 flex gap-6 px-6 py-6 overflow-hidden">
        {/* MAPA */}
        <div className="w-1/2 h-full rounded-[32px] overflow-hidden shadow-2xl bg-gray-200">
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {restaurants.map((res: any) => {
              const lat = parseFloat(res.latitude);
              const lng = parseFloat(res.longitude);
              if (isNaN(lat) || isNaN(lng)) return null;

              const isActive = res.id === activeId;

              return (
                <Marker
                  key={res.id}
                  latitude={lat}
                  longitude={lng}
                  anchor="bottom"
                >
                  <div
                    onClick={() => {
                      setActiveId(res.id);
                      setViewState((prev) => ({
                        ...prev,
                        latitude: lat,
                        longitude: lng,
                        zoom: 14,
                      }));
                    }}
                    className={`cursor-pointer transition-all ${
                      isActive ? 'scale-110 z-50' : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={
                        isActive
                          ? '/pin-selected.png'
                          : '/pin-default.png'
                      }
                      className="w-12 drop-shadow-md"
                      alt="pin"
                    />
                  </div>
                </Marker>
              );
            })}
          </Map>
        </div>

        {/* LISTA DE RESTAURANTES */}
        <div className="w-1/2 h-full overflow-y-auto pr-2 space-y-4">
          {restaurants.map((res: any) => {
            const isActive = activeId === res.id;
            const rating = res.rating || 5;
            const reviewCount = res.reviews?.length || 0;

            // EFECTO FOCUS/DISFOCUS
            const titleClass = isActive ? 'text-black font-bold' : 'text-gray-400 font-bold';
            const textClass = isActive ? 'text-gray-700' : 'text-gray-400';
            const containerClass = isActive 
              ? 'bg-white rounded-[24px] p-4 flex gap-4 cursor-pointer transition-all shadow-lg scale-[1.02] z-10 ring-1 ring-black/5'
              : 'bg-white rounded-[24px] p-4 flex gap-4 cursor-pointer transition-all hover:bg-gray-50 opacity-70';

            const imgClass = isActive 
              ? 'w-32 h-32 rounded-[18px] object-cover'
              : 'w-32 h-32 rounded-[18px] object-cover grayscale-[30%]';

            return (
              <div
                key={res.id}
                onClick={() => goToRestaurant(res)}
                className={containerClass}
              >
                <img
                  src={res.image}
                  className={imgClass}
                  alt={res.name}
                />

                <div className="flex flex-col justify-center flex-1">
                  <h3 className={`text-xl leading-tight mb-1 transition-colors ${titleClass}`}>
                    {res.name}
                  </h3>
                  <p className={`text-sm mb-3 line-clamp-1 transition-colors ${textClass}`}>
                    {res.address}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={star <= rating 
                            ? 'fill-[#2F54EB] text-[#2F54EB]'
                            : 'fill-gray-100 text-gray-100'}
                        />
                      ))}
                    </div>
                    <span className={`text-xs font-medium transition-colors ${textClass}`}>
                      ({reviewCount} comentarios)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}