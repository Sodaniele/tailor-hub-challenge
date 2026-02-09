'use client';

import { useState } from 'react';
import { FigmaStar } from './icons/FigmaStar'; 

interface StarRatingProps {
  rating: number;             
  onChange?: (val: number) => void; 
  readOnly?: boolean;         
  size?: number;             
}

export const StarRating = ({ rating, onChange, readOnly = false, size = 20 }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div 
      className="flex gap-1" 
      
      onMouseLeave={() => !readOnly && setHoverRating(0)} 
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
     
       const isFilled = (hoverRating || rating) >= starIndex;

        return (
          <div
            key={starIndex}
            
            className={!readOnly ? "cursor-pointer" : "cursor-default"}
            
            onMouseEnter={() => !readOnly && setHoverRating(starIndex)}
            onClick={() => !readOnly && onChange && onChange(starIndex)}
          >
            <FigmaStar 
              filled={isFilled} 
              size={size} 
            />
          </div>
        );
      })}
    </div>
  );
};