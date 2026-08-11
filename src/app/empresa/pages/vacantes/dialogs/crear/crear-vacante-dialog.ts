import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { VacantesService } from '../../../../../core/services/vacantes.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { CreateVacanteDto } from '../../../../../core/interfaces/vacantes.interfaces';
import { toArray } from '../../../../../shared/utils/string.utils';
import { ProcesosPostulacionMultiSelect } from '../../../../../shared/components/procesos-postulacion-multiselect/procesos-postulacion-multiselect';

@Component({
  selector: 'app-crear-vacante-dialog',
  templateUrl: './crear-vacante-dialog.html',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    MessageModule,
    DatePickerModule,
    TextareaModule,
    InputNumberModule,
    SelectModule,
    CheckboxModule,
    ProcesosPostulacionMultiSelect,
  ],
})
export class CrearVacanteDialog {
  /* INJECCIÓN DE SERVICIOS */
  private translate = inject(TranslateService);
  vacantesService = inject(VacantesService);
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  //ESTADOS INICIALS
  visible = signal(false);
  loading = signal(false);

  //SELECT OPTIONS
  // TIPO DE CONTRATO
  contractTypeOptions = [
    { label: 'Indefinido', value: 1 },
    { label: 'Temporal', value: 2 },
    { label: 'Por proyecto', value: 3 },
    { label: 'Servicios profesionales', value: 4 },
    { label: 'Práctica profesional', value: 5 },
  ];

  // DEPARTAMENTO
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

  // MODALIDAD
  formatOptions = [
    { label: 'Presencial', value: 1 },
    { label: 'Híbrido', value: 2 },
    { label: 'Remoto', value: 3 },
  ];

  // ESTADOS INICIALES Y VALIDACIONES
  readonly vacanteForm = this.fb.nonNullable.group({
    title: ['', Validators.required],

    ends_on: [new Date()],

    min_salary: [0, [Validators.required, Validators.min(1)]],
    max_salary: [0, [Validators.required, Validators.min(1)]],

    workday: ['', Validators.required],
    workday_type: ['', Validators.required],

    availability: ['', Validators.required],

    description: ['', Validators.required],

    skills: ['', Validators.required],
    tools: ['', Validators.required],
    requirements: ['', Validators.required],
    processes: this.fb.nonNullable.control<number[]>([], Validators.required),

    payment_form: ['', Validators.required],

    contract_type: [0, [Validators.required, Validators.min(1)]],
    department: [0, [Validators.required, Validators.min(1)]],
    format: [0, [Validators.required, Validators.min(1)]],

    number_of_vacancies: [1],

    vehicle: [false],

    level_experience: [''],
  });

  readonly title = this.vacanteForm.controls.title;
  readonly description = this.vacanteForm.controls.description;
  readonly ends_on = this.vacanteForm.controls.ends_on;

  readonly min_salary = this.vacanteForm.controls.min_salary;
  readonly max_salary = this.vacanteForm.controls.max_salary;

  readonly workday_type = this.vacanteForm.controls.workday_type;
  readonly workday = this.vacanteForm.controls.workday;

  readonly availability = this.vacanteForm.controls.availability;

  readonly contract_type = this.vacanteForm.controls.contract_type;
  readonly department = this.vacanteForm.controls.department;
  readonly format = this.vacanteForm.controls.format;

  readonly payment_form = this.vacanteForm.controls.payment_form;

  readonly number_of_vacancies = this.vacanteForm.controls.number_of_vacancies;

  readonly vehicle = this.vacanteForm.controls.vehicle;

  readonly level_experience = this.vacanteForm.controls.level_experience;

  readonly skills = this.vacanteForm.controls.skills;
  readonly tools = this.vacanteForm.controls.tools;
  readonly requirements = this.vacanteForm.controls.requirements;
  readonly processes = this.vacanteForm.controls.processes;

  closeDialog() {
    this.resetForm();
    this.visible.set(false);
  }

  resetForm() {
    this.vacanteForm.reset({
      title: '',
      description: '',

      ends_on: new Date(),

      min_salary: 1,
      max_salary: 1,

      workday_type: '',
      workday: '',

      availability: '',

      contract_type: 1,
      department: 1,
      format: 1,

      payment_form: '',

      number_of_vacancies: 1,

      vehicle: false,

      level_experience: '',

      skills: '',
      tools: '',
      requirements: '',
      processes: [],
    });

    this.vacanteForm.markAsPristine();
    this.vacanteForm.markAsUntouched();
  }

  /* GUARDAR */
  save() {
    if (this.vacanteForm.invalid) {
      this.vacanteForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const vacante = this.vacanteForm.getRawValue();

    const nuevaVacante: CreateVacanteDto = {
      ...vacante,
      workday: toArray(vacante.workday),
      skills: toArray(vacante.skills),
      tools: toArray(vacante.tools),
      requirements: toArray(vacante.requirements),
      processes: vacante.processes,
      ends_on: dayjs(vacante.ends_on).toISOString(),
    };

    console.log(nuevaVacante);
    this.vacantesService
      .createJob(nuevaVacante)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Vacante creada',
            detail: 'La vacante fue creada correctamente',
            life: 5000,
          });

          this.closeDialog();
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al crear vacante',
            detail: err.error?.message ?? this.translate.instant('common.error_inesperado'),
            life: 5000,
          });
        },
      });
  }
}
