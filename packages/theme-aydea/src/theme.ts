import { extendTheme } from '@chakra-ui/react'
import { theme as proTheme } from '@saas-ui-pro/react'
import { theme as glassTheme } from '@saas-ui/theme-glass'

import { components } from './components'
import semanticTokens from './foundations/semantic-tokens'

export const theme = extendTheme(
  extendTheme(
    {
      colors: {
        neutral: {
          50: '#f0eeec',
          100: '#f0eeec',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      components,
      semanticTokens,
    },
    glassTheme,
  ),
  proTheme,
)
