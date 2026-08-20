import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthAspirantService } from '../../services/auth.aspirant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, FloatLabelModule, InputTextModule],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
})
export class Verify {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authAspirantService = inject(AuthAspirantService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    const storedId = sessionStorage.getItem('verifyId');

    if (!storedId || storedId !== this.id) {
      this.router.navigate(['/not-found']);
    }

    const toast = history.state.toast;

    if (toast) {
      this.messageService.clear();
      this.messageService.add(toast);
    }
  }

  // ID de URL
  id = this.route.snapshot.paramMap.get('id');

  // SIGNALS (estado UI)
  loading = signal(false);
  error = signal<string | null>(null);

  // FORM
  readonly verifyForm = this.fb.nonNullable.group({
    code: ['', Validators.required],
  });

  verify(): void {
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { code } = this.verifyForm.getRawValue();

    this.authAspirantService
      .verifyCandidato(this.id!, code)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/login-candidato'], {
            state: {
              toast: {
                severity: 'success',
                summary: 'Cuenta verificada',
                detail:
                  'Tu cuenta fue verificada correctamente. Usá la contraseña que recibiste por correo para iniciar sesión.',
                sticky: true,
              },
            },
          });
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al verificar correo',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
