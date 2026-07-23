import { Routes } from '@angular/router';
import { authGuard } from '../../auth/guards/auth.guard';

/* TODO: crear guard que revise rol y plan */
export const EMPRESA_ROUTES: Routes = [
  {
    path: 'empresa',
    //canMatch: [authGuard],
    loadComponent: () =>
      import('../../shared/layouts/platform-layout/platform-layout').then((m) => m.PlatformLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
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
        path: 'configuracion',
        loadComponent: () =>
          import('../pages/configuracion/configuracion').then((m) => m.Configuracion),
      },
    ],
  },
];
