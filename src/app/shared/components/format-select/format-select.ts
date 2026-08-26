import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-format-select',
  imports: [SelectModule, ReactiveFormsModule, MessageModule],
  templateUrl: './format-select.html',
})
export class FormatSelect {
  formatOptions = [
    { label: 'Presencial', value: 1 },
    { label: 'Remoto', value: 2 },
    { label: 'Híbrido', value: 3 },
  ];

  useLabelAsValue = input<boolean>(false);
  control = input.required<FormControl<string | number | null>>();
}
