import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { AuthTenantService } from '../../services/auth.tenant.service';
import { emailMatchValidator, phoneValidator } from '../../../core/validators/form.validators';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { finalize } from 'rxjs';
//import { SignupCandidatoResponse } from '../../interfaces/auth.interface';
import { SignupTenantDto } from '../../interfaces/auth.tenant.interface';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-registro-empresa',
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
    TextareaModule,
    CheckboxModule,
    FileUploadModule,
  ],
  templateUrl: './registro-empresa.html',
  styleUrl: './registro-empresa.scss',
})
export class RegistroEmpresa {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authTenantService = inject(AuthTenantService);
  private router = inject(Router);

  // SIGNALS (estado UI)
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  is_isolate_options = [
    { label: 'No', value: 'NO' },
    { label: 'Instancia', value: 'INSTANCE' },
  ];
  genderOptions = [
    { label: 'Mujer', value: 'F' },
    { label: 'Hombre', value: 'M' },
    { label: 'Otro', value: 'U' },
  ];
  countryOptions = [{ label: 'Honduras', value: 'HN' }];
  departmentOptions = [{ label: 'Francisco Morazán', value: 'FM' }];

  // VALIDACIONES Y ESTADOS INICIALES
  readonly signupForm = this.fb.nonNullable.group(
    {
      tenant_name: ['', Validators.required],
      tenant_email: ['', [Validators.required, Validators.email]],
      confirm_email: ['', Validators.required],
      tenant_alternative_email: ['', Validators.email],

      phone: ['', [Validators.required, phoneValidator()]],
      cell_phone: ['', phoneValidator()],

      description: ['', Validators.required],

      approach: ['', Validators.required],
      locations: ['', Validators.required],

      is_multinational: [false],
      url_profile_photo: [''],
      database_host: [''],
      is_isolate: ['', Validators.required],
      have_carnets: [false],

      representative: this.fb.nonNullable.group({
        dni: ['', Validators.required],
        first_name: ['', Validators.required],
        second_name: [''],
        first_surname: ['', Validators.required],
        second_surname: [''],
        birth_date: [new Date(), Validators.required],
        gender: ['', [Validators.required, Validators.pattern(/^(M|F|U)$/)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, phoneValidator()]],
        country: ['', Validators.required],
        department: ['', Validators.required],
        profession: ['', Validators.required],
        address: [''],
        carnet: ['', Validators.required],
      }),
    },
    {
      validators: emailMatchValidator,
    },
  );

  // PROPIEDADES
  readonly tenant_name = this.signupForm.controls.tenant_name;
  readonly tenant_email = this.signupForm.controls.tenant_email;
  readonly confirm_email = this.signupForm.controls.confirm_email;
  readonly tenant_alternative_email = this.signupForm.controls.tenant_alternative_email;

  readonly phone = this.signupForm.controls.phone;
  readonly cell_phone = this.signupForm.controls.cell_phone;

  readonly description = this.signupForm.controls.description;
  readonly approach = this.signupForm.controls.approach;
  readonly locations = this.signupForm.controls.locations;

  readonly is_multinational = this.signupForm.controls.is_multinational;
  readonly url_profile_photo = this.signupForm.controls.url_profile_photo;
  readonly database_host = this.signupForm.controls.database_host;
  readonly is_isolate = this.signupForm.controls.is_isolate;
  readonly have_carnets = this.signupForm.controls.have_carnets;

  readonly representative = this.signupForm.controls.representative;

  readonly dni = this.representative.controls.dni;
  readonly first_name = this.representative.controls.first_name;
  readonly second_name = this.representative.controls.second_name;
  readonly first_surname = this.representative.controls.first_surname;
  readonly second_surname = this.representative.controls.second_surname;
  readonly birth_date = this.representative.controls.birth_date;
  readonly gender = this.representative.controls.gender;
  readonly email = this.representative.controls.email;
  readonly representativePhone = this.representative.controls.phone;
  readonly country = this.representative.controls.country;
  readonly department = this.representative.controls.department;
  readonly profession = this.representative.controls.profession;
  readonly address = this.representative.controls.address;
  readonly carnet = this.representative.controls.carnet;

  signup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      console.log('invalid form');
      return;
    }
    console.log('valid form');

    this.loading.set(true);
    this.error.set(null);

    const {
      approach,
      locations,
      database_host,
      cell_phone,
      tenant_alternative_email,
      url_profile_photo,
      confirm_email,
      representative: { second_name, second_surname, address, ...representative },
      ...company
    } = this.signupForm.getRawValue();

    const cleanApproach = approach
      .split(/\n/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (cleanApproach.length === 0) {
      this.signupForm.controls.approach.setErrors({ required: true });
      this.signupForm.controls.approach.markAsTouched();
      this.loading.set(false);
      return;
    }

    const cleanLocations = locations
      .split(/\n/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (cleanLocations.length === 0) {
      this.signupForm.controls.locations.setErrors({ required: true });
      this.signupForm.controls.locations.markAsTouched();
      this.loading.set(false);
      return;
    }

    const gender = this.representative.getRawValue().gender as 'M' | 'F' | 'U';
    const is_isolate = this.is_isolate.getRawValue() as 'NO' | 'INSTANCE';

    const departmentLabel =
      this.departmentOptions.find((d) => d.value === representative.department)?.label ?? '';

    const data = {
      ...company,
      is_isolate,
      approach: cleanApproach,
      locations: cleanLocations,
      ...(database_host.trim() && { database_host }),
      ...(cell_phone.trim() && { cell_phone }),
      ...(tenant_alternative_email.trim() && { tenant_alternative_email }),
      ...(url_profile_photo.trim() && { url_profile_photo }),
      representative: {
        ...representative,
        gender,
        department: departmentLabel,
        ...(second_name.trim() && { second_name }),
        ...(second_surname.trim() && { second_surname }),
        ...(address.trim() && { address }),
      },
    };

    this.authTenantService
      .signupTenant(data)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);

          this.messageService.add({
            severity: 'success',
            summary: 'Cuenta creada',
            detail:
              'La cuenta fue creada correctamente. Utilizá la contrseña que enviamos a tu correo.',
            sticky: true,
          });
          this.router.navigate(['/empresa'], {
            state: {
              toast: {
                severity: 'success',
                summary: 'Cuenta creada',
                detail:
                  'La cuenta fue creada correctamente. Utilizá la contrseña que enviamos a tu correo.',
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
        },
      });
  }

  onUpload(event: FileUploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }
}
