import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { DatePicker } from 'primeng/datepicker';
import { PhoneCodeSelect } from '../../../../../shared/components/phone-code-select/phone-code-select';
import { CountriesSelect } from '../../../../../shared/components/countries-select/countries-select';
import { AreaSelect } from '../../../../../shared/components/area-select/area-select';
import { GenderSelect } from '../../../../../shared/components/gender-select/gender-select';

@Component({
  selector: 'app-representative-form',
  imports: [
    MessageModule,
    DatePicker,
    PhoneCodeSelect,
    CountriesSelect,
    AreaSelect,
    GenderSelect,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './representative-form.html',
})
export class RepresentativeForm {
  form = input.required<FormGroup>();
  haveCarnets = input.required<FormControl<boolean>>();

  get first_name() {
    return this.form().get('first_name')!;
  }
  get second_name() {
    return this.form().get('second_name')!;
  }
  get first_surname() {
    return this.form().get('first_surname')!;
  }
  get second_surname() {
    return this.form().get('second_surname')!;
  }
  get dni() {
    return this.form().get('dni')!;
  }
  get birth_date() {
    return this.form().get('birth_date')!;
  }
  get address() {
    return this.form().get('address')!;
  }
  get gender(): FormControl<string> {
    return this.form().controls['gender'] as FormControl<string>;
  }
  get email() {
    return this.form().get('email')!;
  }
  get rep_phone_code(): FormControl<string> {
    return this.form().controls['rep_phone_code'] as FormControl<string>;
  }
  get rep_phone() {
    return this.form().get('rep_phone')!;
  }
  get country(): FormControl<string> {
    return this.form().controls['country'] as FormControl<string>;
  }
  get department(): FormControl<number> {
    return this.form().controls['department'] as FormControl<number>;
  }
  get profession() {
    return this.form().get('profession')!;
  }
  get carnet() {
    return this.form().get('carnet')!;
  }
}
