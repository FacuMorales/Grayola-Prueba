# Gestor de Proyectos de Diseño

Aplicación web para gestionar proyectos de diseño entre Clientes, Project Managers y Diseñadores.  
Permite crear proyectos, asignar diseñadores, subir archivos y gestionar el ciclo de vida de cada proyecto.

## 🚀 Tecnologías utilizadas

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)

---

## 🖥️ Instrucciones para ejecutar el proyecto localmente

### 1. Clona el repositorio

```bash
git clone https://github.com/FacuMorales/Grayola-Prueba.git
cd repositorio
```

### 2. Instala Dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo .env.local en la raíz del proyecto con las siguientes variables (obtenidas desde tu proyecto de Supabase):
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

### 4. Ejecuta la aplicación

```bash
npm run dev
```

### 5. Accede a la app en http://localhost:3000

---

## ⚙️ Estructura de la base de datos (Supabase)

### Tabla users:

- id (UUID)

- role (enum: 'cliente', 'pm', 'diseñador')

- email (text)

### Tabla projects:

- id (UUID)

- title (text)

- description (text)

- files (text[])

- created_by (FK: users.id)

- assigned_to (uuid[])

- created_at (timestamp)

---

## 🛠️ Breve explicación técnica

La aplicación fue desarrollada con Next.js (App Router) como framework base, combinando Tailwind CSS para los estilos y Supabase como backend (base de datos, autenticación y almacenamiento de archivos).

Autenticación y autorización:
Implementadas con Supabase, utilizando roles para controlar acceso a distintas funcionalidades.

Gestión de proyectos:
Los usuarios pueden crear proyectos, asignar diseñadores (mediante un campo assigned_to que almacena un array de UUIDs) y subir archivos asociados.

Interfaz moderna y accesible:
Utilizando componentes accesibles de Headless UI para modales y formularios, asegurando una experiencia fluida.

Optimización de consultas:
Se evita la sobrecarga de peticiones utilizando estados locales y actualizaciones puntuales tras cada acción (CRUD).

---

## ✨ Funcionalidades principales

- Registro e inicio de sesión con Supabase

- Creación y edición de proyectos

- Asignación de diseñadores

- Subida de archivos a proyectos

- Listado y gestión de proyectos según roles