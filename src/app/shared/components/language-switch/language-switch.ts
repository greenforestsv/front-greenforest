import { Component, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button [label]="buttonLabel()" variant="text" (onClick)="toggleLanguage()"> </p-button>
  `,
})
export class LanguageSwitch {
  private translate = inject(TranslateService);

  currentLang = signal(this.translate.getCurrentLang() || 'es');

  buttonLabel = computed(() => (this.currentLang() === 'es' ? 'English' : 'Español'));

  toggleLanguage(): void {
    const nextLang = this.currentLang() === 'es' ? 'en' : 'es';

    this.translate.use(nextLang);
    this.currentLang.set(nextLang);
  }
}
