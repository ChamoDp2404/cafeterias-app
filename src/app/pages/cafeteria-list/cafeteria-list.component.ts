import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Cafeteria } from '../../models/cafeteria.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ResumirTextoPipe } from '../../pipes/resumir-texto.pipe';
import { UserService } from '../../services/user.service';
import { trigger, transition, style, animate } from '@angular/animations'; // ✅ Importación para animaciones

@Component({
  selector: 'app-cafeteria-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ResumirTextoPipe],
  templateUrl: './cafeteria-list.component.html',
  styleUrls: ['./cafeteria-list.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class CafeteriaListComponent implements OnInit {
  cafeterias$!: Observable<Cafeteria[]>;
  todasLasCafeterias: Cafeteria[] = [];
  terminoBusqueda: string = '';
  criterioOrden: string = 'nombre';
  rol: string | null = null;

  constructor(
    private cafeteriaService: CafeteriaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.obtenerRolActual().subscribe(rol => {
      this.rol = rol;
    });

    this.cafeterias$ = this.cafeteriaService.getCafeterias();

    this.cafeterias$.subscribe(cafes => {
      this.todasLasCafeterias = cafes;
      this.ordenar();
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
