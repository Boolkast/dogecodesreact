module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'eslint-disable no-underscore-dangle': 'off',
    'no-return-await': 'off',
    'consistent-return': 'off',
  },
};
