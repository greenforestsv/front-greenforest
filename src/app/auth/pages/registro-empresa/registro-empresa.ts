import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthTenantService } from '../../services/auth.tenant.service';
import { emailMatchValidator } from '../../../shared/validators/form.validators';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Gender } from '../../../shared/pipes/gender.pipe';
import { toArray } from '../../../shared/utils/string.utils';
import { buildPhoneNumber } from '../../../shared/utils/phone.utils';
import { TenantForm } from './forms/tenant-form/tenant-form';
import { RepresentativeForm } from './forms/representative-form/representative-form';

@Component({
  selector: 'app-registro-empresa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    FormsModule,
    TenantForm,
    RepresentativeForm,
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
  currentStep = signal<1 | 2>(1);

  is_isolate_options = [
    { label: 'No', value: 'NO' },
    { label: 'Instancia', value: 'INSTANCE' },
  ];

  // VALIDACIONES Y ESTADOS INICIALES
  readonly signupForm = this.fb.nonNullable.group({
    tenant: this.fb.nonNullable.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirm_email: ['', Validators.required],
        tenant_alternative_email: ['', Validators.email],

        tenant_phone_code: ['', Validators.required],
        tenant_phone: ['', Validators.required],
        cel_phone_code: [''],
        cel_phone: [''],

        description: ['', Validators.required],

        approach: ['', Validators.required],
        locations: this.fb.nonNullable.control<string[]>([], Validators.required),

        is_multinational: [false],
        have_carnets: [false],
      },
      {
        validators: emailMatchValidator,
      },
    ),

    representative: this.fb.nonNullable.group({
      dni: ['', Validators.required],
      first_name: ['', Validators.required],
      second_name: [''],
      first_surname: ['', Validators.required],
      second_surname: [''],
      birth_date: [new Date(), Validators.required],
      gender: this.fb.control<Gender | ''>('', {
        validators: [Validators.required, Validators.pattern(/^(M|F|U)$/)],
      }),
      email: ['', [Validators.required, Validators.email]],
      rep_phone_code: ['', Validators.required],
      rep_phone: ['', Validators.required],
      country: ['', [Validators.required]],
      department: this.fb.nonNullable.control<number>(0, Validators.required),
      profession: ['', Validators.required],
      address: [''],
      carnet: ['', Validators.required],
    }),
  });

  readonly tenantForm = this.signupForm.controls.tenant;
  readonly representativeForm = this.signupForm.controls.representative;

  // PROPIEDADES
  readonly name = this.tenantForm.controls.name;
  readonly email = this.tenantForm.controls.email;
  readonly confirm_email = this.tenantForm.controls.confirm_email;
  readonly tenant_alternative_email = this.tenantForm.controls.tenant_alternative_email;

  readonly tenant_phone_code = this.tenantForm.controls.tenant_phone_code;
  readonly tenant_phone = this.tenantForm.controls.tenant_phone;
  readonly cel_phone_code = this.tenantForm.controls.cel_phone_code;
  readonly cel_phone = this.tenantForm.controls.cel_phone;

  readonly description = this.tenantForm.controls.description;
  readonly approach = this.tenantForm.controls.approach;
  readonly locations = this.tenantForm.controls.locations;

  readonly is_multinational = this.tenantForm.controls.is_multinational;
  readonly have_carnets = this.tenantForm.controls.have_carnets;

  readonly dni = this.representativeForm.controls.dni;
  readonly first_name = this.representativeForm.controls.first_name;
  readonly second_name = this.representativeForm.controls.second_name;
  readonly first_surname = this.representativeForm.controls.first_surname;
  readonly second_surname = this.representativeForm.controls.second_surname;
  readonly birth_date = this.representativeForm.controls.birth_date;
  readonly gender = this.representativeForm.controls.gender;
  readonly representativeEmail = this.representativeForm.controls.email;
  readonly rep_phone_code = this.representativeForm.controls.rep_phone_code;
  readonly rep_phone = this.representativeForm.controls.rep_phone;
  readonly country = this.representativeForm.controls.country;
  readonly department = this.representativeForm.controls.department;
  readonly profession = this.representativeForm.controls.profession;
  readonly address = this.representativeForm.controls.address;
  readonly carnet = this.representativeForm.controls.carnet;

  nextStep(): void {
    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      return;
    }

    this.currentStep.set(2);
  }

  previousStep(): void {
    this.currentStep.set(1);
  }

  signup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      console.log('invalid form');
      return;
    }

    const {
      tenant: {
        tenant_phone_code,
        tenant_phone,
        approach,
        cel_phone_code,
        cel_phone,
        tenant_alternative_email,
        confirm_email,
        ...tenant
      },
      representative: {
        second_name,
        second_surname,
        address,
        rep_phone_code,
        rep_phone,
        ...representative
      },
    } = this.signupForm.getRawValue();

    const fullTenantPhone = buildPhoneNumber(tenant_phone_code, tenant_phone);

    if (!fullTenantPhone) {
      this.tenant_phone.setErrors({ invalidPhone: true });
      this.tenant_phone.markAsTouched();
      return;
    }

    const fullCelPhone = buildPhoneNumber(cel_phone_code, cel_phone);

    if (cel_phone || cel_phone_code) {
      if (!fullCelPhone) {
        this.cel_phone.setErrors({ invalidPhone: true });
        this.cel_phone.markAsTouched();
        return;
      }
    }

    const fullRepPhone = buildPhoneNumber(rep_phone_code, rep_phone);

    if (!fullRepPhone) {
      this.rep_phone.setErrors({ invalidPhone: true });
      this.rep_phone.markAsTouched();
      return;
    }

    this.loading.set(true);

    const data = {
      ...tenant,
      phone: fullTenantPhone,
      is_isolate: 'NO' as 'NO' | 'INSTANCE',
      approach: toArray(approach),

      ...(fullCelPhone && {
        cel_phone: fullCelPhone,
      }),

      ...(tenant_alternative_email.trim() && {
        tenant_alternative_email,
      }),

      representative: {
        ...representative,
        phone: fullRepPhone,
        gender: representative.gender as Gender,
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
              'La cuenta fue creada correctamente. Utilizá la contraseña que enviamos a tu correo.',
            sticky: true,
          });

          this.router.navigate(['/empresa'], {
            state: {
              toast: {
                severity: 'success',
                summary: 'Cuenta creada',
                detail:
                  'La cuenta fue creada correctamente. Utilizá la contraseña que enviamos a tu correo.',
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
}
