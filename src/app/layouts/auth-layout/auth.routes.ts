import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('../../pages/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'registro-candidato',
        loadComponent: () =>
          import('../../pages/auth/registro-candidato/registro-candidato').then(
            (m) => m.RegistroCandidato,
          ),
      },
    ],
  },
];
