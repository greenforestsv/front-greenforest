import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  title: InputSignal<string> = input.required<string>()
  style: InputSignal<string | undefined> = input.required()
  icon: InputSignal<string> = input.required<string>()
  description: InputSignal<string> = input.required<string>()
  itemsAdvantage: InputSignal<string[] | undefined> = input.required()
  link: InputSignal<{title: string, route: string}> = input({title: '', route: '#'})
}
