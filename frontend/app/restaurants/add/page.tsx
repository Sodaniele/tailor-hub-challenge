'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import { useRestaurantStore } from '@/store/useRestaurantStore';
import Navbar from '@/components/NavBar';
import { NewRestaurantInput } from '@/types/restaurant';

export default function AddRestaurantPage() {
  const router = useRouter(); 
  const { addRestaurant } = useRestaurantStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    image: null as string | null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.address || !formData.description) {
        router.push('/restaurants/add/error');
        return;
    }

    try {
      const newRestaurantData: NewRestaurantInput = {
          name: formData.name,
          address: formData.address,
          description: formData.description,
          image: formData.image || "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80" 
      };

      await addRestaurant(newRestaurantData);
      router.push('/restaurants/add/success');
    } catch (error) {
      console.error("Error al guardar:", error);
      router.push('/restaurants/add/error');
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center px-6 py-10 md:py-16 max-w-[1648px] mx-auto w-full">
        
        {/* LOGO SUPERIOR */}
        <div className="mb-12 shrink-0">
          <img 
            src="/logo-azul.png" 
            alt="Tailor Hub Logo" 
            style={{ width: '194px', height: '44px', objectFit: 'contain' }} 
          />
        </div>

        {/* CONTENEDOR LADO A LADO */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20 w-full items-center md:items-start justify-center">
          
          {/* FOTO */}
          <div 
            onClick={() => !formData.image && fileInputRef.current?.click()}
            className="w-full max-w-[480px] aspect-square bg-[#F2F2F2] rounded-[32px] border border-black overflow-hidden flex items-center justify-center relative cursor-pointer shrink-0"
          >
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

            {formData.image ? (
              <div className="relative w-full h-full group">
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        setFormData({ ...formData, image: null }); 
                    }}
                    className="px-8 py-2 border border-white rounded-full text-white font-bold text-sm backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ) : (
              // Texto "Añadir imagen" sin negrita (font-normal)
              <span className="text-black font-normal text-sm">Añadir imagen</span>
            )}
          </div>

          {/* FORMULARIO */}
          <div className="w-full max-w-[504px] flex flex-col space-y-6">
            <div className="space-y-2">
              <label className="block text-black font-bold text-[14px] uppercase ml-1">Nombre de restaurante:</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text" 
                placeholder="Nombre del restaurante" 
                style={{ color: '#000000', opacity: 1, WebkitTextFillColor: '#000000' }}
                className="w-full h-[48px] px-6 rounded-full border border-black bg-white text-[14px] focus:outline-none placeholder:text-black/40" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-black font-bold text-[14px] uppercase ml-1">Dirección del restaurante:</label>
              <input 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                type="text" 
                placeholder="Dirección" 
                style={{ color: '#000000', opacity: 1, WebkitTextFillColor: '#000000' }}
                className="w-full h-[48px] px-6 rounded-full border border-black bg-white text-[14px] focus:outline-none placeholder:text-black/40" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-black font-bold text-[14px] uppercase ml-1">Descripción del restaurante:</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Escribe información acerca del restaurante" 
                style={{ color: '#000000', opacity: 1, WebkitTextFillColor: '#000000' }}
                className="w-full h-32 px-6 py-4 rounded-[24px] border border-black bg-white text-[14px] focus:outline-none resize-none placeholder:text-black/40" 
              />
            </div>

            <div className="flex justify-start pt-2">
              <button 
                onClick={handleSave}
                style={{
                  width: '154px',
                  height: '60px',
                  borderRadius: '9999px',
                }}
                className="border border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 uppercase flex items-center justify-center"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>

        {/* LOGO INFERIOR */}
        <div className="mt-16 shrink-0">
          <img 
            src="/logo-azul.png" 
            alt="Tailor Hub Logo" 
            style={{ width: '194px', height: '44px', objectFit: 'contain' }} 
          />
        </div>
      </main>

      <footer className="w-full py-6 text-center shrink-0">
        <p className="text-[10px] text-black font-bold uppercase tracking-tight">
          Prueba técnica ©Tailor hub SL 2019 - 2026
        </p>
      </footer>
    </div>
  );
}