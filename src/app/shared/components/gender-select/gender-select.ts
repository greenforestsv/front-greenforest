import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-gender-select',
  imports: [SelectModule, ReactiveFormsModule, MessageModule],
  templateUrl: './gender-select.html',
})
export class GenderSelect {
  genderOptions = [
    { label: 'Mujer', value: 'F' },
    { label: 'Hombre', value: 'M' },
    { label: 'Otro', value: 'U' },
  ];

  control = input.required<FormControl<string>>();
}
