import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('../../caption/pages/landing/landing').then((m) => m.Landing),
      },
      {
        path: 'empleos',
        loadComponent: () => import('../../caption/pages/empleos/empleos').then((m) => m.Empleos),
      },
      {
        path: 'quienes-somos',
        loadComponent: () =>
          import('../../caption/pages/quienes-somos/quienes-somos').then((m) => m.QuieneSomos),
      },
    ],
  },
];
