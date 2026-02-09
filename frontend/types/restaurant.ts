export interface Review {
  name: string;
  date: string;
  rating: number;
  comments: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  image: string;
  
  
description?: string;
  rating?: number;
  
  reviews: Review[];        
  neighborhood?: string;    
  cuisine_type?: string;    
  latitude?: number;        
  longitude?: number;       
  operating_hours?: Record<string, string>;
}

export interface NewRestaurantInput {
  name: string;
  address: string;
  description: string;
  image: string;
}