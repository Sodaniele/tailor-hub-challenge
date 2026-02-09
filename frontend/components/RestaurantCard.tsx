import { Restaurant } from '../types/restaurant';
import { Heart } from 'lucide-react'; 
import { FigmaStar } from './icons/FigmaStar'; 

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  
  const rating = Math.round(restaurant.rating || 0);
  const reviewCount = restaurant.reviews ? restaurant.reviews.length : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
      {/* Botón de Favorito */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
        <Heart size={20} />
      </button>

      {/* Imagen */}
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-1">
        <div>
          <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{restaurant.name}</h3>
          <p className="text-gray-400 text-xs mb-2 truncate">
            {restaurant.address}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((index) => (
              <FigmaStar 
                key={index} 
                filled={index <= rating} 
                size={16} 
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-400 font-medium">
            ({reviewCount} comentarios)
          </span>
        </div>
      </div>
    </div>
  );
}