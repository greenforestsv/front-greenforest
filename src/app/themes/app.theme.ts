import { definePreset } from '@primeuix/themes';
import { primary, forest, gold, neutral, surface, darkSurface } from './palette';
import Aura from '@primeuix/themes/aura';

export const AppTheme = definePreset(Aura, {
  semantic: {
    primary: primary,
    colorScheme: {
      light: {
        surface: surface,
        text: {
          color: primary[500],
          secondary: primary[100],
        },
      },
      dark: {
        surface: darkSurface,
        text: {
          color: '#e2f0f4',
          secondary: '#9bbac7',
        },
      },
    },

    forest,
    gold,
    neutral,
  },
});
