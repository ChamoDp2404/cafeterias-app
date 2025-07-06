import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Cafeteria } from '../../models/cafeteria.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cafeteria-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cafeteria-list.component.html',
  styleUrls: ['./cafeteria-list.component.css']
})
export class CafeteriaListComponent implements OnInit {
  cafeterias$!: Observable<Cafeteria[]>;

  constructor(private cafeteriaService: CafeteriaService) {
    console.log('💡 Se construyó CafeteriaListComponent');
  }

  ngOnInit(): void {
    this.cafeterias$ = this.cafeteriaService.getCafeterias();

    this.cafeterias$.subscribe(cafes => {
      console.log('🔥 Cafeterías recibidas desde Firestore:', cafes);
    });
  }

  eliminar(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cafetería?')) {
      this.cafeteriaService.deleteCafeteria(id)
        .then(() => console.log('✅ Cafetería eliminada correctamente'))
        .catch(error => console.error('❌ Error al eliminar cafetería:', error));
    }
  }
}
