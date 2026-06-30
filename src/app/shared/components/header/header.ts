import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Link } from '../../interfaces/interfaces';
import { LanguageSwitch } from '../language-switch/language-switch';
import { TranslatePipe } from '@ngx-translate/core';

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
      name: 'NAV.HOME',
      route: '/',
    },
  ]);
}
