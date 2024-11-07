module.exports = {
  root: true,
  env:  {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console':             process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger':            process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': [0],
    'no-multi-spaces':        'off',
    'key-spacing':            ['error', {
      align: {
        on: 'value',
      },
    }],
    '@typescript-eslint/no-empty-function': [0],
    'vuejs-accessibility/label-has-for':    [0],
    'import/no-cycle':                      [0],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
