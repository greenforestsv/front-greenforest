import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { AuthTenantService } from '../../services/auth.tenant.service';
import { emailMatchValidator } from '../../../shared/validators/form.validators';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { finalize } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { Gender } from '../../../shared/pipes/gender.pipe';
import { toArray } from '../../../shared/utils/string.utils';
import { CountriesSelect } from '../../../shared/components/countries-select/countries-select';
import { StatesSelect } from '../../../shared/components/states-select/states-select';
import { CountriesMultiselect } from '../../../shared/components/countries-multiselect/countries-multiselect';
import { PhoneCodeSelect } from '../../../shared/components/phone-code-select/phone-code-select';
import { buildPhoneNumber } from '../../../shared/utils/phone.utils';

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
    CountriesSelect,
    StatesSelect,
    CountriesMultiselect,
    PhoneCodeSelect,
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

  is_isolate_options = [
    { label: 'No', value: 'NO' },
    { label: 'Instancia', value: 'INSTANCE' },
  ];
  genderOptions = [
    { label: 'Mujer', value: 'F' },
    { label: 'Hombre', value: 'M' },
    { label: 'Otro', value: 'U' },
  ];

  // VALIDACIONES Y ESTADOS INICIALES
  readonly signupForm = this.fb.nonNullable.group(
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
    },
    {
      validators: emailMatchValidator,
    },
  );

  // PROPIEDADES
  readonly name = this.signupForm.controls.name;
  readonly email = this.signupForm.controls.email;
  readonly confirm_email = this.signupForm.controls.confirm_email;
  readonly tenant_alternative_email = this.signupForm.controls.tenant_alternative_email;

  readonly tenant_phone_code = this.signupForm.controls.tenant_phone_code;
  readonly tenant_phone = this.signupForm.controls.tenant_phone;
  readonly cel_phone_code = this.signupForm.controls.cel_phone_code;
  readonly cel_phone = this.signupForm.controls.cel_phone;

  readonly description = this.signupForm.controls.description;
  readonly approach = this.signupForm.controls.approach;
  readonly locations = this.signupForm.controls.locations;

  readonly is_multinational = this.signupForm.controls.is_multinational;
  readonly have_carnets = this.signupForm.controls.have_carnets;

  readonly representative = this.signupForm.controls.representative;

  readonly dni = this.representative.controls.dni;
  readonly first_name = this.representative.controls.first_name;
  readonly second_name = this.representative.controls.second_name;
  readonly first_surname = this.representative.controls.first_surname;
  readonly second_surname = this.representative.controls.second_surname;
  readonly birth_date = this.representative.controls.birth_date;
  readonly gender = this.representative.controls.gender;
  readonly representativeEmail = this.representative.controls.email;
  readonly rep_phone_code = this.representative.controls.rep_phone_code;
  readonly rep_phone = this.representative.controls.rep_phone;
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

    const {
      tenant_phone_code,
      tenant_phone,
      approach,
      cel_phone_code,
      cel_phone,
      tenant_alternative_email,
      confirm_email,
      representative: {
        second_name,
        second_surname,
        address,
        rep_phone_code,
        rep_phone,
        ...representative
      },
      ...company
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
      ...company,
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
