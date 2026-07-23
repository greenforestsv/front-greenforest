import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-candidatos',
  imports: [ButtonModule, TableModule, AvatarModule],
  templateUrl: './candidatos.html',
  styleUrl: './candidatos.scss',
})
export class Candidatos {
  private messageService = inject(MessageService);

  /* FORM BUILDER */
  private fb = inject(FormBuilder);

  loading = signal(false);
  candidatos = signal([
    {
      id: 1,
      name: 'Ana Martínez',
      estado: {
        text: 'Green score 92',
        color: 'green',
      },
      subtext: 'BI Analyst · SQL · Power BI · Automatización',
      skills: ['SQL', 'Dashboards', 'Excel avanzado'],
      action: {
        text: 'Solicitar historial',
        severity: 'primary' as ButtonSeverity,
      },
    },
    {
      id: 2,
      name: 'Carlos Mejía',
      estado: {
        text: 'Acceso pendiente',
        color: 'accent',
      },
      subtext: 'QA Automation · Katalon · Selenium · APIs',
      skills: ['QA', 'Postman', 'Jira'],
      action: {
        text: 'Enviar recordatorio',
        severity: 'secondary' as ButtonSeverity,
      },
    },
    {
      id: 3,
      name: 'María López',
      estado: {
        text: 'Historial parcial',
        color: 'blue',
      },
      subtext: 'People Ops · nómina · reclutamiento · cultura',
      skills: ['Planilla', 'RRHH', 'ATS'],
      action: {
        text: 'Agendar entrevista',
        severity: 'primary' as ButtonSeverity,
      },
    },
  ]);

  tablaComprarativa = signal([
    {
      id: 1,
      nombre: 'Ana Martínez',
      subtext: 'San Salvador · Híbrido',
      puestoSugerido: 'BI Lead',
      match: '92',
      historial: {
        text: 'Autorizado',
        color: 'green',
      },
      evaluacion: '91',
      accion: 'Ver perfil',
    },
    {
      id: 2,
      nombre: 'José Rivera',
      subtext: 'Santa Tecla · Remoto',
      puestoSugerido: 'Full Stack',
      match: '86',
      historial: {
        text: 'Pendiente',
        color: 'accent',
      },
      evaluacion: '84',
      accion: 'Solicitar',
    },
    {
      id: 3,
      nombre: 'María López',
      subtext: 'Antihuo Cuscatlán',
      puestoSugerido: 'Automation',
      match: '89',
      historial: {
        text: 'Parcial',
        color: 'blue',
      },
      evaluacion: '88',
      accion: 'Shortlist',
    },
  ]);

  save() {}
}
