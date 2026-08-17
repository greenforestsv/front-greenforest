import { Component, inject, signal } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PostulacionesService } from '../../../core/services/postulaciones.service';
import { GetPostulacionCandidatoDto } from '../../../core/interfaces/postulacion.interface';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { PROCESSES } from '../../../core/constants/processes.constants';

@Component({
  selector: 'app-postulaciones',
  imports: [SkeletonModule, EmptyState],
  templateUrl: './postulaciones.html',
  styleUrl: './postulaciones.scss',
})
export class Postulaciones {
  items = Array.from({ length: 4 });

  /* Injección de servicio */
  messageService = inject(MessageService);
  private postulacionesService = inject(PostulacionesService);

  /* Estados iniciales */
  postulaciones = signal<GetPostulacionCandidatoDto[]>([]);
  loading = signal(true);

  processes = PROCESSES;

  getByProcess(processName: string) {
    return this.postulaciones().filter((postulacion) => postulacion.process === processName);
  }

  constructor() {
    this.postulacionesService
      .getPostulacionesCandidato()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (postulaciones) => {
          console.log(postulaciones);
          this.postulaciones.set(postulaciones);
        },
        error: (err: { error: { message: any } }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener postulaciones',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
