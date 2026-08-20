import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthAspirantService } from '../../services/auth.aspirant.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-candidato',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
    MessageModule,
  ],
  templateUrl: './login-candidato.html',
  styleUrl: './login-candidato.scss',
})
export class LoginCandidato {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authAspirantService = inject(AuthAspirantService);
  private router = inject(Router);

  constructor() {
    const toast = history.state.toast;

    if (toast) {
      this.messageService.clear();
      this.messageService.add(toast);
    }
  }

  // SIGNALS (estado UI)
  loading = signal(false);
  error = signal<string | null>(null);

  // FORM
  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  readonly email = this.loginForm.controls.email;
  readonly password = this.loginForm.controls.password;

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.authAspirantService
      .loginCandidato(this.loginForm.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);

          this.router.navigate(['/candidato/perfil']);
        },
        error: (err: { error: { message: any }; status: number }) => {
          if (err.status === 401) {
            this.loginForm.setErrors({ invalidCredentials: true });
            this.loginForm.markAllAsTouched();
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Error al iniciar sesión',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
