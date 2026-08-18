import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AspirantesService } from '../../../../../core/services/aspirantes.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';
import { Language } from '../../../../../core/interfaces/cv.interfaces';
import { SelectModule } from 'primeng/select';

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
  /* IMPORTS */
  languages = input.required<Language[]>();

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

  /* INJECCIÓN DE SERVICIOS */
  private translate = inject(TranslateService);
  aspirantesService = inject(AspirantesService);
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  mode = signal<'add' | 'edit'>('add');
  editingLanguage = signal<Language | null>(null);
  editingIndex = signal<number | null>(null);
  visible = signal(false);
  loading = signal(false);

  // ESTADOS INICIALES Y VALIDACIONES
  readonly languageForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    level: ['', Validators.required],
  });

  readonly name = this.languageForm.controls.name;
  readonly level = this.languageForm.controls.level;

  openAdd() {
    this.mode.set('add');
    this.editingLanguage.set(null);
    this.editingIndex.set(null);
    this.resetForm();
    this.visible.set(true);
  }

  openEdit(language: Language, index: number) {
    this.mode.set('edit');
    this.editingLanguage.set(language);
    this.editingIndex.set(index);

    this.languageForm.patchValue({
      name: language.name,
      level: language.level,
    });

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

  /* LLAMA A LOADCV */
  languageAdded = output<void>();

  /* GUARDAR */
  save() {
    /*  if (this.languageForm.invalid) {
      console.log('invalid form');
      this.languageForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const language: Language = this.languageForm.getRawValue();
    console.log(language);

    const request =
      this.mode() === 'add'
        ? this.aspirantesService.patchCV({
            languages: [language],
          })
        : (() => {
            const languages = [...this.languages()];
            languages[this.editingIndex()!] = language;

            return this.aspirantesService.patchCV({
              languages,
            });
          })();

    request.pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: this.mode() === 'add' ? 'Idioma agregado' : 'Idioma actualizado',
          detail:
            this.mode() === 'add'
              ? 'Idioma agregado correctamente'
              : 'Idioma actualizado correctamente',
          life: 5000,
        });

        this.languageAdded.emit();
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
    });*/
  }
}
