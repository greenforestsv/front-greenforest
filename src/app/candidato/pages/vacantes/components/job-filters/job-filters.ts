import { Component, inject, input, output } from '@angular/core';
import { AreaSelect } from '../area-select/area-select';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormatSelect } from '../../../../../shared/components/format-select/format-select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { FilterJobListDto } from '../../../../../core/interfaces/vacantes.interfaces';

@Component({
  selector: 'app-job-filters',
  imports: [
    AreaSelect,
    SelectModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FormatSelect,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
  ],
  templateUrl: './job-filters.html',
})
export class JobFilters {
  readonly loading = input(false);
  readonly filtersChange = output<FilterJobListDto>();

  private fb = inject(FormBuilder);

  readonly searchForm = this.fb.nonNullable.group({
    name: [''],
    department: this.fb.control<string | null>(null),
    format: this.fb.control<string | null>(null),
    min_salary: this.fb.control<number | null>(null),
    max_salary: this.fb.control<number | null>(null),
  });

  readonly name = this.searchForm.controls.name;
  readonly department = this.searchForm.controls.department;
  readonly format = this.searchForm.controls.format;
  readonly min_salary = this.searchForm.controls.min_salary;
  readonly max_salary = this.searchForm.controls.max_salary;

  buscar(): void {
    this.filtersChange.emit(this.searchForm.getRawValue());
  }

  resetForm(): void {
    this.searchForm.reset({
      name: '',
      department: null,
      format: null,
      min_salary: null,
      max_salary: null,
    });

    this.filtersChange.emit({});
  }
}
