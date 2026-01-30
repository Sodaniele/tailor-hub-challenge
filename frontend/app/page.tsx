'use client';
import { useEffect, useState } from 'react';
import { Restaurant } from '../types/restaurant';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    // Llamada a tu backend profesional
    fetch('http://localhost:4000/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error("Error cargando restaurantes:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Tailor Hub Restaurants</h1>
        <p className="text-gray-600 mt-2">Explora los mejores lugares para comer.</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((item) => (
            <RestaurantCard key={item.id} restaurant={item} />
          ))}
        </div>
      </main>
    </div>
  );
}