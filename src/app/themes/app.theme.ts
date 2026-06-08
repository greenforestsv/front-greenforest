import { definePreset } from '@primeuix/themes'
import { primary, surface, darkSurface } from './palette'
import Aura from '@primeuix/themes/aura'

export const AppTheme = definePreset(Aura, {
  semantic: {
    primary: primary,
    colorScheme: {
      light: {
        surface: surface,
        text: {
          color: '#0F2E23',
          secondary: '#f2f5f2'
        }
      },
      dark: {
        surface: darkSurface,
        text: {
          color: '#e2f0f4',
          secondary: '#9bbac7'
        }
      }
    }
  }
})
