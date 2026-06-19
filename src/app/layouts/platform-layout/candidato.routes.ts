import { Routes } from '@angular/router';

export const CANDIDATO_ROUTES: Routes = [
  {
    path: 'candidato',

    loadComponent: () => import('./platform-layout').then((m) => m.PlatformLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../pages/candidato/dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },
];
