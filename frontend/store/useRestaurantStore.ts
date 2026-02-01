import { create } from 'zustand';
import axios from 'axios';

interface Restaurant {
  id: number;
  name: string;
  neighborhood: string;
  cuisine_type: string;
  image: string;
  address: string;
  reviews: any[];
  latitude?: number;
  longitude?: number;
}

interface RestaurantState {
  restaurants: Restaurant[];
  favorites: number[];
  loading: boolean;
  fetchRestaurants: () => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
  addRestaurant: (data: any) => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurants: [],
  favorites: [],
  loading: false,

  fetchRestaurants: async () => {
    // Si ya tenemos restaurantes, no ponemos loading para que no parpadee la pantalla y parezca que se borran
    if (get().restaurants.length === 0) set({ loading: true });
    
    try {
      const response = await axios.get('http://localhost:4000/api/restaurants');
      set({ restaurants: response.data });
    } catch (error) {
      console.error('Error fetch:', error);
    } finally {
      set({ loading: false });
    }
  },

  toggleFavorite: async (restaurantId: number) => {
    // Obtenemos los favoritos actuales
    const currentFavs = get().favorites || [];
    const isFav = currentFavs.includes(restaurantId);

    // Creamos la nueva lista
    const newFavs = isFav 
      ? currentFavs.filter(id => id !== restaurantId) 
      : [...currentFavs, restaurantId];

    // Actualizamos SOLO favoritos, manteniendo los restaurantes intactos
    set((state) => ({
      ...state, // Mantenemos el resto del estado (incluyendo restaurantes)
      favorites: newFavs
    }));

    // Sincronizamos con el backend en segundo plano
    try {
      await axios.post('http://localhost:4000/api/favorites', {
        userId: 1,
        restaurantId
      });
    } catch (error) {
      console.error('Error al guardar favorito en backend:', error);
    }
  },

  addRestaurant: async (newRestaurantData) => {
    const newRes = { id: Date.now(), reviews: [], ...newRestaurantData };
    set((state) => ({
      restaurants: [newRes, ...state.restaurants]
    }));
  },
}));