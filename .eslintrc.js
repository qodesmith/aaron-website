module.exports = {
  'globals': {
    '_': true,
    'Backbone': true,
    'Handlebars': true,
    'app': true,
    '$body': true,
  },
  'env': {
    'browser': true,
    'jquery': true
  },
  'rules': {
    // POSSIBLE ERRORS
    'comma-dangle': [2, 'never'],
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-empty': [2, {allowEmptyCatch: true}],
    'no-extra-parens': 2,
    'no-extra-semi': 2,
    'no-sparse-arrays': 2,
    'no-unreachable': 2,

    // BEST PRACTICES
    'dot-notation': 2,
    'eqeqeq': 2,
    'no-redeclare': 2,
    'no-unused-expressions': [2, {'allowTernary': true}],
    'yoda': 2,

    // VARIABLES
    'no-shadow': 2,
    // 'no-undef': 2,
    // 'no-unused-vars': 2,

    // STYLISTIC
    'array-bracket-spacing': 2,
    'block-spacing': 2,
    'brace-style': [2, '1tbs', {'allowSingleLine': true}],
    'comma-spacing': 2,
    'comma-style': 2,
    'computed-property-spacing': 2,
    'consistent-this': [2, '_this'],
    'eol-last': 2,
    'func-style': [2, 'declaration', {'allowArrowFunctions': true}],
    'indent': [2, 2, { 'VariableDeclarator': 2 }],
    'key-spacing': 2,
    'keyword-spacing': 2,
    'lines-around-comment': 2,
    'max-len': [2, 100, {'ignoreComments': true}],
    'new-cap': 2,
    'new-parens': 2,
    'newline-per-chained-call': [2, {'ignoreChainWithDepth': 4}],
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-nested-ternary': 2,
    'no-spaced-func': 2,
    'no-trailing-spaces': [2, {'skipBlankLines': true}],
    'no-unneeded-ternary': 2,
    'object-curly-spacing': 2,
    'operator-assignment': 2,
    'operator-linebreak': [2, 'after', {'overrides': {'?': 'ignore', ':': 'ignore'}}],
    'quote-props': [2, 'as-needed'],
    'quotes': [2, 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
    'semi': [2, 'always', {'omitLastInOneLineBlock': true}],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': 2,
    'space-infix-ops': 2
  }
}