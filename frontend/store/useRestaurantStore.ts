import { create } from 'zustand';
import axios from 'axios';
import { Restaurant, NewRestaurantInput } from '../types/restaurant';

interface RestaurantState {
  restaurants: Restaurant[];
  favorites: number[];
  loading: boolean;
  fetchRestaurants: () => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
  addRestaurant: (data: NewRestaurantInput) => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurants: [],
  favorites: [],
  loading: false,

  fetchRestaurants: async () => {
    if (get().restaurants.length === 0) set({ loading: true });
    
    try {
      const response = await axios.get<Restaurant[]>('http://localhost:4000/api/restaurants');
      set({ restaurants: response.data });
    } catch (error) {
      console.error('Error fetch:', error);
    } finally {
      set({ loading: false });
    }
  },

  toggleFavorite: async (restaurantId: number) => {
    const currentFavs = get().favorites || [];
    const isFav = currentFavs.includes(restaurantId);

    const newFavs = isFav 
      ? currentFavs.filter(id => id !== restaurantId) 
      : [...currentFavs, restaurantId];

    set((state) => ({
      ...state, 
      favorites: newFavs
    }));

    try {
      await axios.post('http://localhost:4000/api/favorites', {
        userId: 1,
        restaurantId
      });
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  },

  addRestaurant: async (newRestaurantData: NewRestaurantInput) => {
    const newRes: Restaurant = {
      id: Date.now(),
      reviews: [],
      neighborhood: 'Nuevo',
      cuisine_type: 'Variada',
      rating: 0, // Valor inicial
      ...newRestaurantData
    };

    set((state) => ({
      restaurants: [newRes, ...state.restaurants]
    }));
  },
}));