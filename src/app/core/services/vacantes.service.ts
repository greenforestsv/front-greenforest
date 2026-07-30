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

  /* OBTENER VACANTES */
  getJobs(limit: number, offset: number): Observable<VacantesResponse> {
    const baseVacante = {
      created_at: new Date(),
      ends_on: new Date('2026-12-31'),
      is_new: true,
      workday_type: 'Tiempo completo',
      workday: ['Lunes a Viernes'],
      contract_type: 'Indefinido',
      payment_dates: 'Quincenal',
    };

    const jobs: Vacante[] = [
      {
        id: crypto.randomUUID(),
        title: 'Business Intelligence Lead',
        description:
          'Empresa regional busca perfil híbrido para liderar dashboards, automatización de reportes y toma de decisiones comerciales.',
        min_salary: 1800,
        max_salary: 2400,
        format: 'Híbrido',
        area: 'Business Intelligence',
        skills: ['Power BI', 'SQL', 'Análisis de datos'],
        tools: ['Power BI', 'Excel'],
        requirements: ['3 años de experiencia', 'Power BI', 'SQL'],
        ...baseVacante,
      },
      {
        id: crypto.randomUUID(),
        title: 'AI Automation Specialist',
        description:
          'Diseño de agentes conversacionales, flujos de integración y automatización de procesos internos.',
        min_salary: 1600,
        max_salary: 2100,
        format: 'Remoto',
        area: 'Inteligencia Artificial',
        skills: ['Python', 'LLMs', 'APIs'],
        tools: ['OpenAI', 'n8n'],
        requirements: ['Python', 'Experiencia con IA generativa'],
        ...baseVacante,
      },
      {
        id: crypto.randomUUID(),
        title: 'Growth Marketing Manager',
        description: 'Gestión de campañas, embudos B2B y optimización de captación regional.',
        min_salary: 1500,
        max_salary: 2000,
        format: 'Híbrido',
        area: 'Marketing',
        skills: ['SEO', 'SEM', 'Analytics'],
        tools: ['Google Analytics', 'HubSpot'],
        requirements: ['Marketing Digital', 'Google Analytics'],
        ...baseVacante,
      },
      {
        id: crypto.randomUUID(),
        title: 'Frontend Angular Developer',
        description:
          'Desarrollo de aplicaciones empresariales utilizando Angular, Signals, PrimeNG y Tailwind CSS.',
        min_salary: 1700,
        max_salary: 2400,
        format: 'Híbrido',
        area: 'Desarrollo Frontend',
        skills: ['Angular', 'TypeScript', 'RxJS'],
        tools: ['Angular', 'PrimeNG', 'Tailwind CSS'],
        requirements: ['2 años de experiencia', 'Angular 17+', 'Git'],
        ...baseVacante,
      },
      {
        id: crypto.randomUUID(),
        title: 'Backend NestJS Engineer',
        description:
          'Implementación de APIs REST, autenticación JWT e integración con PostgreSQL y TypeORM.',
        min_salary: 1900,
        max_salary: 2700,
        format: 'Remoto',
        area: 'Desarrollo Backend',
        skills: ['NestJS', 'PostgreSQL', 'TypeScript'],
        tools: ['NestJS', 'TypeORM', 'Docker'],
        requirements: ['Node.js', 'NestJS', 'PostgreSQL'],
        ...baseVacante,
      },
      {
        id: crypto.randomUUID(),
        title: 'DevOps Engineer',
        description:
          'Administración de infraestructura cloud, automatización de despliegues y monitoreo de servicios.',
        min_salary: 2200,
        max_salary: 3200,
        format: 'Remoto',
        area: 'DevOps',
        skills: ['Docker', 'Kubernetes', 'CI/CD'],
        tools: ['GitHub Actions', 'AWS', 'Terraform'],
        requirements: ['Docker', 'Linux', 'AWS'],
        ...baseVacante,
      },
      {
        id: crypto.randomUUID(),
        title: 'UX/UI Designer',
        description:
          'Diseño de interfaces intuitivas para aplicaciones web y móviles con enfoque en experiencia de usuario.',
        min_salary: 1300,
        max_salary: 1900,
        format: 'Híbrido',
        area: 'Diseño',
        skills: ['UX', 'UI', 'Prototipado'],
        tools: ['Figma', 'Adobe XD'],
        requirements: ['Portafolio', 'Diseño de interfaces'],
        ...baseVacante,
      },
      {
        id: crypto.randomUUID(),
        title: 'QA Automation Engineer',
        description:
          'Diseño y automatización de pruebas funcionales e integración para plataformas empresariales.',
        min_salary: 1600,
        max_salary: 2300,
        format: 'Remoto',
        area: 'Calidad de Software',
        skills: ['Testing', 'Automatización', 'Cypress'],
        tools: ['Cypress', 'Postman', 'Jest'],
        requirements: ['QA Automation', 'API Testing'],
        ...baseVacante,
      },
      {
        id: crypto.randomUUID(),
        title: 'Data Engineer',
        description:
          'Construcción de pipelines ETL y procesamiento de datos para plataformas analíticas.',
        min_salary: 2100,
        max_salary: 3000,
        format: 'Híbrido',
        area: 'Ingeniería de Datos',
        skills: ['Python', 'SQL', 'ETL'],
        tools: ['Airflow', 'PostgreSQL', 'Spark'],
        requirements: ['Python', 'SQL', 'ETL'],
        ...baseVacante,
      },
    ];

    return of({
      qty: jobs.length,
      data: jobs.slice(offset, offset + limit),
    }).pipe(delay(500));
  }
}
