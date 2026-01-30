import { Restaurant } from '../types/restaurant';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
            ★ {restaurant.rating}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {restaurant.description}
        </p>
        <p className="text-gray-400 text-xs mt-3 flex items-center">
          📍 {restaurant.address}
        </p>
      </div>
    </div>
  );
}