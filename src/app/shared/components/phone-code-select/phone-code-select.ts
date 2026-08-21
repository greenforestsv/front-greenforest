import { Component, inject, input, signal } from '@angular/core';
import { CatalogosService } from '../../../core/services/catalogos.service';
import { MessageService } from 'primeng/api';
import { GetCountryDto } from '../../../core/interfaces/catalogos.interfaces';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { finalize } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-phone-code-select',
  imports: [SelectModule, MessageModule, ReactiveFormsModule],
  templateUrl: './phone-code-select.html',
})
export class PhoneCodeSelect {
  catalogsService = inject(CatalogosService);
  messageService = inject(MessageService);

  loading = signal(false);
  countries = signal<GetCountryDto[]>([]);

  control = input.required<FormControl<string>>();

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.catalogsService
      .getCountries()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.countries.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de países',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
