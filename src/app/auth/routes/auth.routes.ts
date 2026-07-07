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
  {
    path: 'olvido-contrasena',
    canMatch: [guestGuard],
    loadComponent: () =>
      import('../../auth/pages/olvido-contrasena/olvido-contrasena').then(
        (m) => m.OlvidoContrasena,
      ),
  },
  {
    path: 'verify/:id',
    canMatch: [guestGuard],
    loadComponent: () => import('../../auth/pages/verify/verify').then((m) => m.Verify),
  },
  {
    path: 'cambio-contrasena',
    canMatch: [guestGuard],
    loadComponent: () =>
      import('../../auth/pages/cambio-contrasena/cambio-contrasena').then(
        (m) => m.CambioContrasena,
      ),
  },
];
