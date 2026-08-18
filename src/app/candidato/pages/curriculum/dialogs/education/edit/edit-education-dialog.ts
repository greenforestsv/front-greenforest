import { Component, inject, input, output, signal } from '@angular/core';
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
import { Education } from '../../../../../../core/interfaces/cv.interfaces';

@Component({
  selector: 'app-edit-education-dialog',
  templateUrl: './edit-education-dialog.html',
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
export class EditEducationDialog {
  education = input.required<Education>();
  private translate = inject(TranslateService);
  cvService = inject(CvService);
  private messageService = inject(MessageService);

  private fb = inject(FormBuilder);

  visible = signal(false);
  loading = signal(false);

  educationUpdated = output<void>();

  readonly educationForm = this.fb.nonNullable.group(
    {
      title: ['', Validators.required],
      start_date: [null as Date | null, Validators.required],
      end_date: [null as Date | null],
      educational_center: ['', Validators.required],
      level: ['', Validators.required],
    },
    {
      validators: endDateAfterStartDateValidator(),
    },
  );

  readonly title = this.educationForm.controls.title;
  readonly start_date = this.educationForm.controls.start_date;
  readonly end_date = this.educationForm.controls.end_date;
  readonly educational_center = this.educationForm.controls.educational_center;
  readonly level = this.educationForm.controls.level;

  openDialog() {
    const education = this.education();

    this.educationForm.reset({
      title: education.title ?? '',
      educational_center: education.educational_center ?? '',
      start_date: education.start_date ? new Date(education.start_date) : null,
      end_date: education.end_date ? new Date(education.end_date) : null,
      level: education.level ?? '',
    });

    this.educationForm.markAsPristine();
    this.educationForm.markAsUntouched();

    this.visible.set(true);
  }

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

  save() {
    if (this.educationForm.invalid) {
      console.log('invalid form');
      this.educationForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const id = this.education().id;

    if (id === undefined) {
      return;
    }

    const formValue = this.educationForm.getRawValue();

    const newEducation = {
      ...formValue,
      start_date: dayjs(formValue.start_date).format('YYYY-MM-DD'),
      end_date: formValue.end_date ? dayjs(formValue.end_date).format('YYYY-MM-DD') : undefined,
    };

    console.log(newEducation, id);

    this.cvService
      .updateEducation(newEducation, id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Educación actualizada',
            detail: 'Educación actualizada correctamente',
            life: 5000,
          });

          this.educationUpdated.emit();
          this.closeDialog();
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al actualizar educación',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }
}
