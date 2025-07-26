import { extendTheme } from '@chakra-ui/react'
import { theme as proTheme } from '@saas-ui-pro/react'
import { theme as glassTheme } from '../../core-theme/src'

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
      fonts: {
        heading: `'OffBit Trial', 'PP Neue Montreal', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
        body: `'PP Neue Montreal', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
        mono: `'OffBit Trial Dot', SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
        offbit: `'OffBit Trial', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
        offbit101: `'OffBit Trial 101', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
        offbitDot: `'OffBit Trial Dot', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
        mondwest: `'PP Mondwest', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
        neueBit: `'PP Neue Bit', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
      },
      components,
      semanticTokens,
    },
    glassTheme,
  ),
  proTheme,
)
