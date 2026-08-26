import { Component, ChangeDetectionStrategy, inject, viewChild } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatedJobs } from './components/paginated-jobs';
import { FormatSelect } from '../../../shared/components/format-select/format-select';
import { AreaSelect } from './components/area-select/area-select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-vacantes-candidato',
  standalone: true,
  imports: [
    SelectModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PaginatedJobs,
    FormatSelect,
    AreaSelect,
    InputNumberModule,
    InputIconModule,
    IconFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vacantes-candidato.html',
  styleUrl: './vacantes-candidato.scss',
})
export class VacantesCandidato {
  readonly paginatedJobs = viewChild(PaginatedJobs);

  private fb = inject(FormBuilder);

  // ESTADOS INICIALES DE FORMULARIO
  readonly search_form = this.fb.nonNullable.group({
    name: [''],
    department: this.fb.control<string | null>(null),
    format: this.fb.control<string | null>(null),
    min_salary: this.fb.control<number | null>(null),
    max_salary: this.fb.control<number | null>(null),
  });

  // PROPIEDADES
  readonly name = this.search_form.controls.name;
  readonly department = this.search_form.controls.department;
  readonly format = this.search_form.controls.format;
  readonly min_salary = this.search_form.controls.min_salary;
  readonly max_salary = this.search_form.controls.max_salary;

  buscar(): void {
    const filters = this.search_form.getRawValue();

    this.paginatedJobs()?.loadJobs(true, filters);
  }

  resetForm(): void {
    this.search_form.reset({
      name: '',
      department: null,
      format: null,
      min_salary: null,
      max_salary: null,
    });

    this.paginatedJobs()?.loadJobs(true, {});
  }
}
