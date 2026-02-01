# 🍽️ Tailor Hub Challenge - Restaurants App

Este proyecto es una aplicación Fullstack desarrollada como prueba técnica, que permite la gestión de restaurantes, visualización en mapas interactivos y administración de reseñas.

---

## 🌟 Puntos de Bonificación Implementados

- ✅ **Sistema de Favoritos**: Persistencia de restaurantes favoritos por usuario
- ✅ **Autenticación JWT**: Flujo seguro de login y registro.
- ✅ **TypeScript 😍**: Tipado estricto en Frontend y Backend para un código profesional.
- ✅ **TailwindCSS**: Estilos modernos y optimizados.
- ✅ **Diseño Responsivo**: Interfaz 100% adaptada a móviles, tablets y escritorio.
- ✅ **Gestión de Estado Global**: Implementada con **Zustand** para una experiencia de usuario fluida y sin recargas innecesarias.

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

🎯 Guía de Usuario: ¿Qué puedes hacer?
Para evaluar la aplicación al 100%, te recomendamos seguir este flujo:

- Registro y Login: Crea una cuenta nueva para generar tu propio perfil de usuario.
- Explorar el Mapa: Navega por el mapa interactivo de New York. Haz clic en los pines para localizar restaurantes.
  Gestionar Favoritos:
- Haz clic en el icono del corazón de cualquier tarjeta de restaurante.
- Verás cómo el contador de la esquina superior izquierda se actualiza en tiempo real.
- Los favoritos persisten incluso si refrescas la página (se guardan en el servidor).
- Ver Detalles: Haz clic en una tarjeta para ver la información extendida y las reseñas de otros usuarios.
- Añadir Restaurante: Ve a la sección de añadir, completa el formulario con una imagen y recibe el feedback visual en la página de éxito. Si hay error, te redirigue a la pagina de error.
- Dejar Reseñas: Comparte tu opinión en los restaurantes existentes.
- Eliminar restaurante: Se puede eliminar un restaurante si seleccionas eliminar debajo de todo en su detalle
- Editar restaurante: Se puede editar un restaurante si seleccionas editar debajo de todo en su detalle. Se abrirá una pagina nueva para poder editarlo.
