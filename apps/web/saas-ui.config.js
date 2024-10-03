import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import webpack from 'webpack'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const suiExists = fs.existsSync(
  path.join(dirname, '../../saas-ui/react/package.json'),
)

const SaasUIProWebpackPlugin = () => {
  return new webpack.NormalModuleReplacementPlugin(
    /@saas-ui-pro\/(react|billing|router|onboarding|feature-flags|kanban|kanban-.*|pro\/theme|pro-.*|theme-.*)$/,
    (resource) => {
      resource.request = resource.request + '/src'
    },
  )
}

const packagesAliases = {
  '@saas-ui-pro/react': '@saas-ui-pro/react/src',
  '@saas-ui-pro/billing': '@saas-ui-pro/billing/src',
  '@saas-ui-pro/router': '@saas-ui-pro/router/src',
  '@saas-ui-pro/onboarding': '@saas-ui-pro/onboarding/src',
  '@saas-ui-pro/feature-flags': '@saas-ui-pro/feature-flags/src',
  '@saas-ui-pro/kanban': '@saas-ui-pro/kanban/src',
  '@saas-ui-pro/kanban-core': '@saas-ui-pro/kanban-core/src',
  '@saas-ui-pro/pro/theme': '@saas-ui-pro/pro/src/theme',
  '@saas-ui-pro/theme-glass': '@saas-ui-pro/theme-glass/src',
}

export const withSaasUIPro = (nextConfig) => {
  if (!suiExists) {
    return nextConfig
  }

  return {
    ...nextConfig,
    experimental: {
      ...nextConfig.experimental,
      turbo: {
        ...nextConfig.experimental?.turbo,
        resolveAlias: {
          ...nextConfig.experimental?.turbo?.resolveAlias,
          ...packagesAliases,
        },
      },
    },
    webpack: (config, options) => {
      config.plugins.push(SaasUIProWebpackPlugin())

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}
