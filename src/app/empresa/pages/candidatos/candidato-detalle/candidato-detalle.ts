import { Component, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AspirantesService } from '../../../../core/services/aspirantes.service';
import { PublicAspirant } from '../../../../core/interfaces/aspirant.interfaces';
import { ActivatedRoute } from '@angular/router';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-candidato-detalle',
  imports: [EmptyState],
  templateUrl: './candidato-detalle.html',
  styleUrl: './candidato-detalle.scss',
})
export class CandidatoDetalle {
  private route = inject(ActivatedRoute);
  private aspirantesService = inject(AspirantesService);
  private messageService = inject(MessageService);

  id = signal<string | null>(null);
  candidato = signal<PublicAspirant | null>(null);
  loading = signal(false);

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

    this.aspirantesService
      .getPublicAspirant(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.candidato.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de candidato',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
