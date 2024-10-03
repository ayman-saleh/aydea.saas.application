import withBundleAnalyzer from '@next/bundle-analyzer'

import { withSaasUIPro } from './saas-ui.config.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        // Fixes turbopack support with Next Auth
        // @see https://github.com/nextauthjs/next-auth/issues/11674
        'next/server.js': 'next/server',
        'next/navigation.js': 'next/navigation',
        'next/headers.js': 'next/headers',
      },
    },
  },
}

export default withSaasUIPro(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })(nextConfig),
)
