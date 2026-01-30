import { Request, Response } from 'express';
import restaurantsData from '../data/restaurants.json';
import { Restaurant } from '../interfaces/restaurant.interface';


let restaurants: Restaurant[] = [...restaurantsData];

export const getAllRestaurants = (req: Request, res: Response) => {
  res.json(restaurants);
};

export const getRestaurantById = (req: Request, res: Response) => {
  const { id } = req.params;
  
  
  const restaurant = restaurants.find(r => r.id === Number(id));
  
  if (!restaurant) {
    return res.status(404).json({ message: 'Restaurante no encontrado' });
  }
  
  res.json(restaurant);
};