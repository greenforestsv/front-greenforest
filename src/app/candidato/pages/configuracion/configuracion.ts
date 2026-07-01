import { Component } from '@angular/core';
import { LanguageSwitch } from '../../../shared/components/language-switch/language-switch';

@Component({
  selector: 'app-configuracion',
  imports: [LanguageSwitch],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.scss',
})
export class Configuracion {}
