import { Injectable } from "@angular/core";
import type { Portals } from '../../shared/interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})

export class CaptionService {
  loadAnalytics = () => {
    return {
      jobs: {
        icon: 'pi pi-briefcase',
        qty: 15000,
        legend: 'Empleos disponibles'
      },
      users: {
        icon: 'pi pi-users',
        qty: 100000,
        legend: 'Usuarios activos'
      },
      companies: {
        icon: 'pi pi-warehouse',
        qty: 5000,
        legend: 'Empresas activas',
        list: [
          {
            image: 'logo.svg',
            name: 'Analiza'
          },
          {
            image: 'logo.svg',
            name: 'Analiza'
          },
          {
            image: 'logo.svg',
            name: 'Analiza'
          },
          {
            image: 'logo.svg',
            name: 'Analiza'
          },
          {
            image: 'logo.svg',
            name: 'Analiza'
          },
          {
            image: 'logo.svg',
            name: 'Analiza'
          },
          {
            image: 'logo.svg',
            name: 'Analiza'
          }
        ]
      },
      countries: {
        icon: 'pi pi-globe',
        qty: 7,
        legend: 'Países incluídos'
      }
    }
  }
}
