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

  ngOnInit() {
    this.sidebarService.obtenerSidebar(1 /* TODO: uuid */).subscribe((data) => {
      this.usuario.set(data.user);
      this.links.set(data.links.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login-candidato']);
  }
}
