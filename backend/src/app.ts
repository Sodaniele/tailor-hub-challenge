import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs'; 
import path from 'path'; 
import restaurantRoutes from './routes/restaurant.routes';
import authRoutes from './routes/auth.routes'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/auth', authRoutes); 

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running smoothly' });
});

// --- BLOQUE DE FAVORITOS ---
// Ajustamos la ruta para salir de 'src' y entrar en 'data'
const USERS_FILE = path.join(__dirname, '../data/users.json');

app.post('/api/favorites', (req, res) => {
  try {
    const { userId, restaurantId } = req.body;

    // 1. Si no existe el archivo, lo creamos vacío
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, '[]');
    }

    const fileContent = fs.readFileSync(USERS_FILE, 'utf-8');
    const users = JSON.parse(fileContent || '[]');

    // 2. Buscamos al usuario (usamos == para que valga "1" o 1)
    let userIndex = users.findIndex((u: any) => u.id == userId);

    // 3. Si el usuario no existe, lo creamos al vuelo (evita los tipicos errores 404)
    if (userIndex === -1) {
      const newUser = { id: userId, email: "user@demo.com", favorites: [] };
      users.push(newUser);
      userIndex = users.length - 1;
    }

    // 4. Lógica de poner/quitar
    let favs = users[userIndex].favorites || [];
    const targetId = Number(restaurantId); 

    if (favs.includes(targetId)) {
      favs = favs.filter((id: number) => id !== targetId); 
    } else {
      favs.push(targetId); 
    }

    // 5. Guardar cambios en el disco
    users[userIndex].favorites = favs;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    console.log(`Favoritos actualizados para usuario ${userId}:`, favs);
    res.json({ success: true, favorites: favs });

  } catch (error) {
    console.error("Error en favoritos:", error);
    res.status(500).json({ error: "Error al procesar favoritos" });
  }
});
// --- FIN BLOQUE DE FAVORITOS ---

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor profesional corriendo en: http://localhost:${PORT}`);
});