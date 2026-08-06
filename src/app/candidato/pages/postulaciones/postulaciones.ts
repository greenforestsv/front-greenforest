import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PostulacionesService } from '../../../core/services/postulaciones.service';
import { Postulacion } from '../../../core/interfaces/postulacion.interface';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-postulaciones',
  imports: [TranslatePipe, SkeletonModule, EmptyState],
  templateUrl: './postulaciones.html',
  styleUrl: './postulaciones.scss',
})
export class Postulaciones {
  items = Array.from({ length: 4 });

  /* Injección de servicio */
  messageService = inject(MessageService);
  private postulacionesService = inject(PostulacionesService);

  /* Estados iniciales */
  postulaciones = signal<Postulacion[]>([]);
  loading = signal(true);

  statuses: { key: Postulacion['status']; title: string }[] = [
    { key: 'A', title: 'postulaciones.aplicado' },
    { key: 'P', title: 'postulaciones.preseleccion' },
    { key: 'E', title: 'postulaciones.entrevista' },
    { key: 'O', title: 'postulaciones.oferta' },
  ];

  getByStatus(status: Postulacion['status']) {
    return this.postulaciones().filter((p) => p.status === status);
  }

  /* Constructor donde obtenemos la data */
  constructor() {
    this.postulacionesService
      .getPostulaciones()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (postulaciones) => {
          console.log(postulaciones);
          const estados: Postulacion['status'][] = ['A', 'P', 'E', 'O'];

          this.postulaciones.set(
            postulaciones.map((p, index) => ({
              ...p,
              status: estados[index % estados.length],
            })),
          );
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

  /* Contadores */
  countStatus(status: string) {
    return computed(() => this.postulaciones().filter((p) => p.status === status));
  }

  aplicados = this.countStatus('A');
  preseleccion = this.countStatus('P');
  entrevista = this.countStatus('E');
  oferta = this.countStatus('O');
}
