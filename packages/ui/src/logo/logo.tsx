import { Box, FlexProps, HTMLChakraProps } from '@chakra-ui/react'

import { AydeaIcon } from './aydea-icon'
import { AydeaLogo } from './aydea-logo'
import { AydeaText } from './aydea-text'

export const Logo = (props: FlexProps) => {
  return <Box as={AydeaLogo} width="160px" {...props} />
}

export const LogoIcon = (props: HTMLChakraProps<'svg'>) => {
  return <Box as={AydeaIcon} color="primary.500" {...props} />
}

export const LogoText = (props: HTMLChakraProps<'svg'>) => {
  return <Box as={AydeaText} color="primary.500" {...props} />
}