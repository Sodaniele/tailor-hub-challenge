import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import restaurantRoutes from './routes/restaurant.routes';
import authRoutes from './routes/auth.routes'; // 1. Descomentado

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/auth', authRoutes); // 2. Descomentado

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running smoothly' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor profesional corriendo en: http://localhost:${PORT}`);
});