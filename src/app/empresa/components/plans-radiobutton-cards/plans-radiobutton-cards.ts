import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';

interface PlanFeatures {
  limit_employees: number | 'No limit';
  limit_administrative_user: number;
  limit_openning_jobs: number;
  talent_intelligence: boolean;
  limit_sucursals: number | 'No limit';
  assisted_interviews: {
    active: boolean;
    limit_interviews: number;
  };
  dedicated_support: boolean;
  psychometric_tests: boolean;
  executive_dashboards: boolean;
  reports: string[];
  is_isolated: boolean;
}

interface Plan {
  id: number;
  name: string;
  description: string;
  monthly_price: number;
  annual_price: number;
  discount: number;
  features: PlanFeatures;
  tag: string | null;
}

@Component({
  selector: 'app-plans-radiobutton-cards',
  imports: [RadioButtonModule, TagModule, FormsModule],
  templateUrl: './plans-radiobutton-cards.html',
  styleUrl: './plans-radiobutton-cards.scss',
})
export class PlansRadiobuttonCards {
  selectedPlan: number = 1;

  plans: Plan[] = [
    {
      id: 1,
      name: 'Gratuito',
      description: 'Ideal para pequeñas empresas que comienzan a contratar.',
      monthly_price: 0,
      annual_price: 0,
      discount: 0,
      tag: null,
      features: {
        limit_employees: 8,
        limit_administrative_user: 1,
        limit_openning_jobs: 1,
        talent_intelligence: false,
        limit_sucursals: 1,
        assisted_interviews: {
          active: false,
          limit_interviews: 0,
        },
        dedicated_support: false,
        psychometric_tests: false,
        executive_dashboards: false,
        reports: [],
        is_isolated: false,
      },
    },
    {
      id: 2,
      name: 'Básico',
      description: 'Para empresas pequeñas con necesidades básicas de contratación.',
      monthly_price: 29,
      annual_price: 290,
      discount: 17,
      tag: null,
      features: {
        limit_employees: 50,
        limit_administrative_user: 3,
        limit_openning_jobs: 3,
        talent_intelligence: false,
        limit_sucursals: 2,
        assisted_interviews: {
          active: true,
          limit_interviews: 5,
        },
        dedicated_support: false,
        psychometric_tests: false,
        executive_dashboards: false,
        reports: ['Reporte básico de candidatos'],
        is_isolated: false,
      },
    },
    {
      id: 3,
      name: 'Pro',
      description: 'Para empresas en crecimiento que buscan optimizar sus procesos.',
      monthly_price: 59,
      annual_price: 590,
      discount: 17,
      tag: 'Popular',
      features: {
        limit_employees: 250,
        limit_administrative_user: 10,
        limit_openning_jobs: 10,
        talent_intelligence: true,
        limit_sucursals: 5,
        assisted_interviews: {
          active: true,
          limit_interviews: 25,
        },
        dedicated_support: true,
        psychometric_tests: true,
        executive_dashboards: true,
        reports: [
          'Reporte de candidatos',
          'Reporte de procesos de selección',
          'Métricas de contratación',
        ],
        is_isolated: false,
      },
    },
    {
      id: 4,
      name: 'Enterprise',
      description: 'Solución completa y personalizada para grandes organizaciones.',
      monthly_price: 199,
      annual_price: 1990,
      discount: 17,
      tag: 'Empresarial',
      features: {
        limit_employees: 'No limit',
        limit_administrative_user: 50,
        limit_openning_jobs: 50,
        talent_intelligence: true,
        limit_sucursals: 'No limit',
        assisted_interviews: {
          active: true,
          limit_interviews: 100,
        },
        dedicated_support: true,
        psychometric_tests: true,
        executive_dashboards: true,
        reports: [
          'Reporte de candidatos',
          'Reporte de procesos',
          'Métricas de contratación',
          'Dashboard ejecutivo',
          'Reportes personalizados',
        ],
        is_isolated: true,
      },
    },
  ];
}
