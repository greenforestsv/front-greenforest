import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-etapas-ciclo-talento',
  imports: [TableModule],
  templateUrl: './etapas-ciclo-talento.html',
  styleUrl: './etapas-ciclo-talento.scss',
})
export class EtapasCicloTalento {
  etapas = [
    {
      id: 1,
      etapa: 'Empresas',
      descubrir: 'Encuentra talento alineado con las necesidades de la organización.',
      evaluar: 'Evalúa competencias con IA y métricas objetivas.',
      contratarPostular: 'Toma decisiones informadas y contrata con confianza.',
      crecer: 'Gestiona el desempeño y desarrolla a tu equipo.',
    },
    {
      id: 2,
      etapa: 'Empresas',
      descubrir: 'Descubre oportunidades que impulsan tu carrera.',
      evaluar: 'Demuestra habilidades y recibe evaluaciones justas.',
      contratarPostular: 'Postula a las mejores vacantes y avanza con claridad.',
      crecer: 'Sigue aprendiendo y construyendo tu futuro.',
    },
  ];
}
