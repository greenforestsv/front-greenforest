import { Component, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CatalogosService } from '../../../core/services/catalogos.service';
import { ChipModule } from 'primeng/chip';
import { MessageModule } from 'primeng/message';
import { GetCountryDto } from '../../../core/interfaces/catalogos.interfaces';

@Component({
  selector: 'app-countries-multiselect',
  imports: [ReactiveFormsModule, MultiSelectModule, ChipModule, MessageModule],
  templateUrl: './countries-multiselect.html',
})
export class CountriesMultiselect {
  private catalogsService = inject(CatalogosService);
  private messageService = inject(MessageService);

  control = input.required<FormControl<string[]>>();
  selectionLimit = input<number | null>(null);

  loading = signal(false);
  countries = signal<GetCountryDto[]>([]);

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
          console.log({ countries: data });
          this.countries.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener lista de países',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }

  removeItem(event: MouseEvent, iso: string): void {
    event.stopPropagation();

    const current = this.control().value;

    this.control().setValue(current.filter((selectedIso) => selectedIso !== iso));

    this.control().markAsTouched();
    this.control().markAsDirty();
  }

  get selected(): string[] {
    return this.control().value;
  }

  getCountryName(iso: string): string {
    return this.countries().find((country) => country.iso_code === iso)?.name ?? '';
  }
}
