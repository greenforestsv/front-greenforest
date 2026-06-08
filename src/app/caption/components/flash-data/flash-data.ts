import { Component, input, InputSignal } from '@angular/core';
import { KFormatterPipe } from '../../../shared/pipes/k-formatter-pipe';

@Component({
  selector: 'app-flash-data',
  imports: [KFormatterPipe],
  templateUrl: './flash-data.html',
  styleUrl: './flash-data.scss',
})
export class FlashData {
  icon: InputSignal<string | undefined> = input.required()
  qty: InputSignal<number> = input(0)
  qtyStrgin: InputSignal<string> = input('')
  legend: InputSignal<string | undefined> = input.required()
}
