import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { generalService } from '../../shared/services/general';
import { ButtonModule } from 'primeng/button';
import { Header } from '../../shared/components/header/header';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'public-layout',
  imports: [RouterOutlet, ButtonModule, FooterComponent, Header],
  templateUrl: './public-layout.html',
})
export class PublicLayout {
  generalService: generalService = inject(generalService);

  constructor() {
    this.generalService.loadDataPortals();
  }
}
