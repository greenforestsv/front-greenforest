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
          icon: 'pi-home',
          name: 'Dashboard',
          route: '/candidato/dashboard',
        },
        {
          id: 2,
          icon: 'pi-id-card',
          name: 'Mi CV',
          route: '/candidato/curriculum',
        },
        {
          id: 3,
          icon: 'pi-send',
          name: 'Mis postulaciones',
          route: '/candidato/postulaciones',
        },
        {
          id: 4,
          icon: 'pi-heart',
          name: 'Mis favoritos',
          route: '/candidato/favoritos',
        },
      ],
    };

    return of(sidebar).pipe(delay(0));
  }
}
