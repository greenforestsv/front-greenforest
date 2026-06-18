import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login-empresarial',
        loadComponent: () =>
          import('../../pages/auth/login-empresarial/login-empresarial').then(
            (m) => m.LoginEmpresarial,
          ),
      },
      {
        path: 'login-candidato',
        loadComponent: () =>
          import('../../pages/auth/login-candidato/login-candidato').then((m) => m.LoginCandidato),
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
