import { Routes } from '@angular/router';
import { authTenantGuard } from '../../auth/guards/auth.tenant.guard';

export const EMPRESA_ROUTES: Routes = [
  {
    path: 'empresa',
    canMatch: [authTenantGuard],
    loadComponent: () =>
      import('../../shared/layouts/platform-layout/platform-layout').then((m) => m.PlatformLayout),
    children: [
      {
        path: '',
        redirectTo: 'perfil',
        pathMatch: 'full',
      },
      /*       {
        path: 'dashboard',
        loadComponent: () => import('../pages/dashboard/dashboard').then((m) => m.Dashboard),
      }, */
      {
        path: 'perfil',
        loadComponent: () => import('../pages/perfil/perfil-empresa').then((m) => m.PerfilEmpresa),
      },
      {
        path: 'vacantes',
        loadComponent: () =>
          import('../pages/vacantes/vacantes-empresa').then((m) => m.VacantesEmpresa),
      },
      {
        path: 'candidatos',
        loadComponent: () => import('../pages/candidatos/candidatos').then((m) => m.Candidatos),
      },
      {
        path: 'candidatos/:id',
        loadComponent: () =>
          import('../pages/candidatos/candidato-detalle/candidato-detalle').then(
            (m) => m.CandidatoDetalle,
          ),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('../pages/configuracion/configuracion').then((m) => m.Configuracion),
      },
    ],
  },
];
