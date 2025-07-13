import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  form!: FormGroup;
  productoId: string | null = null;
  cafeteriaId: string = '';
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.productoId = this.route.snapshot.paramMap.get('id');
    this.modoEdicion = !!this.productoId;

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      descripcion: ['']
    });

    if (this.modoEdicion && this.productoId) {
      this.productoService.getProductoById(this.productoId).subscribe(prod => {
        this.form.patchValue(prod);
        this.cafeteriaId = prod.cafeteriaId;
      });
    } else {
      this.cafeteriaId = this.route.snapshot.paramMap.get('id')!;
    }
  }

  guardar(): void {
    const data: Producto = {
      ...this.form.value,
      cafeteriaId: this.cafeteriaId
    };

    if (this.modoEdicion && this.productoId) {
      this.productoService.updateProducto(this.productoId, data)
        .then(() => this.router.navigate(['/cafeterias', this.cafeteriaId]));
    } else {
      this.productoService.addProducto(data)
        .then(() => this.router.navigate(['/cafeterias', this.cafeteriaId]));
    }
  }
}
