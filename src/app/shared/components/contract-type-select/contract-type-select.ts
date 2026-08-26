import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-contract-type-select',
  imports: [SelectModule, ReactiveFormsModule, MessageModule],
  templateUrl: './contract-type-select.html',
})
export class ContractTypeSelect {
  contractTypeOptions = [
    { label: 'Idefinido', value: 1 },
    { label: 'Temporal', value: 2 },
  ];

  useLabelAsValue = input<boolean>(false);
  control = input.required<FormControl<string | number | null>>();
}
