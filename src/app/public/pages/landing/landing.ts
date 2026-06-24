import { Component } from '@angular/core';
import { TestimoniosComponent } from './components/testimonios/testimonios';
import { MisionVision } from './components/mision-vision/mision-vision';
import { PilaresFundamentales } from './components/pilares-fundamentales/pilares-fundamentales';
import { Hero } from './components/hero/hero';
import { Empresas } from './components/empresas/empresas';
import { Estadisticas } from './components/estadisticas/estadisticas';

@Component({
  selector: 'app-landing',
  imports: [Hero, TestimoniosComponent, MisionVision, PilaresFundamentales, Empresas, Estadisticas],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}
