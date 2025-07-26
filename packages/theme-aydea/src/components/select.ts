import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { Input as inputTheme } from '../../../core-theme/src/components'

export const selectTheme = defineStyleConfig({
  ...inputTheme,
  defaultProps: inputTheme.defaultProps,
  variants: {
    outline: defineStyle((props) => ({
      ...(inputTheme.variants?.outline(props) ?? {}),
    })),
    // Add fallback empty variants for flushed, filled, and unstyled
    flushed: defineStyle(() => ({})),
    filled: defineStyle(() => ({})),
    unstyled: {},
  },
  sizes: inputTheme.sizes,
})
