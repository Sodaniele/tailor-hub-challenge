import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/user.interface';

// Simulación de base de datos de usuarios
let users: User[] = [];

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
    favorites: []
  };

  users.push(newUser);
  res.status(201).json({ message: 'Usuario creado con éxito' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Crear el Token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: '1h' }
  );

  res.json({ token, user: { id: user.id, username: user.username, favorites: user.favorites } });
};