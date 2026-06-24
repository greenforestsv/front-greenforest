import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DatePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

interface Entrevista {
  id: number;
  empresa: string;
  fecha: Date;
  hora: string;
}

@Component({
  selector: 'app-entrevistas',
  templateUrl: './entrevistas.html',
  standalone: true,
  imports: [ButtonModule, DatePickerModule, FormsModule, DatePipe, AvatarModule],
})
export class Entrevistas {
  entrevistas = signal<Entrevista[]>([
    {
      id: 1,
      empresa: 'Analiza',
      fecha: new Date(2026, 5, 25),
      hora: '14:00',
    },
    {
      id: 2,
      empresa: 'Cuscatlán',
      fecha: new Date(2026, 5, 30),
      hora: '13:00',
    },
    {
      id: 3,
      empresa: 'Diana',
      fecha: new Date(2026, 6, 6),
      hora: '15:00',
    },
  ]);

  fechasEntrevistas = computed<Date[]>(() => this.entrevistas().map((e) => e.fecha));
}
