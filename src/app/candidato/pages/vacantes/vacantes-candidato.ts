import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatedJobs } from './components/paginated-jobs';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vacantes-candidato.html',
  styleUrl: './vacantes-candidato.scss',
})
export class VacantesCandidato {
  area_options = [{ label: 'Operaciones', value: 'OPE' }];
  modalidad_options = [{ label: 'Híbrido', value: 'HIB' }];
  salario_options = [{ label: '$1000 - $1,500', value: '1' }];

  private fb = inject(FormBuilder);

  // ESTADOS INICIALES DE FORMULARIO
  readonly search_form = this.fb.nonNullable.group({
    name: [''],
    department: [''],
    format: [''],
    min_salary: [''],
    max_salary: [''],
  });

  // PROPIEDADES
  readonly name = this.search_form.controls.name;
  readonly department = this.search_form.controls.department;
  readonly format = this.search_form.controls.format;
  readonly min_salary = this.search_form.controls.min_salary;
  readonly max_salary = this.search_form.controls.max_salary;

  matching_inteligente = signal([
    {
      id: 1,
      name: 'NovaTech',
      percentage: 94,
    },
    {
      id: 2,
      name: 'AgroPlus',
      percentage: 91,
    },
  ]);
}
