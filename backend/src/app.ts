import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs'; // Añadido para manejar el archivo de favoritos
import path from 'path'; // Añadido para las rutas de archivos
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

// --- BLOQUE DE FAVORITOS (Añadido) ---
const USERS_FILE = path.join(__dirname, '../data/users.json');

app.post('/api/favorites', (req, res) => {
  try {
    const { userId, restaurantId } = req.body;
    if (!fs.existsSync(USERS_FILE)) {
      return res.status(500).json({ error: "No existe el archivo de usuarios" });
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    let favs = users[userIndex].favorites || [];
    if (favs.includes(restaurantId)) {
      favs = favs.filter((id: any) => id !== restaurantId);
    } else {
      favs.push(restaurantId);
    }

    users[userIndex].favorites = favs;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ success: true, favorites: favs });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar favoritos" });
  }
});
// --- FIN BLOQUE DE FAVORITOS ---

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor profesional corriendo en: http://localhost:${PORT}`);
});