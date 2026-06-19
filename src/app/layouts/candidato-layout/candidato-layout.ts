import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'candidato-layout',
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen w-full">
      <router-outlet />
    </div>
  `,
})
export class CandidatoLayout {}
