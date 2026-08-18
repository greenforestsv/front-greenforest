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
import { SidebarUser } from '../../interfaces/sidebar.interfaces';
import { TranslatePipe } from '@ngx-translate/core';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MenuService } from '../../../core/services/menu.service';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { MenuResponse } from '../../../core/interfaces/menu.interfaces';
import { SkeletonModule } from 'primeng/skeleton';

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
    SkeletonModule,
  ],
  templateUrl: './platform-layout.html',
  styleUrl: './platform-layout.scss',
})
export class PlatformLayout {
  drawerVisible = signal(false);
  sidebarVisible = signal(true);
  busqueda: string | undefined;
  items = Array.from({ length: 8 });

  private authService = inject(AuthService);
  private menuService = inject(MenuService);
  private messageService = inject(MessageService);

  loading = signal(false);
  usuario = signal<SidebarUser | null>(null);
  links = signal<MenuResponse[] | []>([]);

  constructor() {
    this.usuario.set({ name: 'Perfil', avatarImage: '/images/profile.jpg' });
    this.load();
  }

  load() {
    const payload = this.authService.getTokenPayload();

    if (!payload) {
      this.loading.set(false);
      return;
    }

    const request$ = payload.tenant_id
      ? this.menuService.getTenantMenu()
      : this.menuService.getAspirantsMenu();

    request$.pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (res: MenuResponse[]) => {
        this.links.set(res);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al obtener rutas de menú',
          detail: err.error?.message ?? 'Ocurrió un error inesperado',
          life: 5000,
        });
      },
    });
  }

  logout(): void {
    this.drawerVisible.set(false);
    setTimeout(() => {
      this.authService.logout();
    }, 1_000);
  }
}
