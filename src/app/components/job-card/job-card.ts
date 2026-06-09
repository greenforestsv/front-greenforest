import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'job-card',
  standalone: true,
  imports: [ButtonModule, CardModule, BadgeModule, DecimalPipe],
  templateUrl: './job-card.html',
})
export class JobCardComponent {
  empleo = input.required<any>();
}
