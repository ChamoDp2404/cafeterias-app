import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProductoFormComponent implements OnInit {
  form!: FormGroup;
  productoId: string | null = null;
  cafeteriaId: string = '';
  modoEdicion = false;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      descripcion: ['']
    });

    this.productoId = this.route.snapshot.paramMap.get('id');
    this.modoEdicion = this.route.snapshot.url[0]?.path === 'editar';

    if (this.modoEdicion && this.productoId) {
      this.cargando = true;
      this.productoService.getProductoById(this.productoId).subscribe({
        next: prod => {
          if (!prod) {
            alert('❌ Producto no encontrado.');
            this.router.navigate(['/cafeterias']);
            return;
          }

          this.form.patchValue(prod);
          this.cafeteriaId = prod.cafeteriaId;
          this.cargando = false;
        },
        error: err => {
          console.error('❌ Error al obtener producto:', err);
          this.router.navigate(['/cafeterias']);
        }
      });
    } else {
      const cafeId = this.route.snapshot.paramMap.get('id');
      if (cafeId) {
        this.cafeteriaId = cafeId;
      } else {
        alert('❌ No se encontró el ID de la cafetería en la URL.');
        this.router.navigate(['/cafeterias']);
      }
    }
  }

  guardar(): void {
    if (!this.form.valid || !this.cafeteriaId) return;

    const data: Producto = {
      ...this.form.value,
      cafeteriaId: this.cafeteriaId
    };

    if (this.modoEdicion && this.productoId) {
      this.productoService.updateProducto(this.productoId, data)
        .then(() => this.router.navigate(['/cafeterias', this.cafeteriaId]))
        .catch(err => console.error('❌ Error al actualizar producto:', err));
    } else {
      this.productoService.addProducto(data)
        .then(() => this.router.navigate(['/cafeterias', this.cafeteriaId]))
        .catch(err => console.error('❌ Error al agregar producto:', err));
    }
  }
}
