const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 4000;
const SECRET_KEY = 'tailor_hub_secret'; 
const DATA_FILE = path.join(__dirname, 'restaurants.json');

app.use(cors());
app.use(express.json());

// Helper robusto para leer la "base de datos"
const readDB = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initialData = { restaurants: [], users: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo restaurants.json:", error);
    return { restaurants: [], users: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- AUTH: Registro y Login ---
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  
  if (db.users.find(u => u.username === username)) {
    return res.status(400).json({ error: "El usuario ya existe" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = { 
    username, 
    password: hashedPassword, 
    favorites: [] 
  };

  db.users.push(newUser);
  writeDB(db);
  res.status(201).json({ message: "Usuario creado" });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '24h' });
  res.json({ token, username: user.username, favorites: user.favorites });
});

// --- CRUD: Restaurantes ---
app.get('/api/restaurants', (req, res) => {
  const db = readDB();
  res.json(db.restaurants);
});

app.post('/api/restaurants', (req, res) => {
  const db = readDB();
  const newRestaurant = {
    id: db.restaurants.length > 0 ? Math.max(...db.restaurants.map(r => r.id)) + 1 : 1,
    ...req.body,
    reviews: req.body.reviews || []
  };
  db.restaurants.push(newRestaurant);
  writeDB(db);
  res.status(201).json(newRestaurant);
});

app.delete('/api/restaurants/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  db.restaurants = db.restaurants.filter(r => r.id !== id);
  writeDB(db);
  res.status(204).send();
});

// --- CRUD: Comentarios (Reviews) ---
app.post('/api/restaurants/:id/reviews', (req, res) => {
  const db = readDB();
  const restaurantId = parseInt(req.params.id);
  const restaurant = db.restaurants.find(r => r.id === restaurantId);

  if (!restaurant) return res.status(404).json({ error: "Restaurante no encontrado" });

  const newReview = {
    name: req.body.username || "Anónimo",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    rating: req.body.rating || 5,
    comments: req.body.comments
  };

  if (!restaurant.reviews) restaurant.reviews = [];
  restaurant.reviews.push(newReview);
  writeDB(db);
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
  console.log(`📂 Base de datos: ${DATA_FILE}`);
});