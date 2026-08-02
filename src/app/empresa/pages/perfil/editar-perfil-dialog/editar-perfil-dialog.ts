import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EmpresasService } from '../../../../core/services/empresas.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { finalize } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { phoneValidator } from '../../../../auth/validators/auth.validator';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-editar-perfil-dialog',
  templateUrl: './editar-perfil-dialog.html',
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
    SelectModule,
  ],
})
export class EditarPerfilDialog {
  /* INJECCIÓN DE SERVICIOS */
  private translate = inject(TranslateService);
  empresasService = inject(EmpresasService);
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  visible = signal(false);
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  /* OPCIONES SELECT */
  countryOptions = [{ label: 'Honduras', value: 'HN' }];
  departmentOptions = [{ label: 'Francisco Morazán', value: 'FM' }];

  // ESTADOS INICIALES Y VALIDACIONES
  readonly perfilForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, phoneValidator()]],
    cell_phone: ['', phoneValidator()],
    description: ['', Validators.required],
    approach: ['', Validators.required],
    locations: ['', Validators.required],
    url_profile_photo: [''],
  });

  // PROPIEDADES
  readonly name = this.perfilForm.controls.name;
  readonly phone = this.perfilForm.controls.phone;
  readonly cell_phone = this.perfilForm.controls.cell_phone;
  readonly description = this.perfilForm.controls.description;
  readonly approach = this.perfilForm.controls.approach;
  readonly locations = this.perfilForm.controls.locations;
  readonly url_profile_photo = this.perfilForm.controls.url_profile_photo;

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.perfilForm.reset({
      name: '',
      phone: '',
      cell_phone: '',
      description: '',
      approach: '',
      locations: '',
      url_profile_photo: '',
    });

    this.perfilForm.markAsPristine();
    this.perfilForm.markAsUntouched();
  }

  /* RECARGA PÁGINA */
  perfilEditado = output<void>();

  /* GUARDAR */
  save() {
    if (this.perfilForm.invalid) {
      console.log('invalid form');
      this.perfilForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const perfil = this.perfilForm.getRawValue();

    const cleanLocations = perfil.locations
      .split(/\n/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (cleanLocations.length === 0) {
      this.perfilForm.controls.locations.setErrors({ required: true });
      this.perfilForm.controls.locations.markAsTouched();
      this.loading.set(false);
      return;
    }

    const cleanApproach = perfil.approach
      .split(/\n/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (cleanApproach.length === 0) {
      this.perfilForm.controls.approach.setErrors({ required: true });
      this.perfilForm.controls.approach.markAsTouched();
      this.loading.set(false);
      return;
    }

    const perfilEdit = {
      ...perfil,
      locations: cleanLocations,
      approach: cleanApproach,
    };

    console.log(perfilEdit);
    this.empresasService
      .patchEmpresa(perfilEdit)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: '',
            life: 5000,
          });

          this.perfilEditado.emit();

          this.closeDialog();
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al editar datos de perfil',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }
}
