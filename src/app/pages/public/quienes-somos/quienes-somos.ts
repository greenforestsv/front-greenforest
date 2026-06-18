import { Component } from '@angular/core';
import { PricingPlanes } from './components/pricing-planes/pricing-planes';
import { ButtonModule } from 'primeng/button';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-quienes-somos',
  imports: [PricingPlanes, ButtonModule, Hero],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css',
})
export class QuieneSomos {}
