import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../../core/validators/form.validators';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cambio-contrasena',
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
  templateUrl: './cambio-contrasena.html',
  styleUrl: './cambio-contrasena.scss',
})
export class CambioContrasena {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // SIGNALS (estado UI)
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  // VALIDACIONES
  readonly changePasswordForm = this.fb.nonNullable.group(
    {
      current_password: ['', [Validators.required]],
      new_password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      confirm_new_password: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    },
  );

  // PROPIEDADES
  readonly current_password = this.changePasswordForm.controls.current_password;
  readonly new_password = this.changePasswordForm.controls.new_password;
  readonly confirm_new_password = this.changePasswordForm.controls.confirm_new_password;

  changePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { current_password, new_password } = this.changePasswordForm.getRawValue();

    this.authService
      .changePassword(current_password, new_password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
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
            summary: 'Error de al cambiar contraseña',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
