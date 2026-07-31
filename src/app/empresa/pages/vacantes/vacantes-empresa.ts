import { Component, computed, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { VerDetalleVacanteDialog } from './components/ver-detalle-vacante-dialog/ver-detalle-vacante-dialog';
import { EditarVacanteDialog } from './components/editar-vacante-dialog/editar-vacante-dialog';
import { CrearVacanteDialog } from './components/crear-vacante-dialog/crear-vacante-dialog';

@Component({
  selector: 'app-vacantes-empresa',
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    MessageModule,
    TextareaModule,
    SelectModule,
    TableModule,
    PaginatorModule,
    VerDetalleVacanteDialog,
    EditarVacanteDialog,
    CrearVacanteDialog,
  ],
  templateUrl: './vacantes-empresa.html',
  styleUrl: './vacantes-empresa.scss',
})
export class VacantesEmpresa {
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  loading = signal(false);
  candidatos = signal([
    {
      id: 1,
      name: 'Ana Martínez',
      subtext: 'BI Analyst · 89 match',
      status: 'PO',
      badge: {
        text: 'Salario compatible',
        color: 'green',
      },
    },
    {
      id: 2,
      name: 'Carlos Mejía',
      subtext: 'QA Automation · 84 match',
      status: 'PO',
      badge: {
        text: 'Remoto',
        color: 'blue',
      },
    },
    {
      id: 3,
      name: 'María López',
      subtext: 'Automation Specialist · historial solicitado',
      status: 'PS',
      badge: {
        text: 'Pendiente acceso',
        color: 'accent',
      },
    },
    {
      id: 4,
      name: 'Daniela Pérez',
      subtext: 'People Ops · 82 match',
      status: 'PS',
      badge: {
        text: 'Apta',
        color: 'green',
      },
    },
    {
      id: 5,
      name: 'José Rivera',
      subtext: 'Dev Full Stack · entrevista 2:30pm',
      status: 'EN',
      badge: {
        text: 'Programada',
        color: 'blue',
      },
    },
    {
      id: 6,
      name: 'Andrea Castillo',
      subtext: 'Data Engineer · prueba técnica',
      status: 'EV',
      badge: {
        text: '87%',
        color: 'green',
      },
    },
    {
      id: 7,
      name: 'Roberto Núñez',
      subtext: 'Growth Analyst · oferta enviada',
      status: 'O',
      badge: {
        text: 'Negociando',
        color: 'accent',
      },
    },
  ]);

  areaOptions = [{ label: 'Operaciones', value: 'OPE' }];
  modalidadOptions = [{ label: 'Híbrido', value: 'HIB' }];

  // ESTADOS INICIALES Y VALIDACIONES DE FORMULARIO
  readonly formRequerimiento = this.fb.nonNullable.group({
    puesto: ['', Validators.required],
    area: ['OPE', Validators.required],
    modalidad: ['HIB', Validators.required],
    rango_salarial: ['', Validators.required],
    requisitos_clave: ['', Validators.required],
  });

  readonly puesto = this.formRequerimiento.controls.puesto;
  readonly area = this.formRequerimiento.controls.area;
  readonly modalidad = this.formRequerimiento.controls.modalidad;
  readonly rango_salarial = this.formRequerimiento.controls.rango_salarial;
  readonly requisitos_clave = this.formRequerimiento.controls.requisitos_clave;

  listadoEjecutivo = signal([
    {
      id: 1,
      nombre: 'AI Automation Specialist',
      subtext: 'Híbrido · salario visible',
      area: 'Operaciones',
      numeroCandidatos: '48',
      etapa: 'Preselección',
      dueno: 'María José',
      estado: {
        text: 'Activa',
        color: 'green',
      },
    },
    {
      id: 2,
      nombre: 'Business Intelligence Lead',
      subtext: 'Remoto regional',
      area: 'Data',
      numeroCandidatos: '33',
      etapa: 'Entrevista',
      dueno: 'Oned Gómez',
      estado: {
        text: 'Prioritaria',
        color: 'accent',
      },
    },
    {
      id: 3,
      nombre: 'Payroll Analyst',
      subtext: 'Presencial · SS',
      area: 'Finanzas',
      numeroCandidatos: '21',
      etapa: 'Evaluación',
      dueno: 'Marycarmen',
      estado: {
        text: 'Interna',
        color: 'blue',
      },
    },
  ]);

  save() {}
  loadCV() {}

  first: number = 0;
  rows: number = 10;
  onPageChange(event: any) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
