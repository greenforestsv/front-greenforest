import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AspirantesService } from '../../../../../core/services/aspirantes.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { phoneValidator } from '../../../../../shared/validators/form.validators';
import { SelectModule } from 'primeng/select';
import {
  PatchAspirantDto,
  PrivateAspirant,
} from '../../../../../core/interfaces/aspirant.interfaces';
import { CountriesSelect } from '../../../../../shared/components/countries-select/countries-select';
import { StatesSelect } from '../../../../../shared/components/states-select/states-select';

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
    CountriesSelect,
    StatesSelect,
  ],
})
export class EditarPerfilDialog {
  perfil = input.required<PrivateAspirant>();

  /* INJECCIÓN DE SERVICIOS */
  private translate = inject(TranslateService);
  private aspirantesService = inject(AspirantesService);
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  visible = signal(false);
  loading = signal(false);

  /* OPCIONES SELECT */
  genderOptions = [
    { label: 'Mujer', value: 'F' },
    { label: 'Hombre', value: 'M' },
    { label: 'Otro', value: 'U' },
  ];

  // ESTADOS INICIALES Y VALIDACIONES
  readonly perfilForm = this.fb.nonNullable.group({
    dni: ['', [Validators.required]],
    description: ['', [Validators.required]],
    profile_photo: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    second_name: [''],
    first_surname: ['', [Validators.required]],
    second_surname: [''],
    address: [''],
    birth_date: [new Date(), [Validators.required]],
    gender: ['', [Validators.required, Validators.pattern(/^(M|F|U)$/)]],
    country: ['', [Validators.required]],
    department: this.fb.control<number | null>(null, Validators.required),
    phone: ['', [Validators.required, phoneValidator()]],
    email: ['', [Validators.required, Validators.email]],
    profession: [''],
  });

  // PROPIEDADES
  readonly dni = this.perfilForm.controls.dni;
  readonly description = this.perfilForm.controls.description;
  readonly profile_photo = this.perfilForm.controls.profile_photo;
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
      dni: '',
      description: '',
      profile_photo: '',
      first_name: '',
      second_name: '',
      first_surname: '',
      second_surname: '',
      address: '',
      birth_date: new Date(),
      gender: '',
      country: '',
      department: null,
      phone: '',
      email: '',
      profession: '',
    });

    this.perfilForm.markAsPristine();
    this.perfilForm.markAsUntouched();
  }

  openDialog() {
    const perfil = this.perfil();

    this.perfilForm.reset({
      dni: perfil.dni ?? '',
      description: perfil.description ?? '',
      profile_photo: perfil.profile_photo ?? '',
      first_name: perfil.first_name ?? '',
      second_name: perfil.second_name ?? '',
      first_surname: perfil.first_surname ?? '',
      second_surname: perfil.second_surname ?? '',
      address: perfil.address ?? '',
      birth_date: perfil.birth_date ? new Date(perfil.birth_date) : new Date(),
      gender: perfil.gender ?? '',
      country: perfil.country?.ISO ?? '',
      department: perfil.department?.id ?? null,
      phone: perfil.phone ?? '',
      email: perfil.email ?? '',
      profession: perfil.profession ?? '',
    });

    this.perfilForm.markAsPristine();
    this.perfilForm.markAsUntouched();

    this.visible.set(true);
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

    const formValue = this.perfilForm.getRawValue();

    const perfilEdit: PatchAspirantDto = {
      ...formValue,
      department: formValue.department ?? undefined,
      birth_date: dayjs(formValue.birth_date).toISOString(),
    };

    console.log('PATCH:', perfilEdit);

    this.aspirantesService
      .patchAspirant(perfilEdit)
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

        error: (err: { error: { message?: string } }) => {
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
