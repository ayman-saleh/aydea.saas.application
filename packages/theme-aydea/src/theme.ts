import { extendTheme, ChakraTheme } from '@chakra-ui/react'

import colors from './foundations/colors'
import { fonts, fontSizes, fontWeights, textStyles } from './foundations/typography'
import sizes from './foundations/sizes'
import shadows from './foundations/shadows'
import semanticTokens from './foundations/semantic-tokens'
import components from './components'

export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  fontWeights,
  textStyles,
  sizes,
  components,
  shadows,
  semanticTokens,
}) as ChakraTheme
