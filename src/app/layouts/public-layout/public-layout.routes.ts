import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('../../pages/public/landing/landing').then((m) => m.Landing),
      },
      {
        path: 'empleos',
        loadComponent: () => import('../../pages/public/empleos/empleos').then((m) => m.Empleos),
      },
      {
        path: 'quienes-somos',
        loadComponent: () =>
          import('../../pages/public/quienes-somos/quienes-somos').then((m) => m.QuieneSomos),
      },
    ],
  },
];
