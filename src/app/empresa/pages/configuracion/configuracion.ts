import { Component } from '@angular/core';
import { LanguageSwitch } from '../../../shared/components/language-switch/language-switch';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-configuracion',
  imports: [LanguageSwitch, TranslatePipe],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.scss',
})
export class Configuracion {}
