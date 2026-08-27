import { Component, effect, inject, input, output, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import {
  FilterJobListDto,
  GetVacanteDto,
} from '../../../../../core/interfaces/vacantes.interfaces';
import { finalize } from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { MessageService } from 'primeng/api';
import { VacantesService } from '../../../../../core/services/vacantes.service';
import { FormatDatePipe } from '../../../../../shared/pipes/format-date.pipe';

@Component({
  selector: 'app-job-list',
  imports: [AvatarModule, ButtonModule, PaginatorModule, FormatDatePipe],
  templateUrl: './job-list.html',
})
export class JobList {
  readonly filters = input<FilterJobListDto>();
  readonly jobSelected = output<GetVacanteDto>();
  readonly selectedJobId = signal<string | null>(null);

  private readonly messageService = inject(MessageService);
  private readonly vacantesService = inject(VacantesService);

  readonly loading = signal(false);
  readonly jobs = signal<GetVacanteDto[]>([]);
  readonly totalRecords = signal(0);
  items = Array.from({ length: 3 });

  readonly first = signal(0);
  readonly rows = signal(6);
  readonly rowsPerPageOptions = [3, 6, 9, 12];

  constructor() {
    effect(() => {
      this.filters();

      this.first.set(0);
      this.loadJobs();
    });
  }

  loadJobs(resetPage = false) {
    if (resetPage) {
      this.first.set(0);
    }

    this.loading.set(true);

    const request = { limit: this.rows(), offset: this.first(), filters: this.filters() };

    this.vacantesService
      .getJobs(request)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          console.log(response.data);
          this.jobs.set(response.data);
          this.totalRecords.set(response.qty);

          if (response.data.length > 0) {
            this.selectJob(response.data[0]);
          }
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

  selectJob(job: GetVacanteDto): void {
    this.selectedJobId.set(job.id);
    this.jobSelected.emit(job);
  }

  onPageChange(event: PaginatorState): void {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 6);

    this.loadJobs();
  }
}
