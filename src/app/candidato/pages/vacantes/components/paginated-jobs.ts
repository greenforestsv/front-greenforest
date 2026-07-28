import { Component, inject, signal } from '@angular/core';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { VacantesService } from '../../../../core/services/vacantes.service';
import { Vacante } from '../../../../core/interfaces/vacantes.interfaces';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';

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

  items = Array.from({ length: 3 });
  loading = signal(true);
  jobs = signal<Vacante[]>([]);

  totalRecords = signal(0);
  first: number = 0;
  rows: number = 3;
  rowsPerPageOptions = [3, 6, 9, 12, 15, 18, 21, 24];

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
}
