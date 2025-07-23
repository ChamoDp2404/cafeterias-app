# Sistema de Gestión de Cafeterías ☕️

Autor:Del Pozo Castro Samir Aldair

Este proyecto **Cafeterías App** es una aplicación web desarrollada en Angular que permite gestionar una lista de cafeterías y sus productos, incluyendo funcionalidades de autenticación con Firebase y control de acceso basado en roles (admin/usuario). Está pensada como parte de un proyecto educativo para demostrar el uso de Angular Standalone, Firebase, Bootstrap, Lazy Loading, rutas protegidas y animaciones.

Este proyecto fue desarrollado con fines educativos para demostrar el uso de:
- Angular con arquitectura Standalone
- Firebase (Auth, Firestore y Hosting)
- Bootstrap 5
- Lazy loading, rutas protegidas, animaciones y pipes personalizados
---

## 🚀 Tecnologías y herramientas utilizadas
- **Angular 17 Standalone**
- **Firebase (Authentication, Firestore, Hosting)**
- **Bootstrap 5 + Bootstrap Icons**
- **Angular Animations**
- **RxJS (Observables)**
- **Vite (build optimizado de Angular)**
---
## 🛠️ Requisitos para instalar y ejecutar el proyecto

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tuusuario/cafeterias-app.git
   cd cafeterias-app

2. Instalar dependencias:
npm install -- cmd

3. Configurar firebase
a. Crear un proyecto en Firebase Console
b. Activar Authentication con correo/contraseña
c. Crear una base de datos Firestore (modo producción o prueba)
d. Activar Hosting
e. Copiar las credenciales en el archivo src/environments/firebase.ts

4. Ejecutar el proyecto localmente
npm run dev -- cmd

🧱 Arquitectura de la aplicación

**Componentes principales**
LoginComponent: permite iniciar sesión con usuario y contraseña.
RegistroComponent: formulario para registrar nuevos usuarios.
CafeteriaListComponent: lista pública de cafeterías (visible para todos).
CafeteriaFormComponent: formulario para agregar o editar cafeterías (solo admins).
CafeteriaDetailComponent: vista detallada de una cafetería con productos.
ProductoFormComponent: formulario para agregar o editar productos (solo admins).

**Servicios**
AuthService: gestiona login, registro y logout con Firebase Auth.
UserService: obtiene el rol del usuario desde Firestore.
CafeteriaService: CRUD completo para cafeterías en Firestore.
ProductoService: CRUD completo para productos vinculados a cafeterías.

**Guards**
AuthGuard: protege rutas para usuarios autenticados.
RoleGuard: restringe rutas a usuarios con rol específico (ej. admin).

🔗 URLs de despliegue y video
🌐 URL de la app en Firebase Hosting:
https://cafeterias-app-e3f11.web.app

🎥 Video demostrativo (5-8 minutos):
https://youtu.be/xNqjK-96zX4
(Debe mostrar: funcionalidades, autenticación, Firestore, explicación del código)
