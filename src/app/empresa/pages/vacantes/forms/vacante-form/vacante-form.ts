import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ProcesosPostulacionMultiSelect } from '../../../../../shared/components/procesos-postulacion-multiselect/procesos-postulacion-multiselect';

@Component({
  selector: 'app-vacante-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    MessageModule,
    DatePickerModule,
    InputNumberModule,
    SelectModule,
    CheckboxModule,
    ProcesosPostulacionMultiSelect,
  ],
  templateUrl: './vacante-form.html',
})
export class VacanteForm {
  form = input.required<FormGroup>();

  // Controles del formulario
  get title() {
    return this.form().controls['title'];
  }

  get description() {
    return this.form().controls['description'];
  }

  get ends_on() {
    return this.form().controls['ends_on'];
  }

  get min_salary() {
    return this.form().controls['min_salary'];
  }

  get max_salary() {
    return this.form().controls['max_salary'];
  }

  get workday_type() {
    return this.form().controls['workday_type'];
  }

  get workday() {
    return this.form().controls['workday'];
  }

  get availability() {
    return this.form().controls['availability'];
  }

  get contract_type() {
    return this.form().controls['contract_type'];
  }

  get department() {
    return this.form().controls['department'];
  }

  get format() {
    return this.form().controls['format'];
  }

  get payment_form() {
    return this.form().controls['payment_form'];
  }

  get number_of_vacancies() {
    return this.form().controls['number_of_vacancies'];
  }

  get vehicle() {
    return this.form().controls['vehicle'];
  }

  get level_experience() {
    return this.form().controls['level_experience'];
  }

  get skills() {
    return this.form().controls['skills'];
  }

  get tools() {
    return this.form().controls['tools'];
  }

  get requirements() {
    return this.form().controls['requirements'];
  }

  get processes(): FormControl<number[]> {
    return this.form().get('processes') as FormControl<number[]>;
  }

  contractTypeOptions = [
    { label: 'Indefinido', value: 1 },
    { label: 'Temporal', value: 2 },
    { label: 'Por proyecto', value: 3 },
    { label: 'Servicios profesionales', value: 4 },
    { label: 'Práctica profesional', value: 5 },
  ];

  departmentOptions = [
    { label: 'Tecnología', value: 1 },
    { label: 'Recursos Humanos', value: 2 },
    { label: 'Marketing', value: 3 },
    { label: 'Ventas', value: 4 },
    { label: 'Finanzas', value: 5 },
    { label: 'Operaciones', value: 6 },
    { label: 'Administración', value: 7 },
    { label: 'Atención al Cliente', value: 8 },
  ];

  formatOptions = [
    { label: 'Presencial', value: 1 },
    { label: 'Híbrido', value: 2 },
    { label: 'Remoto', value: 3 },
  ];
}
