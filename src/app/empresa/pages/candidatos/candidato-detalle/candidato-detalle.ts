import { Component, inject, input, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AspirantesService } from '../../../../candidato/services/aspirantes.service';
import { PublicAspirant } from '../../../../candidato/interfaces/aspirant.interfaces';

@Component({
  selector: 'app-candidato-detalle',
  imports: [],
  templateUrl: './candidato-detalle.html',
  styleUrl: './candidato-detalle.scss',
})
export class CandidatoDetalle {
  id = input.required<string>();

  candidato = signal<PublicAspirant | null>(null);
  loading = signal(true);

  private aspirantesService = inject(AspirantesService);
  private messageService = inject(MessageService);

  constructor() {
    this.load(this.id());
  }

  load(id: string) {
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
