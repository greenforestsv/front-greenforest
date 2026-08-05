import { Component, ViewChild } from '@angular/core';
import { LanguageSwitch } from '../../../shared/components/language-switch/language-switch';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CambioContrasenaDialog } from './dialogs/cambio-contrasena/cambio-contrasena-dialog';

@Component({
  selector: 'app-configuracion',
  imports: [LanguageSwitch, TranslatePipe, ButtonModule, CambioContrasenaDialog],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.scss',
})
export class Configuracion {
  @ViewChild(CambioContrasenaDialog)
  cambioContrasenaDialog!: CambioContrasenaDialog;
}
