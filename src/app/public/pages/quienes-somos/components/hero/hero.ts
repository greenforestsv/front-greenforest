import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-hero',
  imports: [ButtonModule, RouterLink, AvatarModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
