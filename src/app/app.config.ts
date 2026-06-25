import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { AppTheme } from './themes/app.theme';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MessageService } from 'primeng/api';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    { provide: LOCALE_ID, useValue: 'es' },
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
