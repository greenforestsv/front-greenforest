import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AspirantesService } from '../../../candidato/services/aspirantes.service';
import { finalize } from 'rxjs';
import { PublicAspirant } from '../../../candidato/interfaces/aspirant.interfaces';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-candidatos',
  imports: [ButtonModule, TableModule, AvatarModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './candidatos.html',
  styleUrl: './candidatos.scss',
})
export class Candidatos {
  private messageService = inject(MessageService);
  private aspirantesService = inject(AspirantesService);
  private fb = inject(FormBuilder);

  loading = signal(false);
  /*  candidatos = signal<PublicAspirant[]>([]); */
  // ESTADOS INICIALES DE FORMULARIO
  readonly search_form = this.fb.nonNullable.group({
    search_name: [''],
    search_location: [''],
    search_approach: [''],
  });

  // PROPIEDADES
  readonly search_name = this.search_form.controls.search_name;
  readonly search_location = this.search_form.controls.search_location;
  readonly search_approach = this.search_form.controls.search_approach;

  /*   constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.aspirantesService
      .getAspirants()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (candidatos) => {
          this.candidatos.set(candidatos);
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
  } */
  candidatos = signal([
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
  ]);

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
