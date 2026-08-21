import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { PhoneCodeSelect } from '../../../../../shared/components/phone-code-select/phone-code-select';
import { CountriesSelect } from '../../../../../shared/components/countries-select/countries-select';
import { StatesSelect } from '../../../../../shared/components/states-select/states-select';

@Component({
  selector: 'app-representative-form',
  imports: [
    MessageModule,
    DatePicker,
    Select,
    PhoneCodeSelect,
    CountriesSelect,
    StatesSelect,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './representative-form.html',
})
export class RepresentativeForm {
  form = input.required<FormGroup>();
  haveCarnets = input.required<FormControl<boolean>>();

  genderOptions = [
    { label: 'Mujer', value: 'F' },
    { label: 'Hombre', value: 'M' },
    { label: 'Otro', value: 'U' },
  ];

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
  get gender() {
    return this.form().get('gender')!;
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
