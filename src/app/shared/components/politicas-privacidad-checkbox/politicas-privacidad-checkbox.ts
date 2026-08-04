import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-politicas-privacidad-checkbox',
  imports: [ReactiveFormsModule, CheckboxModule, MessageModule],
  templateUrl: './politicas-privacidad-checkbox.html',
})
export class PoliticasPrivacidadCheckbox {
  control = input.required<FormControl<boolean>>();
}
