import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CafeteriaService } from '../../services/cafeteria.service';
import { ProductoService } from '../../services/producto.service';
import { Cafeteria } from '../../models/cafeteria.model';
import { Producto } from '../../models/producto.model';
import { Observable } from 'rxjs';
import { ResumirTextoPipe } from '../../pipes/resumir-texto.pipe'; // ✅

@Component({
  selector: 'app-cafeteria-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ResumirTextoPipe], // ✅
  templateUrl: './cafeteria-detail.component.html',
  styleUrls: ['./cafeteria-detail.component.css']
})
export class CafeteriaDetailComponent implements OnInit {
  cafeteria$!: Observable<Cafeteria>;
  productos$!: Observable<Producto[]>;

  constructor(
    private route: ActivatedRoute,
    private cafeteriaService: CafeteriaService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cafeteria$ = this.cafeteriaService.getCafeteriaById(id);
      this.productos$ = this.productoService.getProductosPorCafeteria(id);
    }
  }

  eliminarProducto(id: string): void {
    if (confirm('¿Eliminar este producto?')) {
      this.productoService.deleteProducto(id)
        .then(() => console.log('✅ Producto eliminado'))
        .catch(err => console.error('❌ Error al eliminar', err));
    }
  }
}
