import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login-candidato',
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelModule, ButtonModule, InputTextModule, PasswordModule],
  templateUrl: './login-candidato.html',
  styleUrl: './login-candidato.scss',
})
export class LoginCandidato {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // SIGNALS (estado UI)
  loading = signal(false);
  error = signal<string | null>(null);

  // FORM
  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.authService.loginCandidato(this.loginForm.getRawValue()).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);

        this.router.navigate(['/candidato/dashboard']);
      },
      error: (err: { error: { message: any } }) => {
        this.error.set(err.error?.message ?? 'Error en login');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
