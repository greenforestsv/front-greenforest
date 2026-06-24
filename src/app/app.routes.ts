import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/routes/auth.routes';
import { PUBLIC_ROUTES } from './public/routes/public-layout.routes';
import { CANDIDATO_ROUTES } from './candidato/routes/candidato.routes';

export const routes: Routes = [
  ...PUBLIC_ROUTES,
  ...AUTH_ROUTES,
  ...CANDIDATO_ROUTES,
  {
    path: '**',
    loadComponent: () => import('./errors/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
