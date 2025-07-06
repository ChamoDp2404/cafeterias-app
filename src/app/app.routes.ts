import { Routes } from '@angular/router';
import { CafeteriaListComponent } from './pages/cafeteria-list/cafeteria-list.component';
import { CafeteriaDetailComponent } from './pages/cafeteria-detail/cafeteria-detail.component';
import { CafeteriaFormComponent } from './pages/cafeteria-form/cafeteria-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cafeterias', pathMatch: 'full' },
  { path: 'cafeterias', component: CafeteriaListComponent },
  { path: 'cafeterias/nueva', component: CafeteriaFormComponent },
  { path: 'cafeterias/editar/:id', component: CafeteriaFormComponent },
  { path: 'cafeterias/:id', component: CafeteriaDetailComponent },
  { path: '**', redirectTo: 'cafeterias' }
];
  