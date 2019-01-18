module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'linebreak-style': 0,
    'no-shadow': 0,
    'no-confusing-arrow': 0,
    'no-return-await': 0,
    'function-paren-newline': 0,
    'max-len': 0,
    'consistent-return': 0,
    'prefer-destructuring': 0,
    'react/no-string-refs': 0,
  },
};
