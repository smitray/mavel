let join = require('path').join
let tailwindJS = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [
    require('tailwindcss')(tailwindJS),
    require('postcss-partial-import'),
    require('postcss-crip'),
    require('postcss-mixins'),
    require('postcss-advanced-variables'),
    require('postcss-short'),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': false
      }
    }),
    require('postcss-nested'),
    require('postcss-ref'),
    require('postcss-property-lookup'),
    require('postcss-utilities'),
    require('rucksack-css'),
    require('postcss-extend'),
    require('css-mqpacker'),
    require('postcss-media-minmax'),
    require('postcss-merge-rules')
  ]
}
