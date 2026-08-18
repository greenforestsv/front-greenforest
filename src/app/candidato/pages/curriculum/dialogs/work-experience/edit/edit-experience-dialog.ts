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
import { toArray } from '../../../../../../shared/utils/string.utils';
import { WorkExperience } from '../../../../../../core/interfaces/cv.interfaces';
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
  workExperience = input.required<WorkExperience>();
  private translate = inject(TranslateService);
  cvService = inject(CvService);
  private messageService = inject(MessageService);

  private fb = inject(FormBuilder);

  visible = signal(false);
  loading = signal(false);

  experienceUpdated = output<void>();

  readonly experienceForm = this.fb.nonNullable.group(
    {
      title: ['', Validators.required],
      start_date: [null as Date | null, Validators.required],
      end_date: [null as Date | null],
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

  openDialog() {
    const workExperience = this.workExperience();

    this.experienceForm.reset({
      title: workExperience.title ?? '',
      company: workExperience.company ?? '',
      start_date: workExperience.start_date ? new Date(workExperience.start_date) : null,
      end_date: workExperience.end_date ? new Date(workExperience.end_date) : null,
      area: workExperience.area ?? '',
      activities: workExperience.activities?.join('\n') ?? '',
    });

    this.experienceForm.markAsPristine();
    this.experienceForm.markAsUntouched();

    this.visible.set(true);
  }

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

  save() {
    if (this.experienceForm.invalid) {
      console.log('invalid form');
      this.experienceForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const id = this.workExperience().id;

    if (id === undefined) {
      return;
    }

    const formValue = this.experienceForm.getRawValue();

    const nuevaExperiencia = {
      ...formValue,
      start_date: dayjs(formValue.start_date).format('YYYY-MM-DD'),
      end_date: formValue.end_date ? dayjs(formValue.end_date).format('YYYY-MM-DD') : null,
      activities: toArray(formValue.activities),
    };

    console.log(nuevaExperiencia, id);

    this.cvService
      .updateWorkExperience(nuevaExperiencia, id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Experiencia actualizada',
            detail: 'Experiencia actualizada correctamente',
            life: 5000,
          });

          this.experienceUpdated.emit();
          this.closeDialog();
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al actualizar experiencia',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }
}
