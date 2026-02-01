'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/NavBar';
import { ArrowLeft } from 'lucide-react';

export default function EditRestaurantPage() {
  const router = useRouter();
  const params = useParams();
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '', 
    image: '',
    cuisine_type: ''
  });

  // 1. Cargar aca los datos actuales del restaurante
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/restaurants/${params.id}`);
        // Relleno el formulario con lo que viene de la API
        setFormData({
          name: res.data.name || '',
          address: res.data.address || '',
          description: res.data.description || '', 
          image: res.data.image || '',
          cuisine_type: res.data.cuisine_type || ''
        });
      } catch (error) {
        console.error("Error cargando datos", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchData();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      // Llamada PUT al backend
      await axios.put(`http://localhost:4000/api/restaurants/${params.id}`, formData);
      alert("Restaurante actualizado correctamente");
      router.push(`/restaurants/${params.id}`); 
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <div className="min-h-screen w-full bg-white font-sans text-black pb-20">
      <Navbar />

      <div className="max-w-2xl mx-auto px-10 mt-10">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-black">
          <ArrowLeft size={20} /> Volver
        </button>

        <h1 className="text-3xl font-bold mb-8">Editar Restaurante</h1>

        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold mb-2">Nombre</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Dirección</label>
            <input 
              name="address" 
              value={formData.address} 
              onChange={handleInputChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Tipo de Cocina</label>
            <input 
              name="cuisine_type" 
              value={formData.cuisine_type} 
              onChange={handleInputChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">URL de la Imagen</label>
            <input 
              name="image" 
              value={formData.image} 
              onChange={handleInputChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
             {formData.image && <img src={formData.image} className="mt-4 w-32 h-32 object-cover rounded-lg" alt="Preview"/>}
          </div>

          <button 
            onClick={handleUpdate}
            className="w-full py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all mt-4"
          >
            GUARDAR CAMBIOS
          </button>

        </div>
      </div>
    </div>
  );
}