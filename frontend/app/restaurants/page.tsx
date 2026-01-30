'use client';

import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Star, ChevronDown, MapPin } from 'lucide-react';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic29kYW5pZWxlIiwiYSI6ImNtbDE5YXF4NDAxc3AzZ3F0ZnlldTVlb2kifQ.1myKvxq_xL0TTkz0ZQ0gYQ';

const RESTAURANTS = [
  {
    id: 1,
    name: 'Goiko Grill',
    address: 'Calle del Prado, 12, Madrid',
    rating: 5,
    reviews: 120,
    image:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.4167,
    longitude: -3.695,
  },
  {
    id: 2,
    name: 'Sushi Bar',
    address: 'Gran Vía, 45, Madrid',
    rating: 4,
    reviews: 85,
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.4203,
    longitude: -3.7058,
  },
  {
    id: 3,
    name: 'La Tagliatella',
    address: 'Paseo de la Castellana, 89',
    rating: 3,
    reviews: 40,
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.4125,
    longitude: -3.71,
  },
  {
    id: 4,
    name: 'SteakHouse 89',
    address: 'Calle de Alcalá, 200',
    rating: 5,
    reviews: 210,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.418,
    longitude: -3.685,
  },
  {
    id: 5,
    name: 'Casa Paco',
    address: 'Malasaña, Madrid',
    rating: 4,
    reviews: 66,
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.425,
    longitude: -3.704,
  },
  {
    id: 6,
    name: 'El Rincón Vegano',
    address: 'Lavapiés, Madrid',
    rating: 5,
    reviews: 98,
    image:
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.409,
    longitude: -3.701,
  },
  {
    id: 7,
    name: 'Burgers & Co',
    address: 'Chamberí, Madrid',
    rating: 4,
    reviews: 44,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.434,
    longitude: -3.704,
  },
  {
    id: 8,
    name: 'Pasta Fresca',
    address: 'Barrio Salamanca',
    rating: 3,
    reviews: 32,
    image:
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.427,
    longitude: -3.688,
  },
  {
    id: 9,
    name: 'Tacos MX',
    address: 'La Latina',
    rating: 5,
    reviews: 150,
    image:
      'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.4105,
    longitude: -3.707,
  },
  {
    id: 10,
    name: 'Café Central',
    address: 'Sol, Madrid',
    rating: 4,
    reviews: 210,
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.417,
    longitude: -3.703,
  },
  {
    id: 11,
    name: 'Fusion Nikkei',
    address: 'Retiro',
    rating: 5,
    reviews: 77,
    image:
      'https://images.unsplash.com/photo-1555992336-03a23c4a9f5d?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.414,
    longitude: -3.689,
  },
  {
    id: 12,
    name: 'Street Wok',
    address: 'Argüelles',
    rating: 4,
    reviews: 59,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop',
    latitude: 40.4305,
    longitude: -3.715,
  },
];


export default function RestaurantsPage() {
  const [viewState, setViewState] = useState({
    latitude: 40.4168,
    longitude: -3.7038,
    zoom: 13,
  });

  const [activeRestaurantId, setActiveRestaurantId] = useState<number | null>(
    null
  );

  const handleSelectRestaurant = (restaurant: any) => {
    setActiveRestaurantId(restaurant.id);
    setViewState({
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      zoom: 14,
    });
  };

  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col font-sans overflow-hidden">
      {/* HEADER */}
      <header className="flex justify-end items-center px-8 py-6 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-black transition-colors">
          <span className="font-medium text-sm">Nombre usuario</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </header>

      <div className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden">
        {/* MAPA */}
        <div className="w-1/2 h-full rounded-[32px] overflow-hidden relative shadow-lg bg-slate-800">
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {RESTAURANTS.map((restaurant) => {
              const isActive = restaurant.id === activeRestaurantId;

              return (
                <Marker
                  key={restaurant.id}
                  latitude={restaurant.latitude}
                  longitude={restaurant.longitude}
                  anchor="bottom"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    handleSelectRestaurant(restaurant);
                  }}
                >
                  <div
                    className={`transition-all cursor-pointer drop-shadow-md ${
                      isActive ? 'scale-125' : 'hover:scale-110'
                    }`}
                  >
                    <MapPin
                      className={`w-8 h-8 ${
                        isActive
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-[#2F54EB] text-white'
                      }`}
                    />
                  </div>
                </Marker>
              );
            })}
          </Map>
        </div>

        {/* LISTA */}
        <div className="w-1/2 h-full overflow-y-auto pr-2 space-y-4 scrollbar-hide">
          {RESTAURANTS.map((restaurant) => {
            const isActive = restaurant.id === activeRestaurantId;
            const isDimmed =
              activeRestaurantId !== null && !isActive;

            return (
              <div
                key={restaurant.id}
                className={`transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : isDimmed ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="bg-white rounded-[24px] p-4 flex gap-4 shadow-sm">
                  <div className="w-32 h-32 shrink-0 rounded-[20px] overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {restaurant.address}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= restaurant.rating
                                ? 'fill-[#2F54EB] text-[#2F54EB]'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        ({restaurant.reviews} comentarios)
                      </span>
                    </div>
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
