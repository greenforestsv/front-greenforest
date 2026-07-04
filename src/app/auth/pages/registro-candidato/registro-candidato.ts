import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { emailMatchValidator, phoneValidator } from '../../validators/auth.validator';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

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
  ],
  templateUrl: './registro-candidato.html',
  styleUrl: './registro-candidato.scss',
})
export class RegistroCandidato {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
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
      gender: ['F', [Validators.required, Validators.pattern(/^(M|F|U)$/)]],
      phone: ['', [Validators.required, phoneValidator()]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]],
      /*       password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      confirmPassword: ['', Validators.required], */
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
  readonly phone = this.signupForm.controls.phone;
  readonly email = this.signupForm.controls.email;
  readonly confirmEmail = this.signupForm.controls.confirmEmail;
  //readonly password = this.signupForm.controls.password;
  //readonly confirmPassword = this.signupForm.controls.confirmPassword;

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
    } = this.signupForm.getRawValue();
    const gender = this.signupForm.getRawValue().gender as 'M' | 'F' | 'U';

    this.authService
      .signupCandidato({
        first_name,
        first_surname,
        dni,
        birth_date,
        phone,
        email,
        gender,
        ...(second_name.trim() && { second_name }),
        ...(second_surname.trim() && { second_surname }),
        ...(address.trim() && { address }),
      })
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/verify', res.id], {
            state: {
              toast: {
                severity: 'success',
                summary: 'Cuenta creada',
                detail: 'Usá el código que recibiste por correo para verificar tu cuenta.',
                sticky: true,
              },
            },
          });
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error de creación de cuenta',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });

          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }
}
