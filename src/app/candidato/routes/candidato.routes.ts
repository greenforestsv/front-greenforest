import { Routes } from '@angular/router';
import { authAspirantGuard } from '../../auth/guards/auth.aspirant.guard';

export const CANDIDATO_ROUTES: Routes = [
  {
    path: 'candidato',
    canMatch: [authAspirantGuard],
    loadComponent: () =>
      import('../../shared/layouts/platform-layout/platform-layout').then((m) => m.PlatformLayout),
    children: [
      {
        path: '',
        redirectTo: 'perfil',
        pathMatch: 'full',
      },
      /*       {
        path: 'dashboard',
        loadComponent: () => import('../pages/dashboard/dashboard').then((m) => m.Dashboard),
      }, */
      {
        path: 'perfil',
        loadComponent: () =>
          import('../pages/perfil/perfil-candidato').then((m) => m.PerfilCandidato),
      },
      {
        path: 'curriculum',
        loadComponent: () => import('../pages/curriculum/curriculum').then((m) => m.Curriculum),
      },
      {
        path: 'postulaciones',
        loadComponent: () =>
          import('../pages/postulaciones/postulaciones').then((m) => m.Postulaciones),
      },
      {
        path: 'vacantes',
        loadComponent: () =>
          import('../pages/vacantes/vacantes-candidato').then((m) => m.VacantesCandidato),
      },
      {
        path: 'empresas',
        loadComponent: () => import('../pages/empresas/empresas').then((m) => m.Empresas),
      },
      {
        path: 'empresas/:id',
        loadComponent: () =>
          import('../pages/empresas/empresa-detalle/empresa-detalle').then((m) => m.EmpresaDetalle),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('../pages/configuracion/configuracion').then((m) => m.Configuracion),
      },
    ],
  },
];
