import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Hero } from './components/hero/hero';
import { Busqueda } from './components/busqueda/busqueda';

@Component({
  selector: 'app-empleos',
  standalone: true,
  imports: [ButtonModule, AvatarModule, Hero, Busqueda],
  templateUrl: './empleos.html',
  styleUrl: './empleos.css',
})
export class Empleos {
  empleos = signal([
    {
      id: 1,
      puesto: 'Desarrollador Senior Frontend (React/Angular)',
      empresa: 'Tech Solutions Inc.',
      ubicacion: 'Tegucigalpa',
      modalidad: 'Tiempo Completo',
      salario: 2000,
      descripcion:
        'Buscamos un desarrollador experto para liderar la migración de microfrontends usando arquitecturas reactivas modernas.',
      tags: ['Angular 22', 'Tailwind', 'TypeScript'],
      fecha: 'Hace 2 días',
      active: true,
    },
    {
      id: 2,
      puesto: 'Diseñador UI/UX',
      empresa: 'Creative Studio',
      ubicacion: 'San Salvador',
      modalidad: 'Híbrido',
      salario: 1200,
      descripcion:
        'Únete a nuestro equipo creativo para diseñar soluciones complejas SaaS aplicadas a la industria Fintech.',
      tags: ['Figma', 'SaaS', 'Design Systems'],
      fecha: 'Hace 5 días',
    },
    {
      id: 3,
      puesto: 'Gerente de Marketing',
      empresa: 'Saasify Global',
      ubicacion: 'Remoto',
      modalidad: 'Tiempo Completo',
      salario: 1800,
      descripcion:
        'Encargado de planificar y optimizar estrategias de adquisición de clientes B2B mediante canales digitales.',
      tags: ['SEO', 'Google Ads', 'Data Analytics'],
      fecha: 'Ayer',
    },
    {
      id: 3,
      puesto: 'Gerente de Marketing',
      empresa: 'Saasify Global',
      ubicacion: 'Remoto',
      modalidad: 'Tiempo Completo',
      salario: 1800,
      descripcion:
        'Encargado de planificar y optimizar estrategias de adquisición de clientes B2B mediante canales digitales.',
      tags: ['SEO', 'Google Ads', 'Data Analytics'],
      fecha: 'Ayer',
    },
    {
      id: 3,
      puesto: 'Gerente de Marketing',
      empresa: 'Saasify Global',
      ubicacion: 'Remoto',
      modalidad: 'Tiempo Completo',
      salario: 1800,
      descripcion:
        'Encargado de planificar y optimizar estrategias de adquisición de clientes B2B mediante canales digitales.',
      tags: ['SEO', 'Google Ads', 'Data Analytics'],
      fecha: 'Ayer',
    },
    {
      id: 3,
      puesto: 'Gerente de Marketing',
      empresa: 'Saasify Global',
      ubicacion: 'Remoto',
      modalidad: 'Tiempo Completo',
      salario: 1800,
      descripcion:
        'Encargado de planificar y optimizar estrategias de adquisición de clientes B2B mediante canales digitales.',
      tags: ['SEO', 'Google Ads', 'Data Analytics'],
      fecha: 'Ayer',
    },
  ]);
}
