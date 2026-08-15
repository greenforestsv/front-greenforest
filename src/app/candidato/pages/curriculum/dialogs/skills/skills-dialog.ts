import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { AspirantesService } from '../../../../services/aspirantes.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { toArray } from '../../../../../shared/utils/string.utils';

@Component({
  selector: 'app-skills-dialog',
  imports: [
    ButtonModule,
    DialogModule,
    MessageModule,
    TextareaModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './skills-dialog.html',
})
export class SkillsDialog {
  skillsList = input<string[]>([]);

  private translate = inject(TranslateService);
  aspirantesService = inject(AspirantesService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  editingIndex = signal<number | null>(null);
  visible = signal(false);
  loading = signal(false);

  // ESTADOS INICIALES Y VALIDACIONES
  readonly skillsForm = this.fb.nonNullable.group({
    skills: ['', Validators.required],
  });
  readonly skills = this.skillsForm.controls.skills;

  open() {
    // string[] -> string
    this.skillsForm.patchValue({
      skills: this.skillsList().join('\n'),
    });

    this.visible.set(true);
  }

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.skillsForm.reset({
      skills: '',
    });

    this.skillsForm.markAsPristine();
    this.skillsForm.markAsUntouched();
  }

  /* LLAMA A LOADCV */
  skillsUpdated = output<void>();

  /* GUARDAR */
  save() {
    if (this.skillsForm.invalid) {
      console.log('invalid form');
      this.skillsForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const skills = toArray(this.skills.value);
    console.log(skills);

    this.aspirantesService
      .patchAspirant({
        skills,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Habilidades actualizadas',
            detail: 'Habilidades actualizadas correctamente',
            life: 5000,
          });

          this.skillsUpdated.emit();
          this.closeDialog();
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }
}
