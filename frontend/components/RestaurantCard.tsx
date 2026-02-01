import { Restaurant } from '../types/restaurant';
import { Heart } from 'lucide-react'; 

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
      {/* Botón de Favorito */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
        <Heart size={20} />
      </button>

      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-semibold text-gray-700">{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-3 line-clamp-1">
          {restaurant.description}
        </p>
        
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <span>📍 {restaurant.address}</span>
        </div>
      </div>
    </div>
  );
}