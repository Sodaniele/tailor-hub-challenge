'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react'; 
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/NavBar';

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchRestaurant = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/restaurants/${params.id}`);
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

  // FUNCIÓN PARA BORRAR REVIEW ESPECÍFICA
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

      {/* HERO SECTION */}
      <div className="px-10 mb-8 mt-6"> 
        <div className="relative w-full h-[380px] rounded-[30px] overflow-hidden shadow-sm">
          <img src={restaurant?.image} className="w-full h-full object-cover brightness-50" alt="" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl font-bold mb-1 uppercase tracking-tight">{restaurant?.name}</h1>
            <p className="text-sm opacity-90 font-medium">{restaurant?.address}</p>
          </div>
        </div>
      </div>

      <div className="px-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* LADO IZQUIERDO: DESCRIPCIÓN Y REVIEWS */}
        <div className="flex-1">
          <p className="text-gray-600 text-[14px] leading-relaxed mb-12 max-w-3xl">
            {restaurant?.description 
              ? restaurant.description 
              : `Disfruta de la mejor comida ${restaurant?.cuisine_type || 'local'} en el corazón de ${restaurant?.neighborhood || 'la ciudad'}. Un lugar ideal para compartir con amigos y familia.`
            }
          </p>

          <div className="space-y-0">
            {displayReviews.length > 0 ? (
              displayReviews.map((review: any, i: number) => (
                <div key={i} className="border-t border-[#2F54EB] pt-12 pb-8 flex gap-4 items-start">
                  
                  <div className="w-40 shrink-0">
                      <h4 className="font-bold text-black text-[16px] leading-6 whitespace-pre-line">
                        {review.name}
                      </h4>
                      {review.date && <span className="text-xs text-gray-400 block mt-1">{review.date}</span>}
                      
                      
                      <button 
                        onClick={() => handleDeleteReview(i)}
                        className="text-[10px] !text-black underline mt-2 cursor-pointer font-medium hover:text-gray-600 block"
                      >
                        Borrar comentario
                      </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-end gap-0.5 mb-0 h-0 relative -top-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={13} className={`${s <= (review.rating || 5) ? 'fill-[#2F54EB] text-[#2F54EB]' : 'fill-gray-200 text-gray-200'}`} />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 text-[14px] leading-6">
                      {review.comments}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No hay reseñas todavía. ¡Sé el primero en opinar!</p>
            )}
          </div>
        </div>

        {/* LADO DERECHO: FORMULARIO */}
        <div className="w-full md:w-[320px] shrink-0">
          <div className="rounded-[20px] border border-gray-400 p-6 bg-white sticky top-24 shadow-sm">
            
            <div className="flex gap-1.5 mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star 
                  key={s} 
                  onClick={() => setRating(s)}
                  size={18}
                  className={`cursor-pointer transition-colors ${
                    s <= rating ? 'fill-[#2F54EB] text-[#2F54EB]' : 'text-gray-200'
                  }`} 
                />
              ))}
            </div>

            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario sobre el restaurante"
              className="w-full h-12 text-[14px] text-gray-800 bg-transparent resize-none focus:outline-none placeholder:text-gray-400 font-medium mb-6"
            />

            <button 
              onClick={handleSubmitReview}
              disabled={submitting}
              className="px-8 py-1.5 rounded-full border border-black text-black text-[13px] font-bold hover:bg-black hover:text-white transition-all disabled:opacity-30"
            >
              {submitting ? '...' : 'Enviar'}
            </button>
          </div>
        </div>
      </div>

      {/* BOTONES DE ACCIÓN GLOBAL */}
      <div className="flex justify-center gap-4 mt-12 mb-10">
        <button 
          className="px-10 py-2 rounded-full border border-black text-black text-[13px] font-bold hover:bg-black hover:text-white transition-all shadow-sm"
          onClick={() => router.push(`/restaurants/${params.id}/edit`)}
        >
          EDITAR
        </button>
        
        <button 
          className="px-10 py-2 rounded-full border border-black text-black text-[13px] font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
          onClick={handleDelete}
        >
          ELIMINAR
        </button>
      </div>
      
      <footer className="px-10 py-6 border-t border-gray-100">
        <p className="text-[10px] text-black font-medium opacity-50 tracking-tight">Prueba técnica ©Tailor hub SL 2019 - 2026</p>
      </footer>
    </div>
  );
}