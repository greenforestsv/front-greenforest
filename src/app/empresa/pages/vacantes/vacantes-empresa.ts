import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { VerDetalleVacanteDialog } from './dialogs/ver/ver-detalle-vacante-dialog';
import { EditarVacanteDialog } from './dialogs/editar/editar-vacante-dialog';
import { CrearVacanteDialog } from './dialogs/crear/crear-vacante-dialog';
import { VacantesService } from '../../../core/services/vacantes.service';
import { finalize } from 'rxjs';
import { GetVacanteDto } from '../../../core/interfaces/vacantes.interfaces';
import dayjs from 'dayjs';

@Component({
  selector: 'app-vacantes-empresa',
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    MessageModule,
    TextareaModule,
    SelectModule,
    TableModule,
    PaginatorModule,
    VerDetalleVacanteDialog,
    EditarVacanteDialog,
    CrearVacanteDialog,
  ],
  templateUrl: './vacantes-empresa.html',
  styleUrl: './vacantes-empresa.scss',
})
export class VacantesEmpresa {
  private messageService = inject(MessageService);
  private vacantesService = inject(VacantesService);

  /* SIGNAL */
  jobs = signal<GetVacanteDto[]>([]);
  totalRecords = signal(0);
  loading = signal(false);
  candidatos = signal([
    {
      id: 1,
      name: 'Ana Martínez',
      subtext: 'BI Analyst · 89 match',
      status: 'PO',
      badge: {
        text: 'Salario compatible',
        color: 'green',
      },
    },
    {
      id: 2,
      name: 'Carlos Mejía',
      subtext: 'QA Automation · 84 match',
      status: 'PO',
      badge: {
        text: 'Remoto',
        color: 'blue',
      },
    },
    {
      id: 3,
      name: 'María López',
      subtext: 'Automation Specialist · historial solicitado',
      status: 'PS',
      badge: {
        text: 'Pendiente acceso',
        color: 'accent',
      },
    },
    {
      id: 4,
      name: 'Daniela Pérez',
      subtext: 'People Ops · 82 match',
      status: 'PS',
      badge: {
        text: 'Apta',
        color: 'green',
      },
    },
    {
      id: 5,
      name: 'José Rivera',
      subtext: 'Dev Full Stack · entrevista 2:30pm',
      status: 'EN',
      badge: {
        text: 'Programada',
        color: 'blue',
      },
    },
    {
      id: 6,
      name: 'Andrea Castillo',
      subtext: 'Data Engineer · prueba técnica',
      status: 'EV',
      badge: {
        text: '87%',
        color: 'green',
      },
    },
    {
      id: 7,
      name: 'Roberto Núñez',
      subtext: 'Growth Analyst · oferta enviada',
      status: 'O',
      badge: {
        text: 'Negociando',
        color: 'accent',
      },
    },
  ]);

  /*   listadoEjecutivo = signal([
    {
      id: 1,
      nombre: 'AI Automation Specialist',
      subtext: 'Híbrido · salario visible',
      area: 'Operaciones',
      numeroCandidatos: '48',
      etapa: 'Preselección',
      dueno: 'María José',
      estado: {
        text: 'Activa',
        color: 'green',
      },
    },
    {
      id: 2,
      nombre: 'Business Intelligence Lead',
      subtext: 'Remoto regional',
      area: 'Data',
      numeroCandidatos: '33',
      etapa: 'Entrevista',
      dueno: 'Oned Gómez',
      estado: {
        text: 'Prioritaria',
        color: 'accent',
      },
    },
    {
      id: 3,
      nombre: 'Payroll Analyst',
      subtext: 'Presencial · SS',
      area: 'Finanzas',
      numeroCandidatos: '21',
      etapa: 'Evaluación',
      dueno: 'Marycarmen',
      estado: {
        text: 'Interna',
        color: 'blue',
      },
    },
  ]); */

  formatDate(date: string | Date) {
    return dayjs(date).format('D MMM YYYY');
  }

  constructor() {
    this.loadJobs();
  }

  save() {}

  first: number = 0;
  rows: number = 10;
  onPageChange(event: any) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  loadJobs(resetPage = false) {
    this.loading.set(true);

    if (resetPage) {
      this.first = 0;
    }

    const request = { limit: this.rows, offset: this.first };

    this.vacantesService
      .getTenantJobs(request)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          console.log(response.data);
          this.jobs.set(response.data);
          this.totalRecords.set(response.qty);
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener vacantes',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
