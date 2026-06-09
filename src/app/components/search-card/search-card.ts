import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'search-card',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    SelectModule,
    SliderModule,
    ButtonModule,
    CardModule,
    DecimalPipe,
  ],
  templateUrl: './search-card.html',
})
export class SearchCardComponent {
  searchQuery = model('');
  selectedArea = model<any>(null);
  salaryRange = model<[number, number]>([1000, 4000]);
  selectedLocation = model<any>(null);

  areas = [
    { name: 'Tecnología', code: 'tech' },
    { name: 'Diseño', code: 'design' },
    { name: 'Marketing', code: 'mkt' },
  ];

  locations = [
    { name: 'Remoto', code: 'remote' },
    { name: 'El Salvador', code: 'esv' },
    { name: 'Honduras', code: 'hnd' },
  ];

  buscar() {
    console.log('Filtros actuales enviados:', {
      busqueda: this.searchQuery(),
      area: this.selectedArea(),
      salario: this.salaryRange(),
      ubicacion: this.selectedLocation(),
    });
  }
}
