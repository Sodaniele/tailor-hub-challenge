'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout(); 
    router.push('/login'); 
  };

  const linkStyle = {
    fontFamily: 'Roobert, sans-serif',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '28px',
  };

  const buttonTextStyle = {
    fontFamily: 'Roobert, sans-serif',
    fontWeight: 600, 
    fontSize: '24px',
    lineHeight: '28px',
    color: '#0B0B0B', 
  };

  return (
    <nav className="w-full flex justify-center px-4 py-6 bg-transparent relative z-[9999]">
      <div className="w-full max-w-[1648px] flex justify-end">
        <div className="relative">
          
          {/* BOTÓN USUARIO */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-black font-normal text-[16px] hover:opacity-70 transition-opacity focus:outline-none"
          >
            <span>{user?.name || "Nombre usuario"}</span>
            <ArrowDown 
              size={16} 
              strokeWidth={1.5}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* MENÚ DESPLEGABLE */}
          {isOpen && (
            <>
              <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />

              <div className="absolute right-0 top-full mt-2 z-[9999]">
                <div 
                  className="w-[231px] [252px] bg-[#2F54EB] text-white shadow-2xl flex flex-col items-center pt-8 pb-6 px-4 gap-8 animate-in fade-in zoom-in-95 duration-200 origin-top-right"
                  style={{ borderRadius: '24px 0px 24px 24px' }}
                >
                  
                  {/* ENLACES */}
                  <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-4 text-white w-full">
                      <Link href="/account" onClick={() => setIsOpen(false)} className="hover:opacity-80 block" style={linkStyle}>
                        Mi cuenta
                      </Link>
                      <Link href="/restaurants/add" onClick={() => setIsOpen(false)} className="hover:opacity-80 block" style={linkStyle}>
                        Añadir restaurante
                      </Link>
                    </div>

                    {/* LÍNEA DIVISORIA */}
                    <div className="w-full h-[1px] bg-white opacity-20"></div>
                  </div>

                  {/* BOTÓN SALIR */}
                  <button 
                    onClick={handleLogout}
                    className="bg-white hover:bg-gray-100 transition-colors flex items-center justify-center rounded-full shadow-lg"
                    style={{
                      width: '199px',
                      height: '60px',
                      ...buttonTextStyle
                    }}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}