export interface User {
  id: string;
  username: string;
  password: string; // La guardaremos encriptada
  favorites: number[]; // Array de IDs de los restaurantes favoritos
}