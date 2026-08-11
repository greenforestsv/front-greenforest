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

  readonly vacanteForm = this.fb.nonNullable.group({
    title: ['', Validators.required],

    ends_on: [new Date()],

    min_salary: [0, [Validators.required, Validators.min(1)]],
    max_salary: [0, [Validators.required, Validators.min(1)]],

    workday: ['', Validators.required],
    workday_type: ['', Validators.required],

    availability: ['', Validators.required],

    description: ['', Validators.required],

    skills: ['', Validators.required],
    tools: ['', Validators.required],
    requirements: ['', Validators.required],

    processes: this.fb.nonNullable.control<number[]>([], Validators.required),

    payment_form: ['', Validators.required],

    contract_type: [0, [Validators.required, Validators.min(1)]],
    department: [0, [Validators.required, Validators.min(1)]],
    format: [0, [Validators.required, Validators.min(1)]],

    number_of_vacancies: [1],

    vehicle: [false],

    level_experience: [''],
  });

  openDialog(id: string): void {
    this.visible.set(true);

    this.loadVacante(id);
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

      contract_type: 1,
      department: 1,
      format: 1,

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

  private loadVacante(id: string): void {
    this.loadingVacante.set(true);

    this.vacantesService
      .getJobDetails(id)
      .pipe(finalize(() => this.loadingVacante.set(false)))
      .subscribe({
        next: (vacante) => {
          this.vacanteForm.patchValue({
            //title: vacante.title,

            //ends_on: vacante.ends_on ? new Date(vacante.ends_on) : new Date(),

            min_salary: Number(vacante.min_salary),
            max_salary: Number(vacante.max_salary),

            workday: vacante.workday?.join('\n') ?? '',
            workday_type: vacante.workday_type,

            availability: vacante.availability,

            description: vacante.description,

            skills: vacante.skills?.join('\n') ?? '',
            tools: vacante.tools?.join('\n') ?? '',
            requirements: vacante.requirements?.join('\n') ?? '',

            //processes: vacante.processes ?? [],

            payment_form: vacante.payment_form,

            contract_type: Number(vacante.contract_type),
            department: Number(vacante.department),
            format: Number(vacante.format),

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
    if (!this.currentVacanteId) {
      return;
    }

    if (this.vacanteForm.invalid) {
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

      // Ya son IDs
      processes: vacante.processes,

      ends_on: dayjs(vacante.ends_on).toISOString(),
    };

    this.vacantesService
      .patchJob(this.currentVacanteId(), payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Vacante creada',
            detail: 'La vacante fue creada correctamente',
            life: 5000,
          });

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

  loadVacantes = output<void>();
}
