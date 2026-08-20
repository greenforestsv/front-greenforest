import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';
import { PasswordModule } from 'primeng/password';
import { passwordMatchValidator } from '../../../../../shared/validators/form.validators';
import { AuthTenantService } from '../../../../../auth/services/auth.tenant.service';
import { AuthAspirantService } from '../../../../../auth/services/auth.aspirant.service';

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
  private translate = inject(TranslateService);
  private authAspirantService = inject(AuthAspirantService);
  private authTenantService = inject(AuthTenantService);
  private messageService = inject(MessageService);

  private fb = inject(FormBuilder);

  visible = signal(false);
  loading = signal(false);

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

  save() {
    if (this.changePasswordForm.invalid) {
      console.log('invalid form');
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { current_password, new_password } = this.changePasswordForm.getRawValue();
    console.log({ old_password: current_password, new_password });

    this.authTenantService
      .updateCredentials({ old_password: current_password, new_password })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Contraseña actualizado',
            detail: 'Constraseña actualizada correctamente',
            life: 5000,
          });

          this.closeDialog();
          this.authAspirantService.logout();
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
