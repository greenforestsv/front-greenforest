import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthTenantService } from '../../services/auth.tenant.service';
import { finalize } from 'rxjs';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login-empresarial',
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
  templateUrl: './login-empresarial.html',
  styleUrl: './login-empresarial.scss',
})
export class LoginEmpresarial {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authTenantService = inject(AuthTenantService);
  private router = inject(Router);

  constructor() {
    const toast = history.state.toast;

    if (toast) {
      this.messageService.clear();
      this.messageService.add(toast);
    }
  }

  loading = signal(false);

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

    this.authTenantService
      .loginEmployee(this.loginForm.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);

          this.router.navigate(['/empresa/perfil']);
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
