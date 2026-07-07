import { Component, inject, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Empresa } from '../../interfaces/empresa.interface';
import { EmpresasService } from '../../services/empresas.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-empresas',
  imports: [AvatarModule, SkeletonModule],
  templateUrl: './empresas.html',
  styleUrl: './empresas.scss',
})
export class Empresas {
  items = Array.from({ length: 9 });
  private empresasService = inject(EmpresasService);

  empresas = signal<Empresa[]>([]);
  loading = signal(true);

  constructor() {
    this.empresasService.getEmpresas().subscribe((empresas) => {
      this.empresas.set(empresas);
      this.loading.set(false);
    });
  }
}
