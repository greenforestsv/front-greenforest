import { Component, inject, signal } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { VacantesService } from '../../../../core/services/vacantes.service';
import { GetVacanteDto } from '../../../../core/interfaces/vacantes.interfaces';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PostulacionesService } from '../../../services/postulaciones.service';

@Component({
  standalone: true,
  imports: [PaginatorModule, ButtonModule, TranslatePipe, SkeletonModule],
  selector: 'app-paginated-jobs',
  templateUrl: './paginated-jobs.html',
})
export class PaginatedJobs {
  private translate = inject(TranslateService);
  messageService = inject(MessageService);
  vacantesService = inject(VacantesService);
  postulacionesService = inject(PostulacionesService);

  items = Array.from({ length: 3 });
  loading = signal(true);
  jobs = signal<GetVacanteDto[]>([]);

  totalRecords = signal(0);
  first: number = 0;
  rows: number = 3;
  rowsPerPageOptions = [3, 6, 9, 12];

  constructor() {
    this.loadJobs();
  }

  loadJobs() {
    this.loading.set(true);

    const page = this.first / this.rows + 1;

    this.vacantesService
      .getJobs(this.rows, page)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.jobs.set(response.data);
          this.totalRecords.set(response.qty);
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('vacantes.error_obtener_vacantes'),
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;

    this.loadJobs();
  }

  applyToJob(id_vacante: string, id_empresa: string) {
    this.loading.set(true);

    this.postulacionesService
      .applyToJob(id_vacante, id_empresa)
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

          /* TODO: recargar vacantes. La vacante cambia a estado etapa/estado */
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
