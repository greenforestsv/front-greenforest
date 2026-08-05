import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `<div class="card">
    <div class="flex flex-col items-center gap-3 py-6">
      <i class="pi pi-inbox text-5xl text-gray-400"></i>
      <h3 class="text-lg font-semibold inter-font">Sin datos</h3>
      <p class="text-center text-gray-500">No hay registros para mostrar.</p>
    </div>
  </div>`,
})
export class EmptyState {}
