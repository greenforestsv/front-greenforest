import { Routes } from '@angular/router';
import { authGuard } from '../../auth/guards/auth.guard';

export const CANDIDATO_ROUTES: Routes = [
  {
    path: 'candidato',
    canMatch: [authGuard],
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
        path: 'curriculum',
        loadComponent: () => import('../pages/curriculum/curriculum').then((m) => m.Curriculum),
      },
      {
        path: 'postulaciones',
        loadComponent: () =>
          import('../pages/postulaciones/postulaciones').then((m) => m.Postulaciones),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('../pages/configuracion/configuracion').then((m) => m.Configuracion),
      },
    ],
  },
];
