import { Component, inject, input, output, signal } from '@angular/core';
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
import { phoneValidator } from '../../../../shared/validators/form.validators';
import { SelectModule } from 'primeng/select';
import { PerfilEmpresaDto } from '../../../../core/interfaces/empresa.interface';
import { toArray } from '../../../../shared/utils/string.utils';

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
  perfil = input.required<PerfilEmpresaDto>();

  private translate = inject(TranslateService);
  empresasService = inject(EmpresasService);
  private messageService = inject(MessageService);

  private fb = inject(FormBuilder);

  visible = signal(false);
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  countryOptions = [{ label: 'Honduras', value: 'HN' }];
  departmentOptions = [{ label: 'Francisco Morazán', value: 'FM' }];

  // ESTADOS INICIALES Y VALIDACIONES
  readonly perfilForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, phoneValidator()]],
    cel_phone: ['', phoneValidator()],
    description: ['', Validators.required],
    approach: ['', Validators.required],
    locations: ['', Validators.required],
    url_profile_photo: [''],
  });

  // PROPIEDADES
  readonly name = this.perfilForm.controls.name;
  readonly phone = this.perfilForm.controls.phone;
  readonly cel_phone = this.perfilForm.controls.cel_phone;
  readonly description = this.perfilForm.controls.description;
  readonly approach = this.perfilForm.controls.approach;
  readonly locations = this.perfilForm.controls.locations;
  readonly url_profile_photo = this.perfilForm.controls.url_profile_photo;

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  openDialog() {
    const perfil = this.perfil();

    this.perfilForm.reset({
      name: perfil.name ?? '',
      phone: perfil.phone ?? '',
      cel_phone: perfil.cel_phone ?? '',
      description: perfil.description ?? '',

      approach: perfil.approach?.join('\n') ?? '',
      locations: perfil.locations?.join('\n') ?? '',

      url_profile_photo: perfil.url_profile_photo ?? '',
    });

    this.perfilForm.markAsPristine();
    this.perfilForm.markAsUntouched();

    this.error.set(null);
    this.visible.set(true);
  }

  resetForm() {
    this.perfilForm.reset({
      name: '',
      phone: '',
      cel_phone: '',
      description: '',
      approach: '',
      locations: '',
      url_profile_photo: '',
    });

    this.perfilForm.markAsPristine();
    this.perfilForm.markAsUntouched();
  }

  perfilEditado = output<void>();

  save() {
    if (this.perfilForm.invalid) {
      console.log('invalid form');
      this.perfilForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const formValue = this.perfilForm.getRawValue();

    const perfilEdit = {
      ...formValue,
      locations: toArray(formValue.locations),
      approach: toArray(formValue.approach),
    };

    console.log(perfilEdit);
    this.empresasService
      .patchEmpresa(perfilEdit)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Perfil actualizado',
            detail: 'Los datos del perfil se actualizaron correctamente',
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
