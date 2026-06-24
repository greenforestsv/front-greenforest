import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seccion-ctas',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './seccion-ctas.html',
})
export class SeccionCtas {
  empresaCandidato = signal([
    {
      titulo: 'Impulsa tu organización con el talento adecuado.',
      subtitulo: 'Únete a empresas que toman decisiones más inteligentes y rápidas.',
    },
    {
      titulo: 'Tu próximo gran paso empieza aquí.',
      subtitulo: 'Crea tu perfil y accede a oportunidades que impulsan tu carrera.',
    },
  ]);
}
