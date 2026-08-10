import { Component, inject, input, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { EmpresasService } from '../../../../core/services/empresas.service';
import { MessageService } from 'primeng/api';
import { TenantResponseDto } from '../../../../core/interfaces/empresa.interface';

@Component({
  selector: 'app-empresa-detalle',
  imports: [],
  templateUrl: './empresa-detalle.html',
  styleUrl: './empresa-detalle.scss',
})
export class EmpresaDetalle {
  id = input.required<string>();

  empresa = signal<TenantResponseDto | null>(null);
  loading = signal(true);

  private empresasService = inject(EmpresasService);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.load(this.id());
  }

  load(id: string) {
    this.loading.set(true);

    this.empresasService
      .getDetalleEmpresa(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.empresa.set(data);
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
