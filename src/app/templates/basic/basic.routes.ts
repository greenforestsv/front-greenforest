import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../caption/pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'empleos',
    loadComponent: () => import('../../caption/pages/empleos/empleos').then((m) => m.Empleos),
  },
  {
    path: 'empresas',
    loadComponent: () => import('../../caption/pages/empresas/empresas').then((m) => m.Empresas),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicRouter {}
