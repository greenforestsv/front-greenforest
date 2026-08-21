import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { AuthAspirantService } from '../../../auth/services/auth.aspirant.service';
import { emailMatchValidator, phoneValidator } from '../../../shared/validators/form.validators';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { finalize } from 'rxjs';
import { SignupCandidatoResponse } from '../../../auth/interfaces/auth.aspirant.interface';
import { CountriesSelect } from '../../../shared/components/countries-select/countries-select';
import { PoliticasPrivacidadCheckbox } from '../../../shared/components/politicas-privacidad-checkbox/politicas-privacidad-checkbox';
import { StatesSelect } from '../../../shared/components/states-select/states-select';
import { Gender } from '../../../shared/pipes/gender.pipe';

@Component({
  selector: 'app-registro-candidato',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    FloatLabelModule,
    MessageModule,
    SelectModule,
    DatePickerModule,
    CountriesSelect,
    PoliticasPrivacidadCheckbox,
    StatesSelect,
  ],
  templateUrl: './registro-candidato.html',
  styleUrl: './registro-candidato.scss',
})
export class RegistroCandidato {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authAspirantService = inject(AuthAspirantService);
  private router = inject(Router);

  // SIGNALS (estado UI)
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  genderOptions = [
    { label: 'Mujer', value: 'F' },
    { label: 'Hombre', value: 'M' },
    { label: 'Otro', value: 'U' },
  ];

  // VALIDACIONES
  readonly signupForm = this.fb.nonNullable.group(
    {
      first_name: ['', [Validators.required]],
      second_name: [''],
      first_surname: ['', [Validators.required]],
      second_surname: [''],
      address: [''],
      dni: ['', [Validators.required]],
      birth_date: [new Date(), [Validators.required]],
      gender: ['', [Validators.required, Validators.pattern(/^(M|F|U)$/)]],
      country: ['', [Validators.required]],
      department: this.fb.nonNullable.control<number>(0, Validators.required),
      phone: ['', [Validators.required, phoneValidator()]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]],
      profession: [''],
      accepts_privacy: [false, Validators.requiredTrue],
    },
    {
      validators: emailMatchValidator,
    },
  );

  // PROPIEDADES
  readonly first_name = this.signupForm.controls.first_name;
  readonly second_name = this.signupForm.controls.second_name;
  readonly first_surname = this.signupForm.controls.first_surname;
  readonly second_surname = this.signupForm.controls.second_surname;
  readonly address = this.signupForm.controls.address;
  readonly dni = this.signupForm.controls.dni;
  readonly birth_date = this.signupForm.controls.birth_date;
  readonly gender = this.signupForm.controls.gender;
  readonly country = this.signupForm.controls.country;
  readonly department = this.signupForm.controls.department;
  readonly phone = this.signupForm.controls.phone;
  readonly email = this.signupForm.controls.email;
  readonly confirmEmail = this.signupForm.controls.confirmEmail;
  readonly profession = this.signupForm.controls.profession;
  readonly accepts_privacy = this.signupForm.controls.accepts_privacy;

  signup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const {
      first_name,
      second_name,
      first_surname,
      second_surname,
      address,
      dni,
      birth_date,
      phone,
      email,
      country,
      department,
      profession,
    } = this.signupForm.getRawValue();

    const gender = this.signupForm.getRawValue().gender as Gender;

    this.authAspirantService
      .signupCandidato({
        first_name,
        first_surname,
        dni,
        birth_date,
        phone,
        email,
        gender,
        country,
        department,
        ...(second_name.trim() && { second_name }),
        ...(second_surname.trim() && { second_surname }),
        ...(address.trim() && { address }),
        ...(profession.trim() && { profession }),
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: SignupCandidatoResponse) => {
          localStorage.setItem('token', res.token);

          this.router.navigate(['/candidato'], {
            state: {
              toast: {
                severity: 'success',
                summary: 'Cuenta creada',
                detail: 'Tu cuenta fue creada correctamente.',
                sticky: true,
              },
            },
          });
          /* sessionStorage.setItem('verifyId', res.id);
          this.router.navigate(['/verify', res.id], {
            state: {
              toast: {
                severity: 'success',
                summary: 'Cuenta creada',
                detail: 'Usá el código que recibiste por correo para verificar tu cuenta.',
                sticky: true,
              },
            },
          }); */
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error de creación de cuenta',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
