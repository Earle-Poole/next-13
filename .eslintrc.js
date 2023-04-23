module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // 'standard-with-typescript', // This rule is *VERY* strict. Use wisely.
    'prettier',
    'next',
  ],
  globals: {
    JSX: true,
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'comma-dangle': 'off',
    'no-unused-vars': 'warn',
  },
}
