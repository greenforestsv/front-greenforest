import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { VacantesService } from '../../../../../core/services/vacantes.service';
import { MessageService } from 'primeng/api';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { CreateVacanteDto } from '../../../../../core/interfaces/vacantes.interfaces';
import { toArray } from '../../../../../shared/utils/string.utils';
import { VacanteForm } from '../../forms/vacante-form/vacante-form';

@Component({
  selector: 'app-crear-vacante-dialog',
  standalone: true,
  templateUrl: './crear-vacante-dialog.html',
  imports: [DialogModule, ButtonModule, ReactiveFormsModule, TranslatePipe, VacanteForm],
})
export class CrearVacanteDialog {
  private translate = inject(TranslateService);
  private vacantesService = inject(VacantesService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  visible = signal(false);
  loading = signal(false);

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

  save(): void {
    if (this.vacanteForm.invalid) {
      this.vacanteForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const vacante = this.vacanteForm.getRawValue();

    const nuevaVacante: CreateVacanteDto = {
      ...vacante,
      workday: toArray(vacante.workday),
      skills: toArray(vacante.skills),
      tools: toArray(vacante.tools),
      requirements: toArray(vacante.requirements),
      processes: vacante.processes,
      ends_on: dayjs(vacante.ends_on).toISOString(),
    };

    this.vacantesService
      .createJob(nuevaVacante)
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
            summary: 'Error al crear vacante',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }

  loadVacantes = output<void>();
}
