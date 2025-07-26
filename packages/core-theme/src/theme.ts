import { extendTheme, ChakraTheme } from '@chakra-ui/react'

import colors from './foundations/colors'
import { fonts, fontSizes, textStyles } from './foundations/typography'
import sizes from './foundations/sizes'
import shadows from './foundations/shadows'
import semanticTokens from './foundations/semantic-tokens'
import components from './components'

export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  textStyles,
  sizes,
  components,
  shadows,
  semanticTokens,
  styles: {
    global: {
      body: {
        bg: {
          default: 'alabaster.200', // Light mode
          _dark: 'gray.900',        // Dark mode
        },
      },
    }
  }
}) as ChakraTheme
