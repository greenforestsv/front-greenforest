import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-horizontal-stacked-bar',
  imports: [],
  templateUrl: './horizontal-stacked-bar.html',
  styleUrl: './horizontal-stacked-bar.scss',
})
export class HorizontalStackedBar {
  posicionPerfil = signal(72);

  estadisticas = signal({
    postulados: 120,
    entrevistados: 45,
    contratados: 12,
  });

  total = computed(
    () =>
      this.estadisticas().postulados +
      this.estadisticas().entrevistados +
      this.estadisticas().contratados,
  );

  postuladosPct = computed(() => (this.estadisticas().postulados / this.total()) * 100);

  entrevistadosPct = computed(() => (this.estadisticas().entrevistados / this.total()) * 100);

  contratadosPct = computed(() => (this.estadisticas().contratados / this.total()) * 100);
}
