import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EditarPerfilDialog } from './editar-perfil-dialog/editar-perfil-dialog';
import { AvatarModule } from 'primeng/avatar';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmpresasService } from '../../../core/services/empresas.service';
import { TenantResponseDto } from '../../../core/interfaces/empresa.interface';
import { finalize } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-perfil-empresa',
  imports: [ButtonModule, EditarPerfilDialog, AvatarModule, SkeletonModule],
  templateUrl: './perfil-empresa.html',
  styleUrl: './perfil-empresa.scss',
})
export class PerfilEmpresa {
  /* INJECCIÓN DE SERVICIOS */
  empresasService = inject(EmpresasService);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);

  /* ESTADOS SIGNAL */
  perfil = signal<TenantResponseDto | null>(null);
  profilePercentage = signal(86);
  loading = signal(false);

  constructor() {
    this.loading.set(true);
    /* OBTENCIÓN DE DATOS */
    this.empresasService
      .getEmpresaMe()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.perfil.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de perfil',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }

  /*   reputacion = signal([
    {
      id: 1,
      name: 'NovaTech',
      industry: 'Tecnología',
      country: 'El Salvador',
      ascensos_internos: 76,
      rotacion: 82,
      beneficios_reales: 74,
      reputacion_alta: true,
      solicito_acceso: true,
      vacantes: 0,
    },
    {
      id: 2,
      name: 'AgroPlus',
      industry: 'Agricultura',
      country: 'Guatemala',
      ascensos_internos: 63,
      rotacion: 71,
      beneficios_reales: 68,
      reputacion_alta: true,
      solicito_acceso: false,
      vacantes: 2,
    },
    {
      id: 3,
      name: 'FinCore',
      industry: 'Finanzas',
      country: 'Costa Rica',
      ascensos_internos: 84,
      rotacion: 65,
      beneficios_reales: 81,
      reputacion_alta: true,
      solicito_acceso: true,
      vacantes: 1,
    },
  ]); */
}
