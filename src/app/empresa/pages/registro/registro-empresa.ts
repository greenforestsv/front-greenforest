import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthTenantService } from '../../../auth/services/auth.tenant.service';
import { emailMatchValidator } from '../../../shared/validators/form.validators';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Gender } from '../../../shared/pipes/gender.pipe';
import { toArray } from '../../../shared/utils/string.utils';
import { buildPhoneNumber } from '../../../shared/utils/phone.utils';
import { TenantForm } from './forms/tenant-form/tenant-form';
import { RepresentativeForm } from './forms/representative-form/representative-form';
import { ProgressBarModule } from 'primeng/progressbar';

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
    ProgressBarModule,
  ],
  templateUrl: './registro-empresa.html',
  styleUrl: './registro-empresa.scss',
})
export class RegistroEmpresa {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authTenantService = inject(AuthTenantService);
  private router = inject(Router);

  // LOADING
  loading = signal(false);

  /* STEPS */
  currentStep = signal<1 | 2>(1);

  get stepValue(): number {
    return this.currentStep() === 1 ? 50 : 100;
  }
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
      carnet: [''],
    }),
  });

  // PROPIEDADES
  readonly tenantForm = this.signupForm.controls.tenant;
  readonly representativeForm = this.signupForm.controls.representative;

  readonly have_carnets = this.tenantForm.controls.have_carnets;
  readonly carnet = this.representativeForm.controls.carnet;

  readonly is_multinational = this.tenantForm.controls.is_multinational;
  readonly locations = this.tenantForm.controls.locations;

  constructor() {
    this.validarCarnets();
    this.validarUbicaciones();
  }

  private validarCarnets(): void {
    const actualizarValidacion = (haveCarnets: boolean) => {
      if (haveCarnets) {
        this.carnet.setValidators([Validators.required]);
      } else {
        this.carnet.clearValidators();
        this.carnet.setValue('');
      }

      this.carnet.updateValueAndValidity();
    };

    actualizarValidacion(this.have_carnets.value);

    this.have_carnets.valueChanges.subscribe(actualizarValidacion);
  }

  private validarUbicaciones(): void {
    this.is_multinational.valueChanges.subscribe((isMultinational) => {
      if (!isMultinational && this.locations.value.length > 1) {
        this.locations.setValue([this.locations.value[0]]);
      }
    });
  }

  signup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
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
      this.tenantForm.controls.tenant_phone.setErrors({
        invalidPhone: true,
      });
      this.tenantForm.controls.tenant_phone.markAsTouched();
      return;
    }

    const fullCelPhone = buildPhoneNumber(cel_phone_code, cel_phone);

    if (cel_phone || cel_phone_code) {
      if (!fullCelPhone) {
        this.tenantForm.controls.cel_phone.setErrors({
          invalidPhone: true,
        });

        this.tenantForm.controls.cel_phone.markAsTouched();
        this.tenantForm.controls.cel_phone_code.markAsTouched();

        return;
      }
    }

    const fullRepPhone = buildPhoneNumber(rep_phone_code, rep_phone);

    if (!fullRepPhone) {
      this.representativeForm.controls.rep_phone.setErrors({
        invalidPhone: true,
      });
      this.representativeForm.controls.rep_phone.markAsTouched();
      return;
    }

    this.loading.set(true);

    const data = {
      ...tenant,
      phone: fullTenantPhone,
      is_isolate: 'NO' as const,
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
