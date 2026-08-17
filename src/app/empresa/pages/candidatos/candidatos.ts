import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AspirantesService } from '../../../candidato/services/aspirantes.service';
import { finalize } from 'rxjs';
import { GetAspirantListDto } from '../../../candidato/interfaces/aspirant.interfaces';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterLink } from '@angular/router';
import { CustomAvatar } from '../../../shared/components/custom-avatar/custom-avatar';

@Component({
  selector: 'app-candidatos',
  imports: [
    ButtonModule,
    TableModule,
    AvatarModule,
    ReactiveFormsModule,
    InputTextModule,
    EmptyState,
    SkeletonModule,
    RouterLink,
    CustomAvatar,
  ],
  templateUrl: './candidatos.html',
  styleUrl: './candidatos.scss',
})
export class Candidatos {
  private messageService = inject(MessageService);
  private aspirantesService = inject(AspirantesService);
  private fb = inject(FormBuilder);

  items = Array.from({ length: 3 });
  loading = signal(false);
  candidatos = signal<GetAspirantListDto[]>([]);
  totalRecords = signal(0);
  first: number = 0;
  rows: number = 3;
  rowsPerPageOptions = [3, 6, 9, 12];

  // ESTADOS INICIALES DE FORMULARIO
  readonly search_form = this.fb.nonNullable.group({
    name: [''],
    profession: [''],
    skills: [''],
  });

  // PROPIEDADES
  readonly name = this.search_form.controls.name;
  readonly profession = this.search_form.controls.profession;
  readonly skills = this.search_form.controls.skills;

  constructor() {
    this.load();
  }

  load(resetPage = false) {
    this.loading.set(true);

    if (resetPage) {
      this.first = 0;
    }

    const page = this.first / this.rows + 1;
    const request = {
      limit: this.rows,
      offset: page,
      filters: {
        name: this.name.value || undefined,
        profession: this.profession.value || undefined,
        skills: this.skills.value ? [this.skills.value] : undefined,
      },
    };

    this.aspirantesService
      .getAspirants(request)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.candidatos.set(response.data);
          this.totalRecords.set(response.qty);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de candidatos',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }

  /* candidatos = signal([
    {
      id: 1,
      profile_photo: '',
      first_name: 'Ana Martínez',
      first_surname: '',
      estado: {
        text: 'Green score 92',
        color: 'green',
      },
      profession: 'BI Analyst · SQL · Power BI · Automatización',
      skills: ['SQL', 'Dashboards', 'Excel avanzado'],
    },
    {
      id: 2,
      profile_photo: '',
      first_name: 'Carlos Mejía',
      first_surname: '',
      estado: {
        text: 'Acceso pendiente',
        color: 'accent',
      },
      profession: 'QA Automation · Katalon · Selenium · APIs',
      skills: ['QA', 'Postman', 'Jira'],
    },
    {
      id: 3,
      profile_photo: '',
      first_name: 'María López',
      first_surname: '',
      estado: {
        text: 'Historial parcial',
        color: 'blue',
      },
      profession: 'People Ops · nómina · reclutamiento · cultura',
      skills: ['Planilla', 'RRHH', 'ATS'],
    },
  ]); */

  /*  tablaComprarativa = signal([
    {
      id: 1,
      nombre: 'Ana Martínez',
      subtext: 'San Salvador · Híbrido',
      puestoSugerido: 'BI Lead',
      match: '92',
      historial: {
        text: 'Autorizado',
        color: 'green',
      },
      evaluacion: '91',
      accion: 'Ver perfil',
    },
    {
      id: 2,
      nombre: 'José Rivera',
      subtext: 'Santa Tecla · Remoto',
      puestoSugerido: 'Full Stack',
      match: '86',
      historial: {
        text: 'Pendiente',
        color: 'accent',
      },
      evaluacion: '84',
      accion: 'Solicitar',
    },
    {
      id: 3,
      nombre: 'María López',
      subtext: 'Antihuo Cuscatlán',
      puestoSugerido: 'Automation',
      match: '89',
      historial: {
        text: 'Parcial',
        color: 'blue',
      },
      evaluacion: '88',
      accion: 'Shortlist',
    },
  ]);  */
}
