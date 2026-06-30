import {
  provideBrowserGlobalErrorListeners,
  LOCALE_ID,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { AppTheme } from './themes/app.theme';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(), // Core HTTP Client provider
    MessageService,
    { provide: LOCALE_ID, useValue: 'es' },
    provideTranslateService({
      lang: 'es',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: AppTheme,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
      ripple: true,
    }),
  ],
};
