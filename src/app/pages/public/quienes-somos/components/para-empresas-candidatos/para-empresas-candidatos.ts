import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-para-empresas-candidatos',
  imports: [],
  templateUrl: './para-empresas-candidatos.html',
  styleUrl: './para-empresas-candidatos.scss',
})
export class ParaEmpresasCandidatos {
  empresas = signal([
    {
      id: 1,
      icono: 'pi-search',
      titulo: 'Selección más eficiente',
      descripcion: 'Automatiza y optimiza cada etapa del proceso de selección.',
    },
    {
      id: 2,
      icono: 'pi-android',
      titulo: 'Entrevistas con IA',
      descripcion: 'Evalúa habilidades y competencias con entrevistas estructuradas.',
    },
    {
      id: 3,
      icono: 'pi-clipboard',
      titulo: 'Evaluaciones objetivas',
      descripcion: 'Mide capacidades reales con criterios estandarizados.',
    },
    {
      id: 4,
      icono: 'pi-chart-bar',
      titulo: 'Analítica de talento',
      descripcion: 'Dashboards para tomar decisiones estratégicas.',
    },
    {
      id: 5,
      icono: 'pi-shield',
      titulo: 'Trazabilidad y cumplimiento',
      descripcion: 'Historial verificable y auditoría en cada proceso.',
    },
    {
      id: 6,
      icono: 'pi-clock',
      titulo: 'Ahorro de tiempo y recursos',
      descripcion: 'Reduce tiempos de contratación y costos operativos.',
    },
  ]);
  candidatos = signal([
    {
      id: 1,
      icono: 'pi-search',
      titulo: 'Acceso a oportunidades',
      descripcion: 'Encuentra vacantes alineadas con tu perfil y objetivos.',
    },
    {
      id: 2,
      icono: 'pi-user',
      titulo: 'Perfil profesional robusto',
      descripcion: 'Destaca habilidades, experiencia y logros en un solo lugar.',
    },
    {
      id: 3,
      icono: 'pi-shield',
      titulo: 'Historial verificable',
      descripcion: 'Experiencia, formación y certificaciones respaldadas.',
    },
    {
      id: 4,
      icono: 'pi-chart-line',
      titulo: 'Crecimiento y reputación',
      descripcion: 'Mejora tu empleabilidad y fortalece tu marca profesional.',
    },
    {
      id: 5,
      icono: 'pi-eye',
      titulo: 'Transparencia en los procesos',
      descripcion: 'Conoce cada etapa y recibe retroalimentación clara.',
    },
    {
      id: 6,
      icono: 'pi-bullseye',
      titulo: 'Postulación inteligente',
      descripcion: 'Recomendaciones personalizadas según tu perfil.',
    },
  ]);
}
