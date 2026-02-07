'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/NavBar';
import { Restaurant } from '@/types/restaurant';
import { StarRating } from '@/components/StarRating';

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [rating, setRating] = useState(0); 
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchRestaurant = async () => {
    try {
      const res = await axios.get<Restaurant>(`http://localhost:4000/api/restaurants/${params.id}`);
      setRestaurant(res.data);
    } catch (err) {
      console.error("Error al cargar restaurante", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) fetchRestaurant();
  }, [params.id]);

  const handleSubmitReview = async () => {
    if (!newComment || rating === 0) return alert("Por favor, añade una puntuación y un comentario");
    setSubmitting(true);
    try {
      await axios.post(`http://localhost:4000/api/restaurants/${params.id}/reviews`, {
        name: "Usuario Demo", 
        rating: rating,
        comments: newComment,
        date: new Date().toLocaleDateString('es-ES')
      });
      setNewComment("");
      setRating(0);
      await fetchRestaurant(); 
    } catch (err) {
      console.error("Error al enviar el comentario", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (index: number) => {
    if (confirm("¿Quieres borrar este comentario?")) {
      try {
        await axios.delete(`http://localhost:4000/api/restaurants/${params.id}/reviews/${index}`);
        await fetchRestaurant();
      } catch (error) {
        console.error("Error borrando review", error);
        alert("Hubo un error al intentar borrar el comentario.");
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este restaurante?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/restaurants/${params.id}`);
        router.push('/restaurants');
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al eliminar el restaurante.");
      }
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-[#2F54EB] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const displayReviews = restaurant?.reviews || [];

  return (
    <div className="min-h-screen w-full bg-white font-sans text-black">
      
      <Navbar />

      <div className="w-full flex justify-center mb-12 mt-6 px-4"> 
        <div className="relative w-full max-w-[1648px] h-[600px] rounded-[32px] overflow-hidden shadow-sm">
          <img src={restaurant?.image} className="w-full h-full object-cover brightness-50" alt="" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            
            <h1 className="text-[56px] leading-[64px] font-semibold mb-2 tracking-tight">
              {restaurant?.name}
            </h1>
            <p className="text-lg opacity-90 font-medium">{restaurant?.address}</p>
          </div>
        </div>
      </div>

      
      <div className="px-4 w-full max-w-[1366px] mx-auto flex flex-col lg:flex-row justify-between gap-[40px] mb-20">
        
        <div className="w-full lg:w-[944px] shrink-0">
          
          <p className="text-gray-600 text-[16px] leading-relaxed mb-12">
            {restaurant?.description 
              ? restaurant.description 
              : `Disfruta de la mejor comida ${restaurant?.cuisine_type || 'local'} en el corazón de ${restaurant?.neighborhood || 'la ciudad'}. Un lugar ideal para compartir con amigos y familia.`
            }
          </p>

          {/* LISTA DE RESEÑAS */}
          <div className="space-y-0">
            {displayReviews.length > 0 ? (
              displayReviews.map((review, i) => (
                <div key={i} className="border-t border-[#2F54EB] pt-10 pb-10 flex gap-8 items-start">
                  
                  {/* COLUMNA NOMBRE */}
                  <div className="w-[200px] shrink-0">
                      <h4 className="font-bold text-black text-[18px] leading-tight whitespace-pre-line">
                        {review.name}
                      </h4>
                  </div>

                  {/* COLUMNA CONTENIDO */}
                  <div className="flex-1">
                    <div className="flex justify-end mb-2">
                       <StarRating 
                         rating={review.rating || 5} 
                         readOnly={true}
                         size={14} 
                       />
                    </div>
                    
                    <p className="text-gray-700 text-[16px] leading-relaxed">
                      {review.comments}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic mb-12">No hay reseñas todavía. ¡Sé el primero en opinar!</p>
            )}
          </div>

          <div className="w-full flex justify-end gap-3 mt-8">
            <button 
              className="px-8 py-2.5 rounded-full border border-black bg-white text-black text-[14px] font-bold hover:bg-gray-50 transition-all shadow-sm"
              onClick={() => router.push(`/restaurants/${params.id}/edit`)}
            >
              Editar
            </button>
            
            <button 
              className="px-8 py-2.5 rounded-full border border-black bg-white text-black text-[14px] font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-all shadow-sm"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>

        {/* --- LADO DERECHO */}
        <div className="w-full lg:w-[382px] shrink-0">
          
          <div className="w-full h-[233px] rounded-[24px] border border-[#0B0B0B] p-[30px] bg-white sticky top-24 shadow-sm flex flex-col justify-between">
            
            {/* 1. Estrellas */}
            <div className="flex">
              <StarRating 
                rating={rating} 
                onChange={(val) => setRating(val)} 
                readOnly={false}
                size={20}
              />
            </div>

            {/* 2. Textarea */}
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario sobre el restaurante"
              className="w-full h-[80px] text-[16px] text-[#7D7D7D] bg-transparent resize-none focus:outline-none placeholder:text-[#7D7D7D] font-normal leading-relaxed py-1"
            />

           
            <div>
              <button 
                onClick={handleSubmitReview}
                disabled={submitting}
                className="w-[131px] h-[50px] rounded-full border border-[#0B0B0B] bg-white text-black text-[14px] font-bold hover:bg-black hover:text-white transition-all disabled:opacity-50"
              >
                {submitting ? '...' : 'Enviar'}
              </button>
            </div>

          </div>
        </div>
      </div>
      
      <footer className="px-10 py-6 border-t border-gray-100 max-w-[1648px] mx-auto">
        <p className="text-[10px] text-black font-medium opacity-50 tracking-tight">Prueba técnica ©Tailor hub SL 2019 - 2026</p>
      </footer>
    </div>
  );
}