import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard'; // ✅ Asegúrate que este archivo exista

export const routes: Routes = [
  // Redirigir a login por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rutas públicas
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

  // Rutas privadas protegidas por AuthGuard
  {
    path: 'cafeterias',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/cafeteria-list/cafeteria-list.component').then(m => m.CafeteriaListComponent)
  },
  {
    path: 'cafeterias/nueva',
    canActivate: [AuthGuard, () => roleGuard('admin')],
    loadComponent: () =>
      import('./pages/cafeteria-form/cafeteria-form.component').then(m => m.CafeteriaFormComponent)
  },
  {
    path: 'cafeterias/editar/:id',
    canActivate: [AuthGuard, () => roleGuard('admin')],
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
    canActivate: [AuthGuard, () => roleGuard('admin')],
    loadComponent: () =>
      import('./pages/producto-form.component').then(m => m.ProductoFormComponent)
  },
  {
    path: 'productos/editar/:id',
    canActivate: [AuthGuard, () => roleGuard('admin')],
    loadComponent: () =>
      import('./pages/producto-form.component').then(m => m.ProductoFormComponent)
  },

  // Página no encontrada
  {
    path: '**',
    loadComponent: () =>
      import('./pages/pagina-no-encontrada/pagina-no-encontrada.component').then(m => m.PaginaNoEncontradaComponent)
  }
];
