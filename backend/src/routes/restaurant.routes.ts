import { Router } from 'express';
import { getAllRestaurants, getRestaurantById } from '../controllers/restaurant.controller';

const router = Router();

// Definimos los "caminos" para los restaurantes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

export default router;