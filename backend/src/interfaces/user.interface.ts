// src/interfaces/user.interface.ts

export interface User {
  id: string;
  username: string;
  password: string;
  favorites: number[]; 
}