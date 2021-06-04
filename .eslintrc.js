module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['eslint:recommended'],
  rules: {
    indent: ['error', 2]
  },
  plugins: ['babel'],
  parser: 'babel-eslint'
};