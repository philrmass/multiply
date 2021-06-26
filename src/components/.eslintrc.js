module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'block-scoped-var': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': 'warn',
    'eqeqeq': ['error', 'smart'],
    'key-spacing': 'warn',
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'jsx-quotes': ['warn', 'prefer-single'],
    'linebreak-style': ['error', 'unix'],
    'no-confusing-arrow': 'error',
    'no-trailing-spaces': ['off'],
    'no-implicit-coercion': 'warn',
    'no-shadow': 'off',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'no-var': 'error',
    'object-curly-spacing': ['warn', 'always'],
    'prettier/prettier': 0,
    'quotes': ['warn', 'single', { 'avoidEscape': true }],
    'radix': ['warn', 'as-needed'],
    'semi': ['error', 'always'],
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
};
