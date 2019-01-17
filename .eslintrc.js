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
    "linebreak-style": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "arrow-body-style": 0,
    "no-confusing-arrow": 0,  
  },
};
