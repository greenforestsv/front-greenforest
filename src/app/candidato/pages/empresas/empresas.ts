import { Component, inject, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { TenantResponseDto } from '../../../core/interfaces/empresa.interface';
import { EmpresasService } from '../../../core/services/empresas.service';
import { SkeletonModule } from 'primeng/skeleton';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empresas',
  imports: [
    RouterLink,
    AvatarModule,
    SkeletonModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    EmptyState,
  ],
  templateUrl: './empresas.html',
  styleUrl: './empresas.scss',
})
export class Empresas {
  items = Array.from({ length: 9 });
  tags = Array.from({ length: 6 });
  private empresasService = inject(EmpresasService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  // ESTADOS INICIALES DE FORMULARIO
  readonly search_form = this.fb.nonNullable.group({
    search_name: [''],
    search_location: [''],
    search_approach: [''],
  });

  // PROPIEDADES
  readonly search_name = this.search_form.controls.search_name;
  readonly search_location = this.search_form.controls.search_location;
  readonly search_approach = this.search_form.controls.search_approach;

  empresas = signal<TenantResponseDto[]>([]);
  loading = signal(true);

  limit = 10;
  offset = 0;

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    const request = {
      limit: this.limit,
      offset: this.offset,
      filters: {
        name: this.search_name.value || undefined,
        country: this.search_location.value ? [this.search_location.value] : undefined,
        approach: this.search_approach.value ? [this.search_approach.value] : undefined,
      },
    };

    this.empresasService
      .getEmpresas(request)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.empresas.set(response.data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de empresas',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
