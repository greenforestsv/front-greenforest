import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CvService } from '../../../../../../core/services/cv.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { endDateAfterStartDateValidator } from '../../../../../../shared/validators/form.validators';
@Component({
  selector: 'app-edit-experience-dialog',
  templateUrl: './edit-experience-dialog.html',
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
  ],
})
export class EditExperienceDialog {
  /* INJECCIÓN DE SERVICIOS */
  private translate = inject(TranslateService);
  cvService = inject(CvService);
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  visible = signal(false);
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  // ESTADOS INICIALES Y VALIDACIONES
  readonly experienceForm = this.fb.nonNullable.group(
    {
      title: ['', Validators.required],
      start_date: [new Date(), Validators.required],
      end_date: [null],
      company: ['', Validators.required],
      area: ['', Validators.required],
      activities: ['', Validators.required],
    },
    {
      validators: endDateAfterStartDateValidator(),
    },
  );

  readonly title = this.experienceForm.controls.title;
  readonly start_date = this.experienceForm.controls.start_date;
  readonly end_date = this.experienceForm.controls.end_date;
  readonly company = this.experienceForm.controls.company;
  readonly area = this.experienceForm.controls.area;
  readonly activities = this.experienceForm.controls.activities;

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.experienceForm.reset({
      title: '',
      start_date: new Date(),
      end_date: null,
      company: '',
      area: '',
      activities: '',
    });

    this.experienceForm.markAsPristine();
    this.experienceForm.markAsUntouched();
  }

  /* AVISA A LA PÁGINA QUE SE AGREGÓ UNA NUEVA EXPERIENCIA */
  experienceAdded = output<void>();

  /* GUARDAR */
  save() {
    if (this.experienceForm.invalid) {
      this.experienceForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { title, start_date, end_date, company, area, activities } =
      this.experienceForm.getRawValue();

    const cleanActivities = activities
      .split(/\n/)
      .map((activity) => activity.trim())
      .filter((activity) => activity.length > 0);

    if (cleanActivities.length === 0) {
      this.experienceForm.controls.activities.setErrors({
        required: true,
      });
      this.experienceForm.controls.activities.markAsTouched();
      this.loading.set(false);
      return;
    }

    const nuevaExperiencia = {
      title,
      start_date: dayjs(start_date).format('YYYY-MM-DD'),
      end_date: end_date ? dayjs(end_date).format('YYYY-MM-DD') : null,
      company,
      area,
      activities: cleanActivities,
    };

    console.log(nuevaExperiencia);

    this.cvService
      .updateWorkExperience(nuevaExperiencia, 'id')
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
      });
  }
}
