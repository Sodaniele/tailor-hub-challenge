import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos aca la interfaz de Request para incluir 'user'
export interface AuthRequest extends Request {
  user?: string | object;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Buscamos el token en la cabecera 'Authorization'
  const token = req.header('auth-token'); 

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Falta el token.' });
  }

  try {
    // 2. Verificamos que el token sea válido usando la clave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // 3. Guardamos los datos del usuario en la request para usarlos luego
    req.user = verified;
    
    // 4. Dejamos pasar a la siguiente función (la ruta)
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token no válido o expirado.' });
  }
};