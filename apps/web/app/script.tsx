'use client'

import { ColorModeScript } from '@chakra-ui/system'

export function Script(props: { colorMode?: 'light' | 'dark' | 'system' }) {
  return (
    <>
      <ColorModeScript initialColorMode={props.colorMode} type="cookie" />
    </>
  )
}
