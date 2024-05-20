module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
    'plugin:playwright/recommended',
  ],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'default', format: ['camelCase'] },
      { selector: 'enumMember', format: ['UPPER_CASE'] },
      { selector: ['class', 'interface', 'enum', 'typeAlias'], format: ['PascalCase'] },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    complexity: ['error', 10],
  },
  parserOptions: {
    project: ['./tsconfig.json'], // necessary for @typescript-eslint/recommended-type-checked
  },
  root: true,
};
