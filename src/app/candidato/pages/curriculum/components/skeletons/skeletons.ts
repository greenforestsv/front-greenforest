import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app--curriculum-skeletons',
  imports: [SkeletonModule],
  templateUrl: './skeletons.html',
  styleUrl: './skeletons.scss',
})
export class Skeletons {}
