import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Redirigir a login por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rutas públicas con Lazy Loading
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(m => m.RegistroComponent)
  },

  // Rutas privadas con Lazy Loading protegidas por AuthGuard
  {
    path: 'cafeterias',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/cafeteria-list/cafeteria-list.component').then(m => m.CafeteriaListComponent)
  },
  {
    path: 'cafeterias/nueva',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/cafeteria-form/cafeteria-form.component').then(m => m.CafeteriaFormComponent)
  },
  {
    path: 'cafeterias/editar/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/cafeteria-form/cafeteria-form.component').then(m => m.CafeteriaFormComponent)
  },
  {
    path: 'cafeterias/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/cafeteria-detail/cafeteria-detail.component').then(m => m.CafeteriaDetailComponent)
  },
  {
    path: 'cafeterias/:id/productos/nuevo',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/producto-form.component').then(m => m.ProductoFormComponent)
  },
  {
    path: 'productos/editar/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/producto-form.component').then(m => m.ProductoFormComponent)
  },

  // Ruta comodín
  { path: '**', redirectTo: 'login' }
];
