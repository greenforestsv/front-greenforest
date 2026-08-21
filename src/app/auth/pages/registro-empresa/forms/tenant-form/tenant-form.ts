import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PhoneCodeSelect } from '../../../../../shared/components/phone-code-select/phone-code-select';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { CountriesMultiselect } from '../../../../../shared/components/countries-multiselect/countries-multiselect';

@Component({
  selector: 'app-tenant-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    MessageModule,
    PhoneCodeSelect,
    TextareaModule,
    CheckboxModule,
    CountriesMultiselect,
  ],
  templateUrl: './tenant-form.html',
})
export class TenantForm {
  form = input.required<FormGroup>();
  isMultinational = input.required<FormControl<boolean>>();

  get name() {
    return this.form().get('name')!;
  }

  get email() {
    return this.form().get('email')!;
  }

  get confirm_email() {
    return this.form().get('confirm_email')!;
  }

  get tenant_alternative_email() {
    return this.form().get('tenant_alternative_email')!;
  }

  get tenant_phone_code(): FormControl<string> {
    return this.form().controls['tenant_phone_code'] as FormControl<string>;
  }

  get tenant_phone() {
    return this.form().get('tenant_phone')!;
  }

  get cel_phone_code(): FormControl<string> {
    return this.form().controls['cel_phone_code'] as FormControl<string>;
  }

  get cel_phone() {
    return this.form().get('cel_phone')!;
  }

  get description() {
    return this.form().get('description')!;
  }

  get approach() {
    return this.form().get('approach')!;
  }

  get locations(): FormControl<string[]> {
    return this.form().controls['locations'] as FormControl<string[]>;
  }

  get is_multinational() {
    return this.form().get('is_multinational')!;
  }

  get have_carnets() {
    return this.form().get('have_carnets')!;
  }
}
