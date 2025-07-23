import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CafeteriaService } from '../../services/cafeteria.service';
import { ProductoService } from '../../services/producto.service';
import { Cafeteria } from '../../models/cafeteria.model';
import { Producto } from '../../models/producto.model';
import { Observable } from 'rxjs';
import { ResumirTextoPipe } from '../../pipes/resumir-texto.pipe';
import { UserService } from '../../services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../models/comentario.model';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cafeteria-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ResumirTextoPipe],
  templateUrl: './cafeteria-detail.component.html',
  styleUrls: ['./cafeteria-detail.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class CafeteriaDetailComponent implements OnInit {
  cafeteria$!: Observable<Cafeteria>;
  productos$!: Observable<Producto[]>;
  comentarios$!: Observable<Comentario[]>; // 👈 Comentarios de Firestore
  rol: string | null = null;
  nuevoComentario: string = ''; // 👈 renombrado para coincidir con el HTML
  userEmail: string = '';       // 👈 Autor del comentario
  cafeteriaId: string = '';     // 👈 Necesario para guardar

  constructor(
    private route: ActivatedRoute,
    private cafeteriaService: CafeteriaService,
    private productoService: ProductoService,
    private userService: UserService,
    private comentarioService: ComentarioService, // 👈
    private authService: AuthService              // 👈
  ) {}

  ngOnInit(): void {
    this.userService.obtenerRolActual().subscribe(rol => {
      this.rol = rol;
    });

    this.authService.user$.subscribe((user: any) => {
      this.userEmail = user?.email;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cafeteriaId = id;
      this.cafeteria$ = this.cafeteriaService.getCafeteriaById(id);
      this.productos$ = this.productoService.getProductosPorCafeteria(id);
      this.comentarios$ = this.comentarioService.obtenerComentariosPorCafeteria(id); // 👈
    }
  }

  eliminarProducto(id: string): void {
    if (confirm('¿Eliminar este producto?')) {
      this.productoService.deleteProducto(id)
        .then(() => console.log('✅ Producto eliminado'))
        .catch(err => console.error('❌ Error al eliminar', err));
    }
  }

  agregarComentario(): void {
    if (!this.nuevoComentario.trim()) return;

    const comentario: Comentario = {
      mensaje: this.nuevoComentario,
      autor: this.userEmail,
      fecha: new Date().toISOString(),
      cafeteriaId: this.cafeteriaId
    };

    this.comentarioService.agregarComentario(comentario).then(() => {
      this.nuevoComentario = '';
    });
  }

  eliminarComentario(id: string): void {
    if (confirm('¿Eliminar este comentario?')) {
      this.comentarioService.eliminarComentario(id);
    }
  }
}
