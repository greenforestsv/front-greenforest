import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { VacantesService } from '../../../../../core/services/vacantes.service';
import { MessageService } from 'primeng/api';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { PatchVacanteDto } from '../../../../../core/interfaces/vacantes.interfaces';
import { toArray } from '../../../../../shared/utils/string.utils';
import { VacanteForm } from '../../forms/vacante-form/vacante-form';
import { SkeletonModule } from 'primeng/skeleton';
import {
  departmentOptions,
  formatOptions,
  contractTypeOptions,
} from '../../../../../core/constants/vacantes.constants';

@Component({
  selector: 'app-editar-vacante-dialog',
  standalone: true,
  templateUrl: './editar-vacante-dialog.html',
  imports: [
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    TranslatePipe,
    VacanteForm,
    SkeletonModule,
  ],
})
export class EditarVacanteDialog {
  private translate = inject(TranslateService);
  private vacantesService = inject(VacantesService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  visible = signal(false);
  loading = signal(false);

  loadingVacante = signal(false);

  currentVacanteId = input.required<string>();
  jobUpdated = output<void>();

  readonly vacanteForm = this.fb.nonNullable.group({
    title: ['', Validators.required],

    ends_on: [null as Date | null],

    min_salary: [0, [Validators.required, Validators.min(1)]],
    max_salary: [0, [Validators.required, Validators.min(1)]],

    workday: ['', Validators.required],
    workday_type: ['', Validators.required],

    availability: ['', Validators.required],

    description: ['', Validators.required],

    skills: ['', Validators.required],
    tools: ['', Validators.required],
    requirements: ['', Validators.required],

    processes: this.fb.nonNullable.control<number[]>([]),

    payment_form: ['', Validators.required],

    contract_type: [0, Validators.required],
    department: [0, Validators.required],
    format: [0, Validators.required],

    number_of_vacancies: [1],

    vehicle: [false],

    level_experience: [''],
  });

  openDialog(): void {
    this.visible.set(true);
    this.loadVacante();
  }

  closeDialog(): void {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm(): void {
    this.vacanteForm.reset({
      title: '',
      description: '',
      ends_on: new Date(),

      min_salary: 1,
      max_salary: 1,

      workday_type: '',
      workday: '',

      availability: '',

      contract_type: 0,
      department: 0,
      format: 0,

      payment_form: '',

      number_of_vacancies: 1,

      vehicle: false,

      level_experience: '',

      skills: '',
      tools: '',
      requirements: '',

      processes: [],
    });

    this.vacanteForm.markAsPristine();
    this.vacanteForm.markAsUntouched();
  }

  private loadVacante(): void {
    this.loadingVacante.set(true);

    this.vacantesService
      .getJobDetails(this.currentVacanteId())
      .pipe(finalize(() => this.loadingVacante.set(false)))
      .subscribe({
        next: (vacante) => {
          const contractType = contractTypeOptions.find(
            (option) => option.label === vacante.contract_type,
          )?.value;

          const department = departmentOptions.find(
            (option) => option.label === vacante.department,
          )?.value;

          const format = formatOptions.find((option) => option.label === vacante.format)?.value;

          console.log(vacante);

          this.vacanteForm.patchValue({
            title: vacante.title,

            ends_on: vacante.ends_on ? new Date(vacante.ends_on) : new Date(),

            min_salary: Number(vacante.min_salary),
            max_salary: Number(vacante.max_salary),

            workday: vacante.workday?.join('\n') ?? '',
            workday_type: vacante.workday_type,

            availability: vacante.availability,

            description: vacante.description,

            skills: vacante.skills?.join('\n') ?? '',
            tools: vacante.tools?.join('\n') ?? '',
            requirements: vacante.requirements?.join('\n') ?? '',

            processes: vacante.processes ?? [],

            payment_form: vacante.payment_form,

            contract_type: contractType,
            department: department,
            format: format,

            number_of_vacancies: Number(vacante.number_of_vacancies),

            vehicle: vacante.vehicle,

            level_experience: vacante.level_experience,
          });

          this.vacanteForm.markAsPristine();
          this.vacanteForm.markAsUntouched();
        },

        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener vacante',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });

          this.visible.set(false);
        },
      });
  }

  save(): void {
    if (!this.currentVacanteId()) {
      console.log('no id');
      return;
    }

    if (this.vacanteForm.invalid) {
      console.log('invalid form');
      this.vacanteForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const vacante = this.vacanteForm.getRawValue();

    const payload: PatchVacanteDto = {
      ...vacante,
      workday: toArray(vacante.workday),
      skills: toArray(vacante.skills),
      tools: toArray(vacante.tools),
      requirements: toArray(vacante.requirements),
      processes: vacante.processes,
      ends_on: dayjs(vacante.ends_on).toISOString(),
    };

    console.log({ update: payload });

    this.vacantesService
      .patchJob(this.currentVacanteId(), payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Vacante actualizada',
            detail: 'La vacante fue actualizada correctamente',
            life: 5000,
          });

          this.jobUpdated.emit();
          this.closeDialog();
        },

        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al editar vacante',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }
}
