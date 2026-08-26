import { Component, inject, input, signal } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { VacantesService } from '../../../../core/services/vacantes.service';
import { FilterJobListDto, GetVacanteDto } from '../../../../core/interfaces/vacantes.interfaces';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PostulacionesService } from '../../../../core/services/postulaciones.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { AreaSelect } from './area-select/area-select';

@Component({
  standalone: true,
  imports: [
    PaginatorModule,
    ButtonModule,
    SkeletonModule,
    EmptyState,
    CurrencyFormatPipe,
    FormatDatePipe,
    AreaSelect,
  ],
  selector: 'app-paginated-jobs',
  templateUrl: './paginated-jobs.html',
})
export class PaginatedJobs {
  /* INPUT */
  filters = input<FilterJobListDto>({});

  private translate = inject(TranslateService);
  messageService = inject(MessageService);
  vacantesService = inject(VacantesService);
  postulacionesService = inject(PostulacionesService);

  items = Array.from({ length: 3 });
  loading = signal(false);
  jobs = signal<GetVacanteDto[]>([]);

  totalRecords = signal(0);
  first: number = 0;
  rows: number = 6;
  rowsPerPageOptions = [3, 6, 9, 12];

  constructor() {
    this.loadJobs();
  }

  loadJobs(resetPage = false, filters?: FilterJobListDto) {
    this.loading.set(true);

    if (resetPage) {
      this.first = 0;
    }

    const request = { limit: this.rows, offset: this.first, filters: filters ?? this.filters() };

    this.vacantesService
      .getJobs(request)
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

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.loadJobs();
  }

  applyToJob(id_vacante: string) {
    this.loading.set(true);

    this.postulacionesService
      .applyToJob(id_vacante)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (postulacion) => {
          console.log(postulacion);

          this.messageService.add({
            severity: 'success',
            summary: 'Postulación exitosa',
            detail: 'Te postulate a esta vacante',
            life: 5000,
          });
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al postularte a vacante',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
