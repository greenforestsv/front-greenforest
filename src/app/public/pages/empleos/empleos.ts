import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Hero } from './components/hero/hero';
import { Busqueda } from './components/busqueda/busqueda';
import { CardList } from './components/card-list/card-list';
import { CardDetail } from './components/card-detail/card-detail';

@Component({
  selector: 'app-empleos',
  standalone: true,
  imports: [ButtonModule, AvatarModule, Hero, Busqueda, CardList, CardDetail],
  templateUrl: './empleos.html',
  styleUrl: './empleos.scss',
})
export class Empleos {}
