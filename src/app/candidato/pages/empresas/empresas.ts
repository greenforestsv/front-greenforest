import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

interface Empresa {
  id: number;
  avatar_image?: string;
  name: string;
  industry: string;
  country: string;
  ascensos_internos: number;
  rotacion: number;
  beneficios_reales: number;
  reputacion_alta: boolean;
  solicito_acceso: boolean;
}

@Component({
  selector: 'app-empresas',
  imports: [AvatarModule],
  templateUrl: './empresas.html',
  styleUrl: './empresas.scss',
})
export class Empresas {
  empresas = signal<Empresa[]>([
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
    },
  ]);
}
