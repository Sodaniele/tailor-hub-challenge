import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
interface Review {
  name: string;
  rating: number;
  comments: string;
  date?: string;
}

interface Restaurant {
  id: number;
  name: string;
  address: string;
  description?: string;
  image: string;
  rating?: number;
  reviews?: Review[];
  [key: string]: any; 
}

const DATA_FILE = path.join(__dirname, '../../restaurants.json');

let restaurants: Restaurant[] = [];

try {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  const json = JSON.parse(data);
  restaurants = json.restaurants || [];
} catch (error) {
  console.error("Error al cargar el archivo JSON inicial:", error);
  restaurants = [];
}

export const getAllRestaurants = (req: Request, res: Response) => {
  res.json(restaurants);
};

export const getRestaurantById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string); 
  const restaurant = restaurants.find((r) => r.id === id); 

  if (!restaurant) {
    return res.status(404).json({ error: "Restaurante no encontrado" });
  }

  res.json(restaurant);
};

export const createRestaurant = (req: Request, res: Response) => {
  const newRestaurant: Restaurant = {
    id: Date.now(),
    reviews: [],
    rating: 0,
    ...req.body
  };
  
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
};

export const updateRestaurant = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const index = restaurants.findIndex((r) => r.id === id);

  if (index !== -1) {
    restaurants[index] = { ...restaurants[index], ...req.body };
    res.json(restaurants[index]);
  } else {
    res.status(404).json({ error: "Restaurante no encontrado" });
  }
};

export const deleteRestaurant = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const initialLength = restaurants.length;

  restaurants = restaurants.filter((r) => r.id !== id);

  if (restaurants.length < initialLength) {
    res.json({ message: "Restaurante eliminado correctamente" });
  } else {
    res.status(404).json({ error: "Restaurante no encontrado" });
  }
};

export const addReview = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const restaurant = restaurants.find((r) => r.id === id);

  if (restaurant) {
    if (!restaurant.reviews) restaurant.reviews = [];
    
    restaurant.reviews.push(req.body);
    
    res.status(201).json(restaurant);
  } else {
    res.status(404).json({ error: "Restaurante no encontrado" });
  }
};

export const deleteReview = (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.id as string);
  const reviewIndex = parseInt(req.params.index as string);

  const restaurant = restaurants.find((r) => r.id === restaurantId);

  if (restaurant && restaurant.reviews) {
    if (reviewIndex >= 0 && reviewIndex < restaurant.reviews.length) {
      restaurant.reviews.splice(reviewIndex, 1);
      res.json({ message: "Comentario eliminado", reviews: restaurant.reviews });
    } else {
      res.status(404).json({ error: "Comentario no encontrado" });
    }
  } else {
    res.status(404).json({ error: "Restaurante no encontrado" });
  }
};