import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { generalService } from '../../shared/services/general';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-basic',
  imports: [RouterLink, RouterOutlet, ButtonModule, FooterComponent],
  templateUrl: './basic.html',
  styleUrl: './basic.scss',
})
export class Basic {
  generalService: generalService = inject(generalService);

  constructor() {
    this.generalService.loadDataPortals();
  }

  // Menú ista de botones de inicio de sesión
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
