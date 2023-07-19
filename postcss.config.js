const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer'),
    purgecss({
      content: ['./**/*.pug', './**/*.html']
    })
  ]
}