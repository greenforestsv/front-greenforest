import { Component, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { GetProcesoDto } from '../../../core/interfaces/vacantes.interfaces';
import { VacantesService } from '../../../core/services/vacantes.service';
import { ChipModule } from 'primeng/chip';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-procesos-postulacion-multiselect',
  imports: [ReactiveFormsModule, MultiSelectModule, ChipModule, MessageModule],
  templateUrl: './procesos-postulacion-multiselect.html',
})
export class ProcesosPostulacionMultiSelect {
  private vacantesService = inject(VacantesService);
  private messageService = inject(MessageService);

  control = input.required<FormControl<number[]>>();

  loading = signal(false);
  processes = signal<GetProcesoDto[]>([]);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);

    this.vacantesService
      .getActiveJobProcesses()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          console.log({ procesos: data });
          this.processes.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener lista de procesos de vacantes',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }

  removeItem(event: MouseEvent, id: number): void {
    event.stopPropagation();

    const current = this.control().value;

    this.control().setValue(current.filter((selectedId) => selectedId !== id));

    this.control().markAsTouched();
    this.control().markAsDirty();
  }

  get selected(): number[] {
    return this.control().value;
  }

  getProcessName(id: number): string {
    return this.processes().find((process) => process.id === id)?.name ?? '';
  }
}
