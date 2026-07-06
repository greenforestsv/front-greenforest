import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../auth/services/auth.service';
import { GreenForestLogo } from '../../components/green-forest-logo/green-forest-logo';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarService } from '../../services/platform-sidebar.service';
import { SidebarUser } from '../../interfaces/sidebar.interfaces';
import { Link } from '../../interfaces/interfaces';
import { TranslatePipe } from '@ngx-translate/core';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  standalone: true,
  selector: 'platform-layout',
  imports: [
    RouterOutlet,
    ButtonModule,
    DrawerModule,
    RouterLinkActive,
    RouterLink,
    AvatarModule,
    GreenForestLogo,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TooltipModule,
    TranslatePipe,
    BadgeModule,
    OverlayBadgeModule,
  ],
  templateUrl: './platform-layout.html',
  styleUrl: './platform-layout.scss',
})
export class PlatformLayout {
  drawerVisible = signal(false);
  sidebarVisible = signal(true);
  busqueda: string | undefined;

  private authService = inject(AuthService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);

  usuario = signal<SidebarUser | null>(null);
  links = signal<Link[] | []>([]);

  constructor() {
    const CANDIDATO = 1;
    const EMPRESA = 2;

    const rol = this.router.url.includes('candidato') ? CANDIDATO : EMPRESA; /* TODO: uuid */

    this.sidebarService.obtenerSidebar(rol).subscribe((data) => {
      this.usuario.set(data.user);
      /* FIXME: que venga ordenado del backend */
      this.links.set(data.links.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login-candidato']);
  }
}
