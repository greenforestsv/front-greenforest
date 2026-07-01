import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Link } from '../../interfaces/interfaces';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ButtonModule, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  menuOpen = false;

  headerLinks = signal<Link[]>([
    {
      id: 1,
      name: 'nav.home',
      route: '/',
    },
    {
      id: 2,
      name: 'nav.empleos',
      route: '/empleos',
    },
    {
      id: 3,
      name: 'nav.valor',
      route: '/quienes-somos',
    },
    {
      id: 4,
      name: 'nav.empresas',
      route: '/login-empresarial',
    },
    {
      id: 5,
      name: 'nav.candidatos',
      route: '/login-candidato',
    },
  ]);

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
    });
  }
}
