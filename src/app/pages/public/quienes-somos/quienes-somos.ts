import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Hero } from './components/hero/hero';
import { ParaEmpresasCandidatos } from './components/para-empresas-candidatos/para-empresas-candidatos';
import { EtapasCicloTalento } from './components/etapas-ciclo-talento/etapas-ciclo-talento';

@Component({
  selector: 'app-quienes-somos',
  imports: [ButtonModule, Hero, ParaEmpresasCandidatos, EtapasCicloTalento],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css',
})
export class QuieneSomos {}
