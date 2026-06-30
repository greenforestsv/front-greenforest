import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Link } from '../../interfaces/interfaces';
import { LanguageSwitch } from '../language-switch/language-switch';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ButtonModule, LanguageSwitch, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  menuOpen = false;

  headerLinks = signal<Link[]>([
    {
      name: 'nav.home',
      route: '/',
    },
    {
      name: 'nav.empleos',
      route: '/empleos',
    },
    {
      name: 'nav.valor',
      route: '/quienes-somos',
    },
    {
      name: 'nav.empresas',
      route: '/login-empresarial',
    },
    {
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
