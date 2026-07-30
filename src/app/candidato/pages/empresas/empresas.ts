import { Component, inject, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Empresa, TenantResponseDto } from '../../../core/interfaces/empresa.interface';
import { EmpresasService } from '../../../core/services/empresas.service';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslatePipe } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-empresas',
  imports: [
    AvatarModule,
    SkeletonModule,
    TranslatePipe,
    SelectModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './empresas.html',
  styleUrl: './empresas.scss',
})
export class Empresas {
  items = Array.from({ length: 9 });
  private empresasService = inject(EmpresasService);

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
  messageService: any;

  constructor() {
    this.empresasService
      .getEmpresas()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (empresas) => {
          this.empresas.set(empresas);
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
