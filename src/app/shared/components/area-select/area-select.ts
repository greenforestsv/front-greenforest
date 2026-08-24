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
      id: 1,
      description: 'Gerencia',
    },
    {
      id: 2,
      description: 'Dirección General',
    },
  ];

  control = input.required<FormControl<number>>();
}
