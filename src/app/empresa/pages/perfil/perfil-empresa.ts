import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-perfil-empresa',
  imports: [ButtonModule, TranslatePipe],
  templateUrl: './perfil-empresa.html',
  styleUrl: './perfil-empresa.scss',
})
export class PerfilEmpresa {
  reputacion = signal([
    {
      id: 1,
      name: 'NovaTech',
      industry: 'Tecnología',
      country: 'El Salvador',
      ascensos_internos: 76,
      rotacion: 82,
      beneficios_reales: 74,
      reputacion_alta: true,
      solicito_acceso: true,
      vacantes: 0,
    },
    {
      id: 2,
      name: 'AgroPlus',
      industry: 'Agricultura',
      country: 'Guatemala',
      ascensos_internos: 63,
      rotacion: 71,
      beneficios_reales: 68,
      reputacion_alta: true,
      solicito_acceso: false,
      vacantes: 2,
    },
    {
      id: 3,
      name: 'FinCore',
      industry: 'Finanzas',
      country: 'Costa Rica',
      ascensos_internos: 84,
      rotacion: 65,
      beneficios_reales: 81,
      reputacion_alta: true,
      solicito_acceso: true,
      vacantes: 1,
    },
  ]);
}
