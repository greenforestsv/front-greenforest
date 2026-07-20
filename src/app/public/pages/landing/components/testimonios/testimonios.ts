import { Component, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CarouselModule, AvatarModule],
  templateUrl: './testimonios.html',
})
export class TestimoniosComponent {
  testimonios = signal([
    {
      nombre: 'Valeria Gómez',
      puesto: 'Senior Fullstack Developer',
      comentario:
        'Gracias a esta plataforma encontré mi trabajo actual en menos de dos semanas. El proceso de postulación es sumamente ágil y transparente.',
      avatar: 'VG',
      empresa: 'Fintech Latam',
    },
    {
      nombre: 'Carlos Mendoza',
      puesto: 'UI/UX Designer',
      comentario:
        'La herramienta de filtrado por rango salarial y modalidad remota me ahorró muchísimo tiempo. Las ofertas publicadas son reales y de alto nivel.',
      avatar: 'CM',
      empresa: 'Pixel Studio',
    },
    {
      nombre: 'Alejandra Ruiz',
      puesto: 'Data Scientist',
      comentario:
        'Excelente experiencia. Me contactaron directamente los reclutadores a través del portal. Altamente recomendado si buscas dar un salto profesional.',
      avatar: 'AR',
      empresa: 'DataCore',
    } /* 
    {
      nombre: 'Martín Silva',
      puesto: 'DevOps Engineer',
      comentario:
        'El ecosistema y la interfaz son impecables. Postularse toma un solo clic y el seguimiento de los procesos es genial.',
      avatar: 'MS',
      empresa: 'CloudOps',
    }, */,
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
