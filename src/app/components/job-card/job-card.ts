import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'job-card',
  standalone: true,
  imports: [ButtonModule, CardModule, BadgeModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css',
})
export class JobCardComponent {
  empleo = input.required<any>();
  active = input(false);
}
