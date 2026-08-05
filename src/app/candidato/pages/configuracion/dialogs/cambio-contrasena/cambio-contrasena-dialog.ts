import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../../auth/services/auth.service';
import { PasswordModule } from 'primeng/password';
import { passwordMatchValidator } from '../../../../../shared/validators/form.validators';

@Component({
  selector: 'app-cambio-contrasena-dialog',
  templateUrl: './cambio-contrasena-dialog.html',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    MessageModule,
    PasswordModule,
  ],
})
export class CambioContrasenaDialog {
  /* INYECCIÓN DE SERVICIOS */
  private translate = inject(TranslateService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  visible = signal(false);
  loading = signal(false);

  // ESTADOS INICIALES Y VALIDACIONES
  readonly changePasswordForm = this.fb.nonNullable.group(
    {
      current_password: ['', Validators.required],
      confirm_new_password: ['', Validators.required],
      new_password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
        ],
      ],
    },
    {
      validators: passwordMatchValidator('new_password', 'confirm_new_password'),
    },
  );

  readonly current_password = this.changePasswordForm.controls.current_password;
  readonly confirm_new_password = this.changePasswordForm.controls.confirm_new_password;
  readonly new_password = this.changePasswordForm.controls.new_password;

  openDialog() {
    this.resetForm();
    this.visible.set(true);
  }

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.changePasswordForm.reset({
      current_password: '',
      confirm_new_password: '',
      new_password: '',
    });

    this.changePasswordForm.markAsPristine();
    this.changePasswordForm.markAsUntouched();
  }

  /* GUARDAR */
  save() {
    if (this.changePasswordForm.invalid) {
      console.log('invalid form');
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { current_password, new_password } = this.changePasswordForm.getRawValue();
    console.log({ current_password, new_password });

    this.authService
      .changePassword(current_password, new_password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          /* this.messageService.add({
            severity: 'success',
            summary: 'Idioma actualizado',
            detail: 'Idioma actualizado correctamente',
            life: 5000,
          }); */

          this.closeDialog();
          this.authService.logout();
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }
}
