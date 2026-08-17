import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { VerDetalleVacanteDialog } from './dialogs/ver/ver-detalle-vacante-dialog';
import { EditarVacanteDialog } from './dialogs/editar/editar-vacante-dialog';
import { CrearVacanteDialog } from './dialogs/crear/crear-vacante-dialog';
import { VacantesService } from '../../../core/services/vacantes.service';
import { finalize } from 'rxjs';
import { GetVacanteDto } from '../../../core/interfaces/vacantes.interfaces';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { SkeletonModule } from 'primeng/skeleton';
import { FormatDatePipe } from '../../../shared/pipes/format-date.pipe';

@Component({
  selector: 'app-vacantes-empresa',
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    TextareaModule,
    SelectModule,
    TableModule,
    PaginatorModule,
    VerDetalleVacanteDialog,
    EditarVacanteDialog,
    CrearVacanteDialog,
    EmptyState,
    SkeletonModule,
    FormatDatePipe,
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

  constructor() {
    this.loadJobs();
  }

  first: number = 0;
  rows: number = 10;
  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.loadJobs();
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
