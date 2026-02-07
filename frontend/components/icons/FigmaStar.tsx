import React from 'react';

interface StarProps {
  filled: boolean;
  size?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export const FigmaStar = ({ filled, size = 16, onClick, onMouseEnter }: StarProps) => {
  return (
    <img
      // Lógica simple: Si está llena usa la azul, si no, la vacía
      src={filled ? "/star-filled.png" : "/star-empty.png"}
      alt={filled ? "★" : "☆"}
      
      // Control de tamaño
      width={size}
      height={size}
      
      // Eventos para la interacción 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      
      // Estilos para que no se deforme
      className={`object-contain select-none ${onClick ? "cursor-pointer active:scale-95 transition-transform" : ""}`}
      style={{ minWidth: size, minHeight: size }} 
      draggable={false}
    />
  );
};