import { Component, computed, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { AvatarModule } from 'primeng/avatar';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-ver-detalle-vacante-dialog',
  templateUrl: './ver-detalle-vacante-dialog.html',
  styleUrl: '../../vacantes-empresa.scss',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    TranslatePipe,
    MessageModule,
    TableModule,
    TabsModule,
    AvatarModule,
    PaginatorModule,
  ],
})
export class VerDetalleVacanteDialog {
  /* INJECCIÓN DE SERVICIOS */
  private translate = inject(TranslateService);
  //aspirantesService = inject(AspirantesService);
  private messageService = inject(MessageService);

  //ESTADOS INICIALS
  visible = signal(false);
  loading = signal(false);
  error = signal<string | null>('Internal server error');

  closeDialog() {
    this.visible.set(false);
  }

  postuladosPipeline = signal([
    {
      id: 1,
      name: 'Ana Martínez',
      subtext: ' 89 match',
      status: 'PO',
      badge: {
        text: 'Salario compatible',
        color: 'green',
      },
    },
    {
      id: 2,
      name: 'Carlos Mejía',
      subtext: '84 match',
      status: 'PO',
      badge: {
        text: 'Remoto',
        color: 'blue',
      },
    },
    {
      id: 3,
      name: 'María López',
      subtext: 'Historial solicitado',
      status: 'PS',
      badge: {
        text: 'Pendiente acceso',
        color: 'accent',
      },
    },
    {
      id: 4,
      name: 'Daniela Pérez',
      subtext: '82 match',
      status: 'PS',
      badge: {
        text: 'Apta',
        color: 'green',
      },
    },
    {
      id: 5,
      name: 'José Rivera',
      subtext: 'Entrevista 2:30pm',
      status: 'EN',
      badge: {
        text: 'Programada',
        color: 'blue',
      },
    },
    {
      id: 6,
      name: 'Andrea Castillo',
      subtext: 'Prueba técnica',
      status: 'EV',
      badge: {
        text: '87%',
        color: 'green',
      },
    },
    {
      id: 7,
      name: 'Roberto Núñez',
      subtext: 'Oferta enviada',
      status: 'O',
      badge: {
        text: 'Negociando',
        color: 'accent',
      },
    },
  ]);

  readonly pipelineColumns = [
    { title: 'Postulados', status: 'PO' },
    { title: 'Preselección', status: 'PS' },
    { title: 'Entrevista', status: 'EN' },
    { title: 'Evaluación', status: 'EV' },
    { title: 'Oferta', status: 'O' },
  ];

  readonly pipeline = computed(() => {
    const candidatos = this.postuladosPipeline();

    return this.pipelineColumns.map((column) => ({
      ...column,
      candidates: candidatos.filter((c) => c.status === column.status),
    }));
  });

  detalleVacante = signal([
    {
      id: 1,
      nombre: 'AI Automation Specialist',
      modalidad: 'Híbrido',
      salario: 'Visible',
      area: 'Operaciones',
      numeroCandidatos: '48',
      dueno: 'María José',
      estado: {
        text: 'Activa',
        color: 'green',
      },
    },
  ]);

  noPostulados = signal([
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
      subtext: 'Antiguo Cuscatlán',
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

  first: number = 0;
  rows: number = 10;
  onPageChange(event: any) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
