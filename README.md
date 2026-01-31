# 🍽️ Tailor Hub Challenge - Restaurants App

Este proyecto es una aplicación Fullstack desarrollada como prueba técnica, que permite la gestión de restaurantes, visualización en mapas interactivos y administración de reseñas.

---

## 🌟 Puntos de Bonificación Implementados

- ✅ **Autenticación JWT**: Flujo seguro de login y registro.
- ✅ **TypeScript 😍**: Tipado estricto en Frontend y Backend para un código profesional.
- ✅ **TailwindCSS**: Estilos modernos y optimizados.
- ✅ **Diseño Responsivo**: Interfaz 100% adaptada a móviles, tablets y escritorio.
- ✅ **Gestión de Estado Global**: Implementada con **Zustand**.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** Next.js 15 (App Router), TailwindCSS, Zustand, Mapbox GL, Axios, Lucide React.
- **Backend:** Node.js, Express, JWT, Bcrypt.

---

## 🚀 Instrucciones de Ejecución

Sigue estos pasos para levantar el proyecto localmente.

### 1. Clonar el repositorio

git clone [https://github.com/Sodaniele/tailor-hub-challenge.git](https://github.com/Sodaniele/tailor-hub-challenge.git)
cd tailor-hub-challenge

2. Configuración del Backend
   Entra en la carpeta del servidor:
   cd backend

Instala las dependencias:
npm install

Crea un archivo .env en la raíz de /backend y añade:
Fragmento de código

JWT_SECRET=tu_clave_secreta_aqui
PORT=4000

Inicia el servidor:
npm run dev

Servidor en: http://localhost:4000

3. Configuración del Frontend
   Abre otra terminal y entra en la carpeta del cliente:
   cd frontend

Instala las dependencias:
npm install

Inicia la aplicación:
npm run dev

Aplicación en: http://localhost:3000

✨ Características Principales:
Flujo de Usuario: Login/Registro -> Mapa -> Lista de Restaurantes -> Detalle -> Añadir Restaurante.

Mapa Dinámico: Localización exacta de restaurantes con pines interactivos.

CRUD Completo: Creación de establecimientos con subida de imagen y gestión de comentarios.

Página de Éxito: Feedback visual tras guardar nuevos registros en la ruta /restaurants/add/success.

📁 Estructura del Proyecto:

Plaintext

/
├── backend/ # API REST Node.js/Express
├── frontend/ # App Next.js 15
│ ├── app/ # Rutas y Lógica de páginas
│ ├── components/ # UI Reutilizable
│ └── store/ # Estado Global (Zustand)
└── README.md
