import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AspirantesService } from '../../../../services/aspirantes.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { phoneValidator } from '../../../../../auth/validators/auth.validator';
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
  aspirantesService = inject(AspirantesService);
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  visible = signal(false);
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  /* OPCIONES SELECT */
  genderOptions = [
    { label: 'Mujer', value: 'F' },
    { label: 'Hombre', value: 'M' },
    { label: 'Otro', value: 'U' },
  ];
  countryOptions = [{ label: 'Honduras', value: 'HN' }];
  departmentOptions = [{ label: 'Francisco Morazán', value: 'FM' }];

  // ESTADOS INICIALES Y VALIDACIONES
  readonly perfilForm = this.fb.nonNullable.group({
    first_name: ['', [Validators.required]],
    second_name: [''],
    first_surname: ['', [Validators.required]],
    second_surname: [''],
    address: [''],
    birth_date: [new Date(), [Validators.required]],
    gender: ['', [Validators.required, Validators.pattern(/^(M|F|U)$/)]],
    country: ['', [Validators.required]],
    department: ['', [Validators.required]],
    phone: ['', [Validators.required, phoneValidator()]],
    email: ['', [Validators.required, Validators.email]],
    profession: [''],
  });

  // PROPIEDADES
  readonly first_name = this.perfilForm.controls.first_name;
  readonly second_name = this.perfilForm.controls.second_name;
  readonly first_surname = this.perfilForm.controls.first_surname;
  readonly second_surname = this.perfilForm.controls.second_surname;
  readonly address = this.perfilForm.controls.address;
  readonly birth_date = this.perfilForm.controls.birth_date;
  readonly gender = this.perfilForm.controls.gender;
  readonly country = this.perfilForm.controls.country;
  readonly department = this.perfilForm.controls.department;
  readonly phone = this.perfilForm.controls.phone;
  readonly email = this.perfilForm.controls.email;
  readonly profession = this.perfilForm.controls.profession;

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.perfilForm.reset({
      first_name: '',
      second_name: '',
      first_surname: '',
      second_surname: '',
      address: '',
      birth_date: new Date(),
      gender: '',
      country: '',
      department: '',
      phone: '',
      email: '',
      profession: '',
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

    const perfilEdit = {
      ...perfil,
      birth_date: dayjs(perfil.birth_date).toISOString(),
    };

    console.log(perfilEdit);
    this.aspirantesService
      .patchApirant(perfilEdit)
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
