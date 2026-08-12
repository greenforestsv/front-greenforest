import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmpresasService } from '../../../core/services/empresas.service';
import { PerfilEmpresaDto } from '../../../core/interfaces/empresa.interface';
import { finalize } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { EmpresaProfile } from '../../../shared/components/empresa-profile/empresa-profile';

@Component({
  selector: 'app-perfil-empresa',
  imports: [ButtonModule, SkeletonModule, FormsModule, EmpresaProfile],
  templateUrl: './perfil-empresa.html',
  styleUrl: './perfil-empresa.scss',
})
export class PerfilEmpresa {
  empresasService = inject(EmpresasService);
  messageService = inject(MessageService);

  perfil = signal<PerfilEmpresaDto | null>(null);
  loading = signal(false);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.empresasService
      .getEmpresaMe()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.perfil.set(data);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de perfil',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
