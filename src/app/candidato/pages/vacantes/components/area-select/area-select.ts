import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-area-select',
  imports: [SelectModule, ReactiveFormsModule, MessageModule],
  templateUrl: './area-select.html',
})
export class AreaSelect {
  areas = [
    {
      value: 1,
      label: 'Gerencia',
    },
    {
      value: 2,
      label: 'Dirección General',
    },
  ];

  control = input.required<FormControl<string | null>>();
}
