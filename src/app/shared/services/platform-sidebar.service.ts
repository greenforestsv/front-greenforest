import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SidebarResponse } from '../interfaces/sidebar.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  obtenerSidebar(idUsuario: number /* TODO: usar uuid */): Observable<SidebarResponse> {
    const sidebar: SidebarResponse = {
      user: {
        name: 'Mary Jane',
        avatarImage: '',
      },
      links: [
        {
          id: 1,
          icon: 'pi-chart-bar',
          name: 'sidebar.candidato.dashboard',
          route: '/candidato/dashboard',
          order: 1,
        },
        {
          id: 2,
          icon: 'pi-calendar',
          name: 'sidebar.candidato.historial',
          route: '/candidato/curriculum',
          order: 3,
        },
        {
          id: 3,
          icon: 'pi-send',
          name: 'sidebar.candidato.postulaciones',
          route: '/candidato/postulaciones',
          order: 4,
        },
        {
          id: 4,
          icon: 'pi-building',
          name: 'sidebar.candidato.empresas',
          route: '/candidato/empresas',
          order: 4,
        },
        {
          id: 5,
          icon: 'pi-id-card',
          name: 'sidebar.candidato.perfil',
          route: '/candidato/perfil',
          order: 2,
        },
        {
          id: 6,
          icon: 'pi-briefcase',
          name: 'sidebar.candidato.vacantes',
          route: '/candidato/vacantes',
          order: 6,
        },
        {
          id: 7,
          icon: 'pi-shield',
          name: 'sidebar.candidato.solicitudesAcceso',
          route: '/candidato/solicitudes-acceso',
          order: 7,
        },
        {
          id: 8,
          icon: 'pi-check-square',
          name: 'sidebar.candidato.evaluaciones',
          route: '/candidato/evaluaciones',
          order: 8,
        },
        {
          id: 9,
          icon: 'pi-chart-line',
          name: 'sidebar.candidato.crecimiento',
          route: '/candidato/crecimiento',
          order: 9,
        },
        {
          id: 10,
          icon: 'pi-cog',
          name: 'sidebar.candidato.configuracion',
          route: '/candidato/configuracion',
          order: 10,
        },
      ],
    };

    return of(sidebar).pipe(delay(0));
  }
}
