import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Ruta al archivo JSON
const DATA_FILE = path.join(__dirname, '../../restaurants.json');

// --- CARGA INICIAL DE DATOS ---
// Leemos el archivo UNA VEZ al arrancar y lo guardamos en memoria.
// Esto lo que hace es que evita errores de lectura/escritura constantes.
let restaurants: any[] = [];

try {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  const json = JSON.parse(data);
  // Aseguro que accedo a la propiedad .restaurants del JSON
  restaurants = json.restaurants || [];
} catch (error) {
  console.error("Error al cargar el archivo JSON inicial:", error);
  restaurants = []; // Si falla, inicio vacío para que no se rompa el servidor
}

// --- 1. GET ALL ---
export const getAllRestaurants = (req: Request, res: Response) => {
  res.json(restaurants);
};

// --- 2. GET BY ID ---
export const getRestaurantById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string); 
  const restaurant = restaurants.find((r: any) => r.id === id);

  if (!restaurant) {
    return res.status(404).json({ error: "Restaurante no encontrado" });
  }

  res.json(restaurant);
};

// --- 3. CREATE ---
export const createRestaurant = (req: Request, res: Response) => {
  const newRestaurant = {
    id: Date.now(), // Genero aca un ID numérico único
    reviews: [],    // Array de reviews vacío por defecto
    rating: 0,
    ...req.body     // Los datos que vienen del frontend (el nombre, la dirección...)
  };
  
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
};

// --- 4. UPDATE ---
export const updateRestaurant = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const index = restaurants.findIndex((r: any) => r.id === id);

  if (index !== -1) {
    restaurants[index] = { ...restaurants[index], ...req.body };
    res.json(restaurants[index]);
  } else {
    res.status(404).json({ error: "Restaurante no encontrado" });
  }
};

// --- 5. DELETE ---
export const deleteRestaurant = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const initialLength = restaurants.length;

  // Filtro el array para borrar el que tenga ese ID
  restaurants = restaurants.filter((r: any) => r.id !== id);

  if (restaurants.length < initialLength) {
    res.json({ message: "Restaurante eliminado correctamente" });
  } else {
    res.status(404).json({ error: "Restaurante no encontrado" });
  }
};

// --- 6. ADD REVIEW ---
export const addReview = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const restaurant = restaurants.find((r: any) => r.id === id);

  if (restaurant) {
    if (!restaurant.reviews) restaurant.reviews = [];
    
    // Sumo la review que viene del frontend
    restaurant.reviews.push(req.body);
    
    res.status(201).json(restaurant);
  } else {
    res.status(404).json({ error: "Restaurante no encontrado" });
  }
};

// --- 7. DELETE REVIEW ---
export const deleteReview = (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id as string);
  const reviewIndex = parseInt(req.params.index as string);

  const restaurant = restaurants.find((r: any) => r.id === restaurantId);

  if (restaurant && restaurant.reviews) {
    // Verifico que el índice exista
    if (reviewIndex >= 0 && reviewIndex < restaurant.reviews.length) {
      // Borro aca 1 elemento en esa posición
      restaurant.reviews.splice(reviewIndex, 1);
      res.json({ message: "Comentario eliminado", reviews: restaurant.reviews });
    } else {
      res.status(404).json({ error: "Comentario no encontrado" });
    }
  } else {
    res.status(404).json({ error: "Restaurante no encontrado" });
  }
};