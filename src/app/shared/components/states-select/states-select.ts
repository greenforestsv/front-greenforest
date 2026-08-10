import { Component, effect, inject, input, signal } from '@angular/core';
import { CatalogosService } from '../../../core/services/catalogos.service';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { GetStateDto } from '../../../core/interfaces/catalogos.interfaces';
import { SelectModule } from 'primeng/select';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-states-select',
  imports: [SelectModule, MessageModule, ReactiveFormsModule],
  templateUrl: './states-select.html',
})
export class StatesSelect {
  catalogsService = inject(CatalogosService);
  messageService = inject(MessageService);

  loading = signal(false);
  states = signal<GetStateDto[]>([]);

  control = input.required<FormControl<string>>();
  countryControl = input.required<FormControl<string>>();

  ngOnInit() {
    const country = this.countryControl();

    if (country.value) {
      this.load(country.value);
    }

    country.valueChanges.subscribe((countryIso) => {
      this.control().reset();

      if (!countryIso) {
        this.states.set([]);
        return;
      }

      this.load(countryIso);
    });
  }

  load(country_iso: string) {
    this.loading.set(true);

    this.catalogsService
      .getStates(country_iso)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => {
          this.states.set(data);
        },
        error: (err: { error: { message: any }; status: number }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al obtener datos de departamentos',
            detail: err.error?.message ?? 'Ocurrió un error inesperado',
            life: 5000,
          });
        },
      });
  }
}
