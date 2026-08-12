import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-avatar',
  imports: [],
  templateUrl: './custom-avatar.html',
  styleUrl: './custom-avatar.scss',
})
export class CustomAvatar {
  src = input<string>();
  name = input.required<string>();
  size = input<string>();
  fontSize = input.required<string>();
}
