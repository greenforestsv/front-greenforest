import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
//import { AspirantesService } from '../../../../services/aspirantes.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-crear-vacante-dialog',
  templateUrl: './crear-vacante-dialog.html',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    MessageModule,
    DatePickerModule,
    TextareaModule,
    InputNumberModule,
  ],
})
export class CrearVacanteDialog {
  /* INJECCIÓN DE SERVICIOS */
  private translate = inject(TranslateService);
  //aspirantesService = inject(AspirantesService);
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  visible = signal(false);
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  // ESTADOS INICIALES Y VALIDACIONES
  readonly vacanteForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    ends_on: [new Date(), Validators.required],
    min_salary: [0, [Validators.required, Validators.min(0)]],
    max_salary: [0, [Validators.required, Validators.min(1)]],
    workday_type: ['', Validators.required],
    workday: [[] as string[], Validators.required],
    contract_type: ['', Validators.required],
    area: ['', Validators.required],
    format: ['', Validators.required],
    payment_dates: ['', Validators.required],
    skills: [[] as string[], Validators.required],
    tools: [[] as string[], Validators.required],
    requirements: [[] as string[], Validators.required],
  });

  readonly title = this.vacanteForm.controls.title;
  readonly description = this.vacanteForm.controls.description;
  readonly ends_on = this.vacanteForm.controls.ends_on;
  readonly min_salary = this.vacanteForm.controls.min_salary;
  readonly max_salary = this.vacanteForm.controls.max_salary;
  readonly workday_type = this.vacanteForm.controls.workday_type;
  readonly workday = this.vacanteForm.controls.workday;
  readonly contract_type = this.vacanteForm.controls.contract_type;
  readonly area = this.vacanteForm.controls.area;
  readonly format = this.vacanteForm.controls.format;
  readonly payment_dates = this.vacanteForm.controls.payment_dates;
  readonly skills = this.vacanteForm.controls.skills;
  readonly tools = this.vacanteForm.controls.tools;
  readonly requirements = this.vacanteForm.controls.requirements;

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.vacanteForm.reset({
      title: '',
      description: '',
      ends_on: new Date(),
      min_salary: 0,
      max_salary: 0,
      workday_type: '',
      workday: [],
      contract_type: '',
      area: '',
      format: '',
      payment_dates: '',
      skills: [],
      tools: [],
      requirements: [],
    });

    this.vacanteForm.markAsPristine();
    this.vacanteForm.markAsUntouched();
  }

  /* AVISA A LA PÁGINA QUE SE AGREGÓ UNA NUEVA EXPERIENCIA */
  experienceAdded = output<void>();

  /* GUARDAR */
  save() {
    if (this.vacanteForm.invalid) {
      this.vacanteForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const {
      title,
      description,
      ends_on,
      min_salary,
      max_salary,
      workday_type,
      workday,
      contract_type,
      area,
      format,
      payment_dates,
      skills,
      tools,
      requirements,
    } = this.vacanteForm.getRawValue();

    const nuevaVacante = {
      title,
      description,
      ends_on: dayjs(ends_on).format('YYYY-MM-DD'),
      min_salary,
      max_salary,
      workday_type,
      workday,
      contract_type,
      area,
      format,
      payment_dates,
      skills,
      tools,
      requirements,
    };

    console.log(nuevaVacante);

    this.loading.set(false);
  }
  /*    this.aspirantesService
      .patchCV({
        works_experience: [nuevaExperiencia],
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('cv.experiencia_agregada_summary'),
            detail: this.translate.instant('cv.experiencia_agregada_detail'),
            life: 5000,
          });

          this.experienceAdded.emit();

          this.closeDialog();
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('cv.error_agregar_experiencia'),
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      }); */
}
