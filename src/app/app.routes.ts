import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './layouts/auth-layout/auth.routes';
import { PUBLIC_ROUTES } from './layouts/public-layout/public-layout.routes';
import { CANDIDATO_ROUTES } from './layouts/platform-layout/candidato.routes';

export const routes: Routes = [
  ...PUBLIC_ROUTES,
  ...AUTH_ROUTES,
  ...CANDIDATO_ROUTES,
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
