import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../validators/auth.validator';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

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

  // VALIDACIONES
  readonly signupForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    },
  );

  // PROPIEDADES
  readonly email = this.signupForm.controls.email;
  readonly password = this.signupForm.controls.password;
  readonly confirmPassword = this.signupForm.controls.confirmPassword;

  signup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.signupForm.getRawValue();

    this.authService.signupCandidato({ email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);

        this.router.navigate(['/login-candidato']);
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
