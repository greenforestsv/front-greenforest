import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SidebarResponse } from '../interfaces/sidebar.interfaces';

@Injectable({
  providedIn: 'root',
})
/* FIXME: debe ser por rol y por plan */
export class SidebarService {
  obtenerSidebar(idUsuario: number /* TODO: usar uuid */): Observable<SidebarResponse> {
    let sidebar: SidebarResponse;

    if (idUsuario === 1) {
      sidebar = {
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
    } else {
      sidebar = {
        user: {
          name: 'Analiza',
          avatarImage: '',
        },
        links: [
          {
            id: 1,
            icon: 'pi-chart-bar',
            name: 'sidebar.empresa.dashboard',
            route: '/empresa/dashboard',
            order: 1,
          },
          {
            id: 2,
            icon: 'pi-briefcase',
            name: 'sidebar.empresa.vacantes',
            route: '/empresa/vacantes',
            order: 3,
          },
          {
            id: 3,
            icon: 'pi-users',
            name: 'sidebar.empresa.candidatos',
            route: '/empresa/candidatos',
            order: 4,
          },
          {
            id: 4,
            icon: 'pi-clipboard',
            name: 'sidebar.empresa.entrevistas',
            route: '/empresa/entrevistas',
            order: 4,
          },
          {
            id: 5,
            icon: 'pi-check-square',
            name: 'sidebar.empresa.evaluaciones',
            route: '/empresa/evaluaciones',
            order: 2,
          },
          {
            id: 6,
            icon: 'pi-users',
            name: 'sidebar.empresa.empleados',
            route: '/empresa/empleados',
            order: 6,
          },
          {
            id: 7,
            icon: 'pi-clock',
            name: 'sidebar.empresa.marcacion',
            route: '/empresa/marcacion',
            order: 7,
          },
          {
            id: 8,
            icon: 'pi-calendar-clock',
            name: 'sidebar.empresa.turnos',
            route: '/empresa/turnos',
            order: 8,
          },
          {
            id: 9,
            icon: 'pi-dollar',
            name: 'sidebar.empresa.nomina',
            route: '/empresa/nomina',
            order: 9,
          },
          {
            id: 10,
            icon: 'pi-chart-line',
            name: 'sidebar.empresa.desempeno',
            route: '/empresa/desempeno',
            order: 10,
          },
          {
            id: 11,
            icon: 'pi-send',
            name: 'sidebar.empresa.solicitudesAcceso',
            route: '/empresa/solicitudes-acceso',
            order: 11,
          },
          {
            id: 12,
            icon: 'pi-file',
            name: 'sidebar.empresa.reportes',
            route: '/empresa/reportes',
            order: 12,
          },
          {
            id: 13,
            icon: 'pi-id-card',
            name: 'sidebar.empresa.perfil',
            route: '/empresa/perfil',
            order: 13,
          },
          {
            id: 14,
            icon: 'pi-users',
            name: 'sidebar.empresa.usuarios',
            route: '/empresa/usuarios',
            order: 14,
          },
          {
            id: 15,
            icon: 'pi-cog',
            name: 'sidebar.empresa.configuracion',
            route: '/empresa/configuracion',
            order: 15,
          },
        ],
      };
    }
    return of(sidebar).pipe(delay(0));
  }
}
