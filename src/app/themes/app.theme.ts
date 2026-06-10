import { definePreset } from '@primeuix/themes';
import { primary, surface, darkSurface } from './palette';
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
    // Nueva paleta
    brand: {
      deep: '#0d2818',
      primary: '#1b4332',
      mid: '#2d6a4f',
      lite: '#52b788',
      pale: '#b7e4c7',
      mist: '#d8f3dc',
    },

    gold: {
      default: '#c9a84c',
      lite: '#e8d5a3',
    },

    neutral: {
      cream: '#f5f0e8',
      white: '#fafaf8',
      black: '#0a1a10',
      ink: '#1a1a1a',
    },
  },
});
