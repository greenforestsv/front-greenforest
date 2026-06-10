import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './layouts/auth-layout/auth.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./templates/basic/basic').then((m) => m.Basic),
    loadChildren: () => import('./templates/basic/basic.routes').then((m) => m.BasicRouter),
  },
  ...AUTH_ROUTES,
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
