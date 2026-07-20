import { Component, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button [label]="buttonLabel()" (onClick)="toggleLanguage()" size="small"> </p-button>
  `,
})
export class LanguageSwitch {
  private translate = inject(TranslateService);

  currentLang = signal(this.translate.getCurrentLang() || 'es');

  buttonLabel = computed(() =>
    this.currentLang() === 'es'
      ? this.translate.instant('configuracion.en')
      : this.translate.instant('configuracion.es'),
  );

  toggleLanguage(): void {
    const nextLang = this.currentLang() === 'es' ? 'en' : 'es';

    this.translate.use(nextLang);
    this.currentLang.set(nextLang);
  }
}
