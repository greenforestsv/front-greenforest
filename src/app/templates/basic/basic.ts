import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { generalService } from '../../shared/services/general';
import { ButtonModule } from 'primeng/button'


@Component({
  selector: 'app-basic',
  imports: [RouterLink, RouterOutlet, ButtonModule],
  templateUrl: './basic.html',
  styleUrl: './basic.scss',
})
export class Basic {
  generalService: generalService = inject(generalService)

  constructor(){
    this.generalService.loadDataPortals()
  }
}
