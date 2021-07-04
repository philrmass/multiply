module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es2021': true,
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
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'rules': {
    /*
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'block-scoped-var': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': 'warn',
    'curly': 'error',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'smart'],
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'key-spacing': 'warn',
    'linebreak-style': ['error', 'unix'],
    'no-irregular-whitespace': 'warn',
    'no-console': ['error', { allow: ['error']}],
    'no-else-return': 'warn',
    'no-eval': 'error',
    'no-extra-bind': 'warn',
    'no-implicit-coercion': 'warn',
    'no-implied-eval': 'error',
    'no-multi-spaces': 'warn',
    'no-redeclare' : 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-sequences': 'warn',
    'no-undef': 'warn',
    'no-unexpected-multiline': 'warn',
    'no-unused-vars': 'warn',
    'no-useless-return': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'prefer-const': 'error'
    'prefer-arrow-callback': [ 'error', { 'allowNamedFunctions': true } ],
    */
    'quotes': ['warn', 'single', { 'avoidEscape': true }],
    'react/prop-types': 'off',
    /*
    'require-await': 'error',
    'semi': ['error', 'always'],
    'space-before-blocks': 'warn',
    'strict': ['error', 'never'],
  */
  },
};
