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
        path: 'configuracion',
        loadComponent: () =>
          import('../pages/configuracion/configuracion').then((m) => m.Configuracion),
      },
    ],
  },
];
