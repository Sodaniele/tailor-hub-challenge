import { Router } from 'express';
// Importamos todas las funciones del controlador
import { 
  getAllRestaurants, 
  getRestaurantById, 
  createRestaurant, 
  updateRestaurant, 
  deleteRestaurant, 
  addReview,
  deleteReview 
} from '../controllers/restaurant.controller';

const router = Router();

// --- DEFINICIÓN DE RUTAS (CRUD COMPLETO) ---

// GET (Leer)
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// POST (Crear) - Usado en /add
router.post('/', createRestaurant);

// PUT (Editar) 
router.put('/:id', updateRestaurant);

// DELETE (Borrar) - Usado en el botón ELIMINAR
router.delete('/:id', deleteRestaurant);

// POST (Comentarios)
router.post('/:id/reviews', addReview);

// DELETE (Borrar Comentario) - Requisito CRUD Comentarios
router.delete('/:id/reviews/:index', deleteReview); 

export default router;