import { Component, inject, signal } from '@angular/core';
import { PrivateAspirant } from '../../interfaces/aspirant.interfaces';
import { AspirantesService } from '../../services/aspirantes.service';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-perfil-candidato',
  imports: [AvatarModule],
  templateUrl: './perfil-candidato.html',
  styleUrl: './perfil-candidato.scss',
})
export class PerfilCandidato {
  /* INJECCIÓN DE SERVICIOS */
  aspirantsService = inject(AspirantesService);
  messageService = inject(MessageService);

  /* ESTADOS SIGNAL */
  aspirante = signal<PrivateAspirant | null>(null);
  loading = signal(false);

  constructor() {
    /* OBTENCIÓN DE DATOS */
    this.aspirantsService.getAspirantMe().subscribe({
      next: (aspirant: PrivateAspirant) => {
        this.aspirante.set(aspirant);
      },
      error: (err: { error: { message: any }; status: number }) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al obtener datos de candidato',
          detail: err.error?.message ?? 'Ocurrió un error inesperado',
          life: 5000,
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
