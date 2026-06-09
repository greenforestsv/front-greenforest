import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./templates/basic/basic').then((m) => m.Basic),
    loadChildren: () => import('./templates/basic/basic.routes').then((m) => m.BasicRouter),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
