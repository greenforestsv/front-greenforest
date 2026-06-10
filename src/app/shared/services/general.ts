import { Injectable, signal, WritableSignal } from '@angular/core';
import { Portals } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class generalService {
  portals: WritableSignal<Portals[]> = signal([]);

  loadDataPortals = (): void => {
    this.portals.set([
      {
        title: 'Portal de empleado',
        icon: 'pi pi-user',
        style: 'secondary',
        description:
          'Autogestión total para los trabajadores contratados. Fomenta la transparencia y reduce la carga administrativa de RRHH.',
        itemsAdvantage: [
          'Descarga de nóminas 24/7',
          'Solicitud de vacaciones y permisos',
          'Directorio interno y comunicados',
        ],
        link: {
          title: 'Ver funciones del portal',
          route: '/quienes-somos',
          loginRequired: true,
        },
      },
      {
        title: 'Portal de empresa',
        icon: 'pi pi-building',
        style: 'primary',
        description:
          'El centro de comando para la empresa. Desde la publicación de ofertas hasta la gestión completa del ciclo de vida del talento contratado.',
        itemsAdvantage: [
          'Publicación multiplataforma (ATS)',
          'Gestión de nóminas y ausencias',
          'Evaluación de desempeño',
        ],
        link: {
          title: 'Solicitar demo',
          route: '/quienes-somos',
          loginRequired: true,
        },
      },
      {
        title: 'Bolsa de empleo',
        icon: 'pi pi-briefcase',
        style: 'secondary',
        description:
          'Un portal moderno donde los candidatos encuentran su próximo desafío. Perfiles ricos, matching inteligente y aplicación en un solo clic.',
        itemsAdvantage: [
          'Creación rápida de CV virtual',
          'Alertas de empleo personalizadas',
          'Seguimiento de candidaturas',
        ],
        link: {
          title: 'Explorar vacantes',
          route: '/empleos',
          loginRequired: false,
        },
      },
    ]);
  };
}
