import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFoundComponent {}
