import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';
import { SelectModule } from 'primeng/select';

import { Language } from '../../../../../core/interfaces/cv.interfaces';
import { CvService } from '../../../../../core/services/cv.service';

@Component({
  selector: 'app-languages-dialog',
  templateUrl: './languages-dialog.html',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    MessageModule,
  ],
})
export class LanguagesDialog {
  languages = input.required<Language[]>();

  private translate = inject(TranslateService);
  private cvService = inject(CvService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  languageOptions = [
    { label: 'Español', value: 'Español' },
    { label: 'Inglés', value: 'Inglés' },
    { label: 'Francés', value: 'Francés' },
    { label: 'Alemán', value: 'Alemán' },
    { label: 'Italiano', value: 'Italiano' },
    { label: 'Portugués', value: 'Portugués' },
  ];

  languageLevels = [
    { label: 'Básico', value: 'Básico' },
    { label: 'Intermedio', value: 'Intermedio' },
    { label: 'Avanzado', value: 'Avanzado' },
    { label: 'Nativo', value: 'Nativo' },
  ];

  mode = signal<'add' | 'edit'>('add');
  editingIndex = signal<number | null>(null);

  visible = signal(false);
  loading = signal(false);

  languagesUpdated = output<void>();

  readonly languageForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    level: ['', Validators.required],
  });

  readonly name = this.languageForm.controls.name;
  readonly level = this.languageForm.controls.level;

  openAdd() {
    this.mode.set('add');
    this.editingIndex.set(null);

    this.resetForm();

    this.visible.set(true);
  }

  openEdit(language: Language, index: number) {
    this.mode.set('edit');
    this.editingIndex.set(index);

    this.languageForm.reset({
      name: language.name,
      level: language.level,
    });

    this.languageForm.markAsPristine();
    this.languageForm.markAsUntouched();

    this.visible.set(true);
  }

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.languageForm.reset({
      name: '',
      level: '',
    });

    this.languageForm.markAsPristine();
    this.languageForm.markAsUntouched();
  }

  save() {
    if (this.languageForm.invalid) {
      this.languageForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const formLanguage = this.languageForm.getRawValue();

    /*let languages: Language[];

     if (this.mode() === 'add') {
      languages = [...this.languages(), formLanguage];
    } else {
      const index = this.editingIndex();

      if (index === null) {
        this.loading.set(false);
        return;
      }

      languages = this.languages().map((language, i) => (i === index ? formLanguage : language));
    } */

    this.cvService
      .patchLanguages([formLanguage])
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.mode() === 'add' ? 'Idioma agregado' : 'Idioma actualizado',
            detail:
              this.mode() === 'add'
                ? 'Idioma agregado correctamente'
                : 'Idioma actualizado correctamente',
            life: 5000,
          });

          this.languagesUpdated.emit();
          this.closeDialog();
        },

        error: (err: { error?: { message?: string } }) => {
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
