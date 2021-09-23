module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4,
        multiline: {
          max: 4,
          allowFirstLine: true
        }
      }
    ],
    'brace-style': [
      'warn',
      'allman',
      {
        allowSingleLine: false
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: 'warn',
    'no-tabs': 'warn',
    semi: 'warn',
    curly: ['warn', 'all'],
    'space-before-function-paren': ['warn', 'never'],
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'object-property-newline': 'warn',
    'no-multi-spaces': 'warn',
    'comma-dangle': 'warn',
    quotes: 'warn',
    'no-unreachable': 'warn',
    'prefer-const': 'warn',
    'comma-spacing': 'warn',
    'padded-blocks': 'warn',
    'arrow-spacing': 'warn',
    'eol-last': 'warn',
    'no-unused-vars': 'warn',
    'array-bracket-spacing': 'warn',
    'space-in-parens': 'warn',
    'vue/no-unused-components': 'warn',
    'space-infix-ops': 'warn',
    'key-spacing': 'warn',
    'spaced-comment': 'warn',
    'object-curly-spacing': 'warn',
    'operator-linebreak': ['warn', 'before', { overrides: { '=': 'after' } }],
    camelcase: 'warn',
    'vue/order-in-components':
      [
        'warn',
        {
          order: [
            'name',
            'extends',
            'functional',
            'mixins',
            ['props', 'propsData'],
            'emits',
            'setup',
            'data',
            'computed',
            'methods',
            'LIFECYCLE_HOOKS',
            'ROUTER_GUARDS',
            'watch',
            'watchQuery',
            ['template', 'render'],
            ['components', 'directives', 'filters']
          ]
        }
      ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
