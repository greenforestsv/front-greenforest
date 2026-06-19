import { Routes } from '@angular/router';

export const CANDIDATO_ROUTES: Routes = [
  {
    path: 'candidato',

    loadComponent: () => import('./candidato-layout').then((m) => m.CandidatoLayout),
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
