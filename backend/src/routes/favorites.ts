import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper para leer usuarios
const getUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data || '[]');
};

// Helper para guardar usuarios
const saveUsers = (users: any[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// POST /api/favorites - Añadir o Quitar favorito
router.post('/', (req: Request, res: Response) => {
  const { userId, restaurantId } = req.body;

  let users = getUsers();
  
  // Busco al usuario (si no existe, lo creo al vuelo para que no falle)
  let user = users.find((u: any) => u.id === userId);
  
  if (!user) {
    user = { id: userId, email: "demo@test.com", favorites: [] };
    users.push(user);
  }

  // Aseguramos aca que tenga array de favoritos
  if (!user.favorites) {
    user.favorites = [];
  }

  // Si ya lo tiene, lo borra. Si no, lo añade.
  const index = user.favorites.indexOf(restaurantId);
  if (index === -1) {
    user.favorites.push(restaurantId); // Añadir
  } else {
    user.favorites.splice(index, 1);   // Quitar
  }

  // Guardamos en el disco
  saveUsers(users);

  res.json({ success: true, favorites: user.favorites });
});

export default router;