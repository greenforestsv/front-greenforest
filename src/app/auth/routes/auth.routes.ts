import { Routes } from '@angular/router';
import { guestGuard } from '../../auth/guards/guest.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login-empresarial',
    canMatch: [guestGuard],
    loadComponent: () =>
      import('../../auth/pages/login-empresarial/login-empresarial').then(
        (m) => m.LoginEmpresarial,
      ),
  },
  {
    path: 'login-candidato',
    canMatch: [guestGuard],
    loadComponent: () =>
      import('../../auth/pages/login-candidato/login-candidato').then((m) => m.LoginCandidato),
  },
  {
    path: 'registro-candidato',
    canMatch: [guestGuard],
    loadComponent: () =>
      import('../../auth/pages/registro-candidato/registro-candidato').then(
        (m) => m.RegistroCandidato,
      ),
  },
];
