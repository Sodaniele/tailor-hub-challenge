import React from 'react';

export const ListStar = ({ size = 16 }: { size?: number }) => {
  return (
    <img
      src="/star-list.png" 
      alt="★"
      width={size}
      height={size}
      className="object-contain select-none"
      draggable={false}
    />
  );
};