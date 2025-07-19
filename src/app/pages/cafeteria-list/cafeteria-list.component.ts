import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Cafeteria } from '../../models/cafeteria.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ResumirTextoPipe } from '../../pipes/resumir-texto.pipe'; // 👈 IMPORTA

@Component({
  selector: 'app-cafeteria-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ResumirTextoPipe], // 👈 AÑADE AQUÍ
  templateUrl: './cafeteria-list.component.html',
  styleUrls: ['./cafeteria-list.component.css']
})
export class CafeteriaListComponent implements OnInit {
  cafeterias$!: Observable<Cafeteria[]>;
  todasLasCafeterias: Cafeteria[] = [];
  terminoBusqueda: string = '';
  criterioOrden: string = 'nombre'; // ✅ Ordenamiento por defecto

  constructor(private cafeteriaService: CafeteriaService) {
    console.log('💡 Se construyó CafeteriaListComponent');
  }

  ngOnInit(): void {
    this.cafeterias$ = this.cafeteriaService.getCafeterias();

    this.cafeterias$.subscribe(cafes => {
      this.todasLasCafeterias = cafes;
      this.ordenar(); // ✅ Ordenar al cargar los datos
      console.log('🔥 Cafeterías recibidas desde Firestore:', cafes);
    });
  }

  cafeteriasFiltradas(): Cafeteria[] {
    let filtradas = this.todasLasCafeterias;

    if (this.terminoBusqueda.trim()) {
      filtradas = filtradas.filter(cafe =>
        cafe.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }

    return filtradas;
  }

  ordenar(): void {
    if (this.criterioOrden === 'nombre') {
      this.todasLasCafeterias.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
    }
  }

  eliminar(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cafetería?')) {
      this.cafeteriaService.deleteCafeteria(id)
        .then(() => console.log('✅ Cafetería eliminada correctamente'))
        .catch(error => console.error('❌ Error al eliminar cafetería:', error));
    }
  }
}
