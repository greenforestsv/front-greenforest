import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Empresa } from '../interfaces/empresa.interface';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TenantResponseDto } from '../interfaces/empresa.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  /* CONSTRUCTOR */
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  /* GET EMPRESAS */
  getEmpresas() {
    return this.http.get<TenantResponseDto[]>(`${this.apiUrl}/tenant/list`);
  }
  /*  getEmpresas(): Observable<Empresa[]> {
    return of([
      {
        id: 1,
        name: 'NovaTech',
        industry: 'Tecnología',
        country: 'El Salvador',
        ascensos_internos: 76,
        rotacion: 82,
        beneficios_reales: 74,
        reputacion_alta: true,
        solicito_acceso: true,
        vacantes: 0,
      },
      {
        id: 2,
        name: 'AgroPlus',
        industry: 'Agricultura',
        country: 'Guatemala',
        ascensos_internos: 63,
        rotacion: 71,
        beneficios_reales: 68,
        reputacion_alta: true,
        solicito_acceso: false,
        vacantes: 2,
      },
      {
        id: 3,
        name: 'FinCore',
        industry: 'Finanzas',
        country: 'Costa Rica',
        ascensos_internos: 84,
        rotacion: 65,
        beneficios_reales: 81,
        reputacion_alta: true,
        solicito_acceso: true,
        vacantes: 1,
      },
      {
        id: 4,
        name: 'HealthOne',
        industry: 'Salud',
        country: 'Honduras',
        ascensos_internos: 58,
        rotacion: 74,
        beneficios_reales: 79,
        reputacion_alta: false,
        solicito_acceso: true,
        vacantes: 4,
      },
      {
        id: 5,
        name: 'EcoBuild',
        industry: 'Construcción',
        country: 'Panamá',
        ascensos_internos: 69,
        rotacion: 62,
        beneficios_reales: 72,
        reputacion_alta: true,
        solicito_acceso: false,
        vacantes: 3,
      },
      {
        id: 6,
        name: 'BlueWave',
        industry: 'Telecomunicaciones',
        country: 'Nicaragua',
        ascensos_internos: 81,
        rotacion: 77,
        beneficios_reales: 86,
        reputacion_alta: true,
        solicito_acceso: true,
        vacantes: 5,
      },
      {
        id: 7,
        name: 'LogisPro',
        industry: 'Logística',
        country: 'El Salvador',
        ascensos_internos: 55,
        rotacion: 69,
        beneficios_reales: 61,
        reputacion_alta: false,
        solicito_acceso: false,
        vacantes: 0,
      },
      {
        id: 8,
        name: 'GreenFoods',
        industry: 'Alimentos',
        country: 'Costa Rica',
        ascensos_internos: 73,
        rotacion: 80,
        beneficios_reales: 77,
        reputacion_alta: true,
        solicito_acceso: true,
        vacantes: 2,
      },
      {
        id: 9,
        name: 'InnovaSoft',
        industry: 'Software',
        country: 'Guatemala',
        ascensos_internos: 88,
        rotacion: 84,
        beneficios_reales: 91,
        reputacion_alta: true,
        solicito_acceso: false,
        vacantes: 5,
      },
      {
        id: 10,
        name: 'UrbanDesign',
        industry: 'Arquitectura',
        country: 'Panamá',
        ascensos_internos: 60,
        rotacion: 58,
        beneficios_reales: 66,
        reputacion_alta: false,
        solicito_acceso: true,
        vacantes: 1,
      },
      {
        id: 11,
        name: 'CloudNet',
        industry: 'Tecnología',
        country: 'Honduras',
        ascensos_internos: 79,
        rotacion: 73,
        beneficios_reales: 83,
        reputacion_alta: true,
        solicito_acceso: false,
        vacantes: 4,
      },
      {
        id: 12,
        name: 'Textil Maya',
        industry: 'Manufactura',
        country: 'Guatemala',
        ascensos_internos: 52,
        rotacion: 64,
        beneficios_reales: 59,
        reputacion_alta: false,
        solicito_acceso: true,
        vacantes: 0,
      },
    ]).pipe(delay(1500));
  } */
}
