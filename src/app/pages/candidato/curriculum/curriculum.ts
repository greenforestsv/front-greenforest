import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Curriculum as CV } from './interfaces';

@Component({
  selector: 'app-curriculum',
  imports: [AvatarModule, TimelineModule, ButtonModule, CardModule],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss',
})
export class Curriculum {
  cv = signal<CV>({
    id: 1,
    perfil: {
      nombre: 'Mary Jane Watson',
      titulo: 'Desarrollador Fullstack',
      ubicacion: 'San Salvador, El Salvador',
      correo: 'maryjane_watson@email.com',
      telefono: '+50399887766',
      descripcion:
        ' Full Stack Developer apasionada por transformar ideas en productos digitales de alto impacto. Mi día a día se centra en construir interfaces de usuario fluidas y reactivas con Angular, combinadas con arquitecturas de backend sólidas y modulares en NestJS. Me enfoco en escribir código limpio, mantenible y cubierto por pruebas automatizadas. Disfruto trabajar en equipos ágiles, resolver problemas complejos y adaptarme rápidamente a nuevas tecnologías.',
    },
    experiencias: [
      {
        titulo: 'Desarrolladora Fullstack',
        empresa: 'Analiza',
        fecha: 'Junio 2024 - presente',
        descripcion:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      },
      {
        titulo: 'Desarrolladora Backend',
        empresa: 'Banco Cuscatlan',
        fecha: 'Junio 2022 - Junio 2024',
        descripcion:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      },
      {
        titulo: 'Desarrolladora Frontend',
        empresa: 'Diana',
        fecha: 'Enero 2021 - Junio 2022',
        descripcion:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      },
    ],
    educacion: [
      {
        titulo: 'Ingeniera Informática',
        institucion: 'Universidad Centroamericana José Simeón Cañas',
        fecha: 'Septiembre 2015 - Diciembre 2020',
      },
    ],
    habilidades: [
      {
        id: 1,
        nombre: 'TypeScript',
      },
      {
        id: 2,
        nombre: 'Angular',
      },
      {
        id: 3,
        nombre: 'PostgreSQL',
      },
      {
        id: 4,
        nombre: 'REST API',
      },
      {
        id: 5,
        nombre: 'Reactjs',
      },
    ],
    idiomas: [
      {
        id: 1,
        nombre: 'Español',
        nivel: 'Nativo',
      },
      {
        id: 2,
        nombre: 'Inglés',
        nivel: 'Avanzado',
      },
    ],
    pruebas: [
      {
        id: 1,
        nombre: 'Inglés',
        fecha: 'Enero 2026',
        score: 'Avanzado',
      },
    ],
  });
}
