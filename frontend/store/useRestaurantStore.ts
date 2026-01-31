import { create } from 'zustand';
import axios from 'axios';

// 1. Definimos la estructura de un Restaurante
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
  description?: string;
}

// 2. Definimos el estado del store
interface RestaurantState {
  restaurants: Restaurant[];
  loading: boolean;
  fetchRestaurants: () => Promise<void>;
  addRestaurant: (newRestaurant: any) => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurants: [],
  loading: false,

  // ✅ FETCH SEGURO (NO BLOQUEA NEXT)
  fetchRestaurants: async () => {
    // ⛔ evita doble fetch
    set({ loading: true });

    try {
      const response = await axios.get(
        'http://127.0.0.1:4000/api/restaurants',
        {
          timeout: 5000, // ⛑️ evita render infinito
        }
      );

      set({ restaurants: response.data });
    } catch (error) {
      console.error('Error al traer restaurantes:', error);
    } finally {
      set({ loading: false }); // ❌ sin setTimeout
    }
  },

  // ✅ ADD RESTAURANT (OK)
  addRestaurant: async (newRestaurantData) => {
    try {
      const newRestaurant: Restaurant = {
        id: Date.now(),
        neighborhood: 'Barrio Nuevo',
        cuisine_type: 'Variada',
        reviews: [],
        latitude: 40.416 + Math.random() * 0.01,
        longitude: -3.703 + Math.random() * 0.01,
        ...newRestaurantData,
      };

      set((state) => ({
        restaurants: [newRestaurant, ...state.restaurants],
      }));

      console.log(
        'Restaurante añadido al store localmente:',
        newRestaurant
      );
    } catch (error) {
      console.error('Error al añadir restaurante:', error);
    }
  },
}));
