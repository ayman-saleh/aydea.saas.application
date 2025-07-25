export const fonts = {
  heading: "'PP Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  body: "'PP Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
}

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.8125rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.125rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 600, // Maps to semibold since that's the heaviest weight available
}

export const textStyles = {
  h1: {
    fontSize: ['2xl', '3xl', '4xl'],
    fontWeight: '600',
    lineHeight: '1.2',
  },
  h2: {
    fontSize: ['xl', '2xl', '3xl'],
    fontWeight: '600',
    lineHeight: '1.3',
  },
  h3: {
    fontSize: ['lg', 'xl', '2xl'],
    fontWeight: '500',
    lineHeight: '1.4',
  },
  body: {
    fontSize: ['md', 'lg'],
    fontWeight: '400',
    lineHeight: '1.6',
  },
  caption: {
    fontSize: ['xs', 'sm'],
    fontWeight: '400',
    lineHeight: '1.5',
  },
}
