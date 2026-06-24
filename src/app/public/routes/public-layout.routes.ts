import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../layout/public-layout/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/landing/landing').then((m) => m.Landing),
      },
      {
        path: 'empleos',
        loadComponent: () => import('../pages/empleos/empleos').then((m) => m.Empleos),
      },
      {
        path: 'quienes-somos',
        loadComponent: () =>
          import('../pages/quienes-somos/quienes-somos').then((m) => m.QuieneSomos),
      },
    ],
  },
];
