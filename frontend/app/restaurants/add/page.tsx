'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import { useRestaurantStore } from '@/store/useRestaurantStore';

// 1. IMPORTAMOS EL NAVBAR COMPARTIDO
import Navbar from '@/components/NavBar';

export default function AddRestaurantPage() {
  const router = useRouter(); 
  const { addRestaurant } = useRestaurantStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. ESTADO PARA LOS DATOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    image: null as string | null
  });

  // Manejar subida de imagen
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

  // Manejar cambios en inputs de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. FUNCIÓN DE GUARDADO REAL
  const handleSave = async () => {
    if (!formData.name || !formData.address) {
        alert("Por favor, rellena al menos nombre y dirección.");
        return;
    }

    try {
      // Guardamos en el store
      await addRestaurant({
          name: formData.name,
          address: formData.address,
          description: formData.description,
          image: formData.image || "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80" 
      });

      // MODIFICACIÓN AQUÍ: Redirigimos a la página de éxito anidada
      router.push('/restaurants/add/success');

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un problema al guardar el restaurante.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col relative">
      
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-10 pb-20 max-w-7xl mx-auto w-full mt-10">
        
        <div className="mb-8 text-[#2F54EB]"><AsteriskIcon /></div>

        <div className="flex flex-col lg:flex-row gap-12 w-full items-start justify-center">
          
          {/* CUADRO DE IMAGEN CON BORDE NEGRO */}
          <div 
            onClick={() => !formData.image && fileInputRef.current?.click()}
            className="w-full max-w-[480px] aspect-square bg-[#F2F2F2] rounded-[24px] border border-black overflow-hidden flex items-center justify-center relative cursor-pointer"
          >
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

            {formData.image ? (
              <div className="relative w-full h-full group">
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
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
              <span className="text-black font-bold text-sm">Añadir imágen</span>
            )}
          </div>

          {/* FORMULARIO */}
          <div className="flex-1 max-w-md space-y-6">
            <div className="space-y-2">
              <label className="block text-black font-bold text-sm">Nombre de restaurante:</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text" 
                placeholder="Nombre del restaurante" 
                className="w-full px-6 py-2 rounded-full border border-black bg-white text-sm focus:outline-none placeholder:text-black" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-black font-bold text-sm">Dirección del restaurante</label>
              <input 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                type="text" 
                placeholder="Dirección" 
                className="w-full px-6 py-2 rounded-full border border-black bg-white text-sm focus:outline-none placeholder:text-black" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-black font-bold text-sm">Descripción del restaurante</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Escribe información acerca del restaurante" 
                className="w-full h-32 px-6 py-4 rounded-[24px] border border-black bg-white text-sm focus:outline-none resize-none placeholder:text-black" 
              />
            </div>

            <button 
              onClick={handleSave}
              className="px-10 py-2.5 rounded-full border border-black bg-white text-black font-bold text-sm hover:bg-black hover:text-white transition-all shadow-sm"
            >
              Guardar
            </button>
          </div>
        </div>

        <div className="mt-12 text-[#2F54EB]"><AsteriskIcon /></div>
      </main>

      <footer className="px-10 py-6 border-none text-center">
        <p className="text-[10px] text-black font-medium opacity-40">Prueba técnica ©Tailor hub SL 2019 - 2026</p>
      </footer>
    </div>
  );
}

function AsteriskIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22M12 2L12 22M2 12H22M2 12L22 12M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}