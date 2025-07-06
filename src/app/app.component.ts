import { Component } from '@angular/core';
import { CafeteriaListComponent } from './pages/cafeteria-list/cafeteria-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CafeteriaListComponent],
  template: `<app-cafeteria-list></app-cafeteria-list>`,
})
export class AppComponent {}
