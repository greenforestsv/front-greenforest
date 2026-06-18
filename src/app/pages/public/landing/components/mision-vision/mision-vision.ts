import { Component, signal } from '@angular/core';

@Component({
  selector: 'mision-vision',
  standalone: true,
  imports: [],
  templateUrl: './mision-vision.html',
})
export class MisionVision {
  misionVision = signal([
    {
      titulo: 'Nuestra Misión',
      icono: 'pi-bullseye',
      descripcion:
        'Conectar talento con oportunidades y empoderar a las organizaciones para tomar mejores decisiones con tecnología ética, datos confiables y compromiso humano.',
    },
    {
      titulo: 'Nuestra Visión',
      icono: 'pi-eye',
      descripcion:
        'Ser la plataforma líder en Latinoamérica que transforma la gestión del talento mediante inteligencia artificial, evaluaciones objetivas y un historial laboral confiable.',
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
