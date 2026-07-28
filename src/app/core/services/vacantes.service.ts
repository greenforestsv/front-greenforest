import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Vacante, VacantesResponse } from '../interfaces/vacantes.interfaces';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /*   getJobs(limit: number, offset: number) {
    return this.http.get<VacantesResponse>(`${this.apiUrl}/jobs?limit=${limit}&offset=${offset}`);
  } */

  getJobs(limit: number, offset: number): Observable<VacantesResponse> {
    const jobs: Vacante[] = [
      {
        id: 1,
        title: 'Business Intelligence Lead',
        description:
          'Empresa regional busca perfil híbrido para liderar dashboards, automatización de reportes y toma de decisiones comerciales.',
        salary_range: '$1,800 - $2,400',
        tags: ['Compatibilidad 94%', 'Rotación baja', 'Híbrido', 'San Salvador'],
      },
      {
        id: 2,
        title: 'AI Automation Specialist',
        description:
          'Diseño de agentes conversacionales, flujos de integración y automatización de procesos internos para clientes B2B.',
        salary_range: '$1,600 - $2,100',
        tags: ['Compatibilidad 91%', 'Salario visible', 'Remoto'],
      },
      {
        id: 3,
        title: 'Growth Marketing Manager',
        description:
          'Gestión de campañas, embudos B2B, análisis de métricas y optimización de captación regional.',
        salary_range: '$1,500 - $2,000',
        tags: ['Compatibilidad 88%', 'Ascensos 34%', 'Híbrido'],
      },
      {
        id: 4,
        title: 'Product Marketing Specialist SaaS',
        description:
          'Posicionamiento, investigación de mercado, mensajes comerciales y lanzamiento de producto digital.',
        salary_range: '$1,300 - $1,800',
        tags: ['Compatibilidad 85%', 'Presencial flexible'],
      },
      {
        id: 5,
        title: 'Frontend Angular Developer',
        description:
          'Desarrollo de aplicaciones empresariales utilizando Angular, Signals y PrimeNG.',
        salary_range: '$1,400 - $2,000',
        tags: ['Angular', 'Híbrido', 'San Salvador'],
      },
      {
        id: 6,
        title: 'Backend NestJS Engineer',
        description: 'Implementación de APIs REST escalables con NestJS, PostgreSQL y TypeORM.',
        salary_range: '$1,700 - $2,500',
        tags: ['NestJS', 'PostgreSQL', 'Remoto'],
      },
      {
        id: 7,
        title: 'DevOps Engineer',
        description: 'Administración de infraestructura cloud, Docker, CI/CD y Kubernetes.',
        salary_range: '$2,000 - $2,800',
        tags: ['Docker', 'AWS', 'Remoto'],
      },
      {
        id: 8,
        title: 'UX/UI Designer',
        description: 'Diseño de interfaces centradas en el usuario para plataformas web y móviles.',
        salary_range: '$1,100 - $1,700',
        tags: ['Figma', 'Diseño UX', 'Híbrido'],
      },
      {
        id: 9,
        title: 'QA Automation Engineer',
        description:
          'Automatización de pruebas funcionales y de integración para aplicaciones empresariales.',
        salary_range: '$1,300 - $1,900',
        tags: ['Cypress', 'QA', 'Remoto'],
      },
      {
        id: 10,
        title: 'Data Engineer',
        description: 'Diseño de pipelines ETL y procesamiento de grandes volúmenes de datos.',
        salary_range: '$1,900 - $2,700',
        tags: ['Python', 'SQL', 'Híbrido'],
      },
      {
        id: 11,
        title: 'Cloud Solutions Architect',
        description:
          'Diseño de arquitecturas escalables sobre AWS y Azure para clientes corporativos.',
        salary_range: '$2,800 - $3,600',
        tags: ['AWS', 'Arquitectura', 'Remoto'],
      },
      {
        id: 12,
        title: 'Cybersecurity Analyst',
        description:
          'Monitoreo de incidentes, análisis de vulnerabilidades y cumplimiento normativo.',
        salary_range: '$1,800 - $2,600',
        tags: ['Seguridad', 'SOC', 'Presencial'],
      },
      {
        id: 13,
        title: 'Mobile Flutter Developer',
        description: 'Desarrollo de aplicaciones móviles multiplataforma para Android e iOS.',
        salary_range: '$1,500 - $2,200',
        tags: ['Flutter', 'Mobile', 'Remoto'],
      },
      {
        id: 14,
        title: 'Business Analyst',
        description: 'Levantamiento de requerimientos y optimización de procesos de negocio.',
        salary_range: '$1,300 - $1,900',
        tags: ['Análisis', 'Scrum', 'Híbrido'],
      },
      {
        id: 15,
        title: 'Scrum Master',
        description: 'Facilitación de equipos ágiles y mejora continua de procesos de desarrollo.',
        salary_range: '$1,700 - $2,300',
        tags: ['Scrum', 'Agile', 'Remoto'],
      },
      {
        id: 16,
        title: 'Full Stack Developer',
        description: 'Desarrollo de soluciones web con Angular, NestJS y PostgreSQL.',
        salary_range: '$1,800 - $2,700',
        tags: ['Full Stack', 'Angular', 'NestJS'],
      },
      {
        id: 17,
        title: 'Machine Learning Engineer',
        description:
          'Entrenamiento e implementación de modelos predictivos para productos digitales.',
        salary_range: '$2,300 - $3,200',
        tags: ['Python', 'IA', 'Remoto'],
      },
      {
        id: 18,
        title: 'ERP Functional Consultant',
        description: 'Implementación y parametrización de soluciones ERP para empresas regionales.',
        salary_range: '$1,600 - $2,400',
        tags: ['ERP', 'Consultoría', 'Presencial'],
      },
      {
        id: 19,
        title: 'Digital Marketing Specialist',
        description: 'Planificación de campañas digitales, SEO, SEM y automatización de marketing.',
        salary_range: '$1,200 - $1,800',
        tags: ['SEO', 'Google Ads', 'Híbrido'],
      },
      {
        id: 20,
        title: 'Database Administrator',
        description:
          'Administración, respaldo y optimización de bases de datos PostgreSQL y SQL Server.',
        salary_range: '$1,900 - $2,600',
        tags: ['PostgreSQL', 'DBA', 'Remoto'],
      },
      {
        id: 21,
        title: 'Project Manager',
        description:
          'Coordinación de proyectos tecnológicos y gestión de cronogramas y presupuesto.',
        salary_range: '$2,100 - $3,000',
        tags: ['PMP', 'Liderazgo', 'Híbrido'],
      },
      {
        id: 22,
        title: 'Power BI Developer',
        description:
          'Construcción de dashboards ejecutivos y modelos analíticos para toma de decisiones.',
        salary_range: '$1,500 - $2,200',
        tags: ['Power BI', 'BI', 'Remoto'],
      },
      {
        id: 23,
        title: 'React Frontend Developer',
        description:
          'Desarrollo de interfaces modernas utilizando React, TypeScript y Tailwind CSS.',
        salary_range: '$1,600 - $2,300',
        tags: ['React', 'TypeScript', 'Remoto'],
      },
      {
        id: 24,
        title: 'Technical Support Engineer',
        description:
          'Soporte técnico de segundo nivel para plataformas empresariales y servicios cloud.',
        salary_range: '$1,000 - $1,500',
        tags: ['Soporte', 'ITIL', 'Presencial'],
      },
    ];

    return of({
      qty: jobs.length,
      data: jobs.slice(offset, offset + limit),
    }).pipe(delay(500));
  }
}
