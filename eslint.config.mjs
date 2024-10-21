import ts from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default [
  ...ts.configs.recommended,
  stylistic.configs.customize({
    'object-curly-newline': { consistent: true },
    'function-paren-newline': 'consistent',
    'max-len': { code: 100 },
  }),
]
