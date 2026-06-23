import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';

@Component({
  standalone: true,
  selector: 'platform-layout',
  imports: [RouterOutlet, ButtonModule, DrawerModule, RouterLinkActive, RouterLink, AvatarModule],
  templateUrl: './platform-layout.html',
  styleUrl: './platform-layout.scss',
})
export class PlatformLayout {
  drawerVisible = signal(false);
  sidebarVisible = signal(true);

  links = signal([
    {
      id: 1,
      icono: 'pi-home',
      nombre: 'Dashboard',
      ruta: '/candidato/dashboard',
    },
    {
      id: 2,
      icono: 'pi-id-card',
      nombre: 'Mi CV',
      ruta: '/candidato/curriculum',
    },
    {
      id: 3,
      icono: 'pi-send',
      nombre: 'Mis postulaciones',
      ruta: '/candidato/postulaciones',
    },
    {
      id: 4,
      icono: 'pi-heart',
      nombre: 'Mis favoritos',
      ruta: '/candidato/favoritos',
    },
  ]);

  usuario = signal({
    nombre: 'Juan Pérez',
    imagenAvatar: '',
  });

  logout() {}
}
