import { Routes } from '@angular/router';
import { CafeteriaListComponent } from './pages/cafeteria-list/cafeteria-list.component';
import { CafeteriaDetailComponent } from './pages/cafeteria-detail/cafeteria-detail.component';
import { CafeteriaFormComponent } from './pages/cafeteria-form/cafeteria-form.component';
import { ProductoFormComponent } from './pages/producto-form.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Redirigir a login por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // Rutas privadas protegidas por AuthGuard
  { path: 'cafeterias', component: CafeteriaListComponent, canActivate: [AuthGuard] },
  { path: 'cafeterias/nueva', component: CafeteriaFormComponent, canActivate: [AuthGuard] },
  { path: 'cafeterias/editar/:id', component: CafeteriaFormComponent, canActivate: [AuthGuard] },
  { path: 'cafeterias/:id', component: CafeteriaDetailComponent, canActivate: [AuthGuard] },
  { path: 'cafeterias/:id/productos/nuevo', component: ProductoFormComponent, canActivate: [AuthGuard] },
  { path: 'productos/editar/:id', component: ProductoFormComponent, canActivate: [AuthGuard] },

  // Ruta comodín
  { path: '**', redirectTo: 'login' }
];
