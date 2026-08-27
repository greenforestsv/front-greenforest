import { Component, ChangeDetectionStrategy, signal, viewChild } from '@angular/core';
import { JobFilters } from './components/job-filters/job-filters';
import { JobList } from './components/job-list/job-list';
import { JobDetail } from './components/job-detail/job-detail';
import { FilterJobListDto, GetVacanteDto } from '../../../core/interfaces/vacantes.interfaces';

@Component({
  selector: 'app-vacantes-candidato',
  standalone: true,
  imports: [JobDetail, JobList, JobFilters],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vacantes-candidato.html',
  styleUrl: './vacantes-candidato.scss',
})
export class VacantesCandidato {
  readonly jobList = viewChild(JobList);

  readonly selectedJob = signal<GetVacanteDto | null>(null);

  readonly filters = signal<FilterJobListDto>({});

  onFiltersChange(filters: FilterJobListDto): void {
    this.filters.set(filters);
    this.jobList()?.loadJobs(true);
  }

  onJobSelected(job: GetVacanteDto): void {
    this.selectedJob.set(job);
  }
}
