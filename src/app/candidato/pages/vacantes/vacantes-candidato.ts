import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';
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
    ScrollerModule,
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
    buscar: [''],
    area: [''],
    modalidad: [''],
    salario: [''],
  });

  // PROPIEDADES
  readonly buscar = this.search_form.controls.buscar;
  readonly area = this.search_form.controls.area;
  readonly modalidad = this.search_form.controls.modalidad;
  readonly salario = this.search_form.controls.salario;

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
