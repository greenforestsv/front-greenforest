import { Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { EmpresasService } from '../../../../core/services/empresas.service';
import { MessageService } from 'primeng/api';
import { PerfilEmpresaDto } from '../../../../core/interfaces/empresa.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { EmpresaProfile } from '../../../../shared/components/empresa-profile/empresa-profile';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empresa-detalle',
  imports: [SkeletonModule, EmpresaProfile],
  templateUrl: './empresa-detalle.html',
  styleUrl: './empresa-detalle.scss',
})
export class EmpresaDetalle {
  private route = inject(ActivatedRoute);

  id = signal<string | null>(null);
  perfil = signal<PerfilEmpresaDto | null>(null);
  loading = signal(true);

  private empresasService = inject(EmpresasService);
  private messageService = inject(MessageService);

  constructor() {
    this.id.set(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load() {
    const id = this.id();

    if (!id) {
      return;
    }

    this.loading.set(true);

    this.empresasService
      .getDetalleEmpresa(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.perfil.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de empresa',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
