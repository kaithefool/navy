import stylistic from '@stylistic/eslint-plugin'
import ts from 'typescript-eslint'

export default [
  ...ts.configs.recommended,
  stylistic.configs.customize({
    'object-curly-newline': 'always',
    'function-paren-newline': 'consistent',
    'max-len': { code: 100, ignorePattern: true },
  }),
]
