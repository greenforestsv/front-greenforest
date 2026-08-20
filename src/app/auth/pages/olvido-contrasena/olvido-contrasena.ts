import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthAspirantService } from '../../services/auth.aspirant.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-olvido-contrasena',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
  ],
  templateUrl: './olvido-contrasena.html',
  styleUrl: './olvido-contrasena.scss',
})
export class OlvidoContrasena {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private asuthAspirantService = inject(AuthAspirantService);
  private router = inject(Router);

  // SIGNALS (estado UI)
  loading = signal(false);
  error = signal<string | null>(null);

  // FORM
  readonly resetPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    /* this.authService.resetPassword(this.resetPasswordForm.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);

        this.router.navigate(['/candidato/dashboard']);
      },
      error: (err: { error: { message: any } }) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al recuperar contraseña',
          detail: err.error?.message ?? 'Ocurrió un error inesperado',
          life: 5000,
        });

        this.loading.set(false);
      }
    }); */
  }
}
