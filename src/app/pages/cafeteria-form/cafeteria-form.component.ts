import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Cafeteria } from '../../models/cafeteria.model';

@Component({
  selector: 'app-cafeteria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cafeteria-form.component.html',
  styleUrls: ['./cafeteria-form.component.css']
})
export class CafeteriaFormComponent implements OnInit {
  form!: FormGroup;
  cafeteriaId: string | null = null;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private cafeteriaService: CafeteriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      horario: [''],
      descripcion: ['']
    });

    this.cafeteriaId = this.route.snapshot.paramMap.get('id');
    this.modoEdicion = !!this.cafeteriaId;

    if (this.modoEdicion && this.cafeteriaId) {
      this.cafeteriaService.getCafeteriaById(this.cafeteriaId).subscribe(cafeteria => {
        this.form.patchValue(cafeteria);
      });
    }
  }

  guardar(): void {
    const data: Cafeteria = this.form.value;

    if (this.modoEdicion && this.cafeteriaId) {
      this.cafeteriaService.updateCafeteria(this.cafeteriaId, data)
        .then(() => this.router.navigate(['/cafeterias']));
    } else {
      this.cafeteriaService.addCafeteria(data)
        .then(() => this.router.navigate(['/cafeterias']));
    }
  }
}
