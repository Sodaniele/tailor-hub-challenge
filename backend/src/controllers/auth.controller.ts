import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/user.interface';

// Aqui forcé a que el array acepte cualquier propiedad nueva como 'email'
let users: any[] = [
  {
    id: "1",
    username: "demo",
    email: "demo@test.com",
    password: "", 
    favorites: [1, 2]
  }
];

const initializeDemo = async () => {
    users[0].password = await bcrypt.hash("123", 10);
};
initializeDemo();

export const register = async (req: Request, res: Response) => {
  // Ahora recibimos el email desde el registro
  const { username, password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Aca buusco si el email ya existe en lugar del username
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'El email ya existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    username: username || email.split('@')[0], 
    email: email, 
    password: hashedPassword,
    favorites: []
  };

  users.push(newUser);
  res.status(201).json({ message: 'Usuario creado con éxito' });
};

export const login = async (req: Request, res: Response) => {
  
  const { email, password } = req.body;

  console.log("Intentando login con email:", email); 

  // 1. Busco el usuario por su EMAIL
  const user = users.find(u => u.email === email);

  // 2. Si no existe por ese email, error
  if (!user) {
    return res.status(401).json({ message: 'El email no está registrado' });
  }

  // 3. Comparo contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // 4. Crear el Token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: '1h' }
  );

  // 5. Devolvemos el usuario
  res.json({ 
    token, 
    user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        favorites: user.favorites 
    } 
  });
};