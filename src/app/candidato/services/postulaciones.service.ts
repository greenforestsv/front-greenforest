import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Postulacion } from '../interfaces/postulacion.interface';

@Injectable({
  providedIn: 'root',
})
export class PostulacionesService {
  /* GET POSTULACIONES */
  getPostulaciones(): Observable<Postulacion[]> {
    const postulaciones: Postulacion[] = [
      {
        id: 1,
        name: 'Growth Marketing Manager',
        company: 'LinkX Retail',
        status: 'A',
      },
      {
        id: 2,
        name: 'Product Marketing SaaS',
        company: 'GreenLabs',
        status: 'A',
      },
      {
        id: 3,
        name: 'BI Lead',
        company: 'Central Analytics',
        status: 'A',
      },
      {
        id: 4,
        name: 'AI Automation Specialist',
        company: 'NovaTech',
        status: 'P',
      },
      {
        id: 5,
        name: 'Business Intelligence Lead',
        company: 'GreenLabs',
        status: 'P',
      },
      {
        id: 6,
        name: 'Marketing Data Strategist',
        company: 'Kodigo',
        status: 'E',
      },
      {
        id: 7,
        name: 'Consultora AI Ops',
        company: 'Nueva Visión',
        status: 'O',
      },
    ];
    return of(postulaciones).pipe(delay(1500));
  }
}
