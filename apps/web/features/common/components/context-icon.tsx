import { Icon, IconProps } from '@chakra-ui/react'
import * as React from 'react'
import { useColorMode } from '@chakra-ui/react'

export const ContextIcon = (props: IconProps) => {
    const { colorMode } = useColorMode()
    const fillColor = colorMode === 'dark' ? 'white' : 'black'

    return (
        <Icon fill="none" {...props}>
        <svg viewBox="0 0 152 154" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="34.9475" y="70.78" width="11.6491" height="11.6491" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 116.336 70.78)" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 104.647 70.78)" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 93.0764 70.78)" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 58.3628 70.78)" fill={fillColor} />
            <rect x="46.5967" y="82.4293" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="34.9475" y="94.0786" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="23.2983" y="105.728" width="11.6491" height="11.6491" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 104.687 82.4293)" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 116.336 94.0786)" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 127.985 105.728)" fill={fillColor} />
            <rect x="46.5967" y="59.1313" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="34.9475" y="47.4821" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="23.2983" y="35.8328" width="11.6491" height="11.6491" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 104.687 59.1313)" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 116.336 47.4821)" fill={fillColor} />
            <rect width="11.6491" height="11.6491" transform="matrix(-1 0 0 1 127.985 35.8328)" fill={fillColor} />
            <rect x="58.2458" y="70.78" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="69.8169" y="47.4041" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="69.856" y="129.9" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="69.8169" y="141.54" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="11.6492" y="70.78" width="11.6491" height="11.6491" transform="rotate(90 11.6492 70.78)" fill={fillColor} />
            <rect x="127.985" y="70.78" width="11.6491" height="11.6491" transform="rotate(90 127.985 70.78)" fill={fillColor} />
            <rect x="69.8169" y="35.7548" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="69.856" y="118.25" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="23.2983" y="70.78" width="11.6491" height="11.6491" transform="rotate(90 23.2983 70.78)" fill={fillColor} />
            <rect x="139.634" y="70.78" width="11.6491" height="11.6491" transform="rotate(90 139.634 70.78)" fill={fillColor} />
            <rect x="69.8169" y="24.1054" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="69.8169" y="12.5429" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="69.8169" y="0.971619" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="69.856" y="106.601" width="11.6491" height="11.6491" fill={fillColor} />
            <rect x="69.856" y="95.0001" width="11.5712" height="11.5712" fill={fillColor} />
            <rect x="34.9475" y="70.78" width="11.6491" height="11.6491" transform="rotate(90 34.9475 70.78)" fill={fillColor} />
            <rect x="151.283" y="70.78" width="11.6491" height="11.6491" transform="rotate(90 151.283 70.78)" fill={fillColor} />
        </svg>
        </Icon>
    )
}
