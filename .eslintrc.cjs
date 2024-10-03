module.exports = {
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': [
      'warn',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'next/router',
            message: 'Please import from next/navigation instead.',
          },
        ],
      },
    ],
  },
  ignorePatterns: [
    '**/.next',
    '**/_next',
    '**/next.config.js',
    '**/next.config.mjs',
    '**/nextron.config.js',
    '**/generated',
    '**/*.generated.*',
    '**/dist',
    'apps/desktop/app',
  ],
}
