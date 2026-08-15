import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { endDateAfterStartDateValidator } from '../../../../../../shared/validators/form.validators';
import { Education } from '../../../../../../core/interfaces/cv.interfaces';
import { CvService } from '../../../../../../core/services/cv.service';

@Component({
  selector: 'app-add-education-dialog',
  templateUrl: './add-education-dialog.html',
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
export class AddEducationDialog {
  private translate = inject(TranslateService);
  cvService = inject(CvService);
  private messageService = inject(MessageService);

  private fb = inject(FormBuilder);

  visible = signal(false);
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  readonly educationForm = this.fb.nonNullable.group(
    {
      title: ['', Validators.required],
      start_date: [null, Validators.required],
      end_date: [null],
      level: ['', Validators.required],
      educational_center: ['', Validators.required],
    },
    {
      validators: endDateAfterStartDateValidator(),
    },
  );

  readonly title = this.educationForm.controls.title;
  readonly start_date = this.educationForm.controls.start_date;
  readonly end_date = this.educationForm.controls.end_date;
  readonly level = this.educationForm.controls.level;
  readonly educational_center = this.educationForm.controls.educational_center;

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.educationForm.reset({
      title: '',
      start_date: null,
      end_date: null,
      educational_center: '',
      level: '',
    });

    this.educationForm.markAsPristine();
    this.educationForm.markAsUntouched();
  }

  /* AVISA A LA PÁGINA QUE SE AGREGÓ UNA NUEVA EXPERIENCIA */
  experienceAdded = output<void>();

  save() {
    if (this.educationForm.invalid) {
      console.log('invalid form');
      this.educationForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const education = this.educationForm.getRawValue();

    const newEducation: Education = {
      ...education,
      start_date: dayjs(education.start_date).toISOString(),
      end_date: dayjs(education.end_date).toISOString(),
    };

    console.log(newEducation);

    this.cvService
      .createEducation(newEducation)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Educación agregada',
            detail: 'Educación agregada correctamente',
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
