import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { generalService } from '../../shared/services/general';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-basic',
  imports: [RouterOutlet, ButtonModule, FooterComponent, Header],
  templateUrl: './basic.html',
  styleUrl: './basic.scss',
})
export class Basic {
  generalService: generalService = inject(generalService);

  constructor() {
    this.generalService.loadDataPortals();
  }
}
