module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jsdoc'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'newline-after-var': ['error', 'always'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'objectLiteralProperty',
        format: null,
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'default',
        modifiers: ['destructured'],
        format: null,
      },
      {
        selector: ['class', 'enum', 'interface'],
        format: ['PascalCase'],
      },
    ],
    'space-before-blocks': 'error',
    'jsdoc/require-param-type': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/require-returns': 0,
    'jsdoc/check-param-names': 0,
    'jsdoc/require-jsdoc': [
      'error',
      {
        checkConstructors: false,
        enableFixer: false,
        require: {
          ArrowFunctionExpression: true,
          FunctionDeclaration: true,
          MethodDefinition: true,
        },
      },
    ],
    'lines-between-class-members': ['error', 'always'],
    // "max-len": ["error", { "code": 70, "ignoreUrls": true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
    ],
    'prefer-template': 'error',
  },
}
