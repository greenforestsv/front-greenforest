import { Component, signal } from '@angular/core';

@Component({
  selector: 'mision-vision',
  standalone: true,
  imports: [],
  templateUrl: './mision-vision.html',
  styleUrl: './mision-vision.css',
})
export class MisionVision {
  misionVision = signal([
    {
      titulo: 'Nuestra Misión',
      descripcion:
        'Transformar la forma en que empresas y profesionales se conectan en Centroamérica, construyendo una capa de confianza sobre el mercado laboral a través de datos verificados, evaluaciones objetivas y privacidad con control.',
    },
    {
      titulo: 'Nuestra Visión',
      descripcion:
        'Ser la plataforma líder en Latinoamérica que transforma la gestión del talento a través de inteligencia artificial, evaluaciones objetivas y un historial laboral confiable — donde el talento crece y las historias perduran.',
    },
  ]);

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
