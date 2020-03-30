const plugin = require('tailwindcss/plugin')
const spacing = require('./src/spacing')

module.exports = {
  theme: {
    extend: {
      height: {
        '92': '23rem',
        '120': '30rem'
      },
      boxShadow: {
        'neumorph-inset': 'var(--inset-shadow)',
        'neumorph-outset': 'var(--outset-shadow)'
      },
      colors: {
        'accent': 'var(--accent-color)',
        'muted': 'var(--muted-color)',
        'primary': 'var(--text-color)',
        'back': 'var(--bg-color)',
      },
      fill: {
        'accent': 'var(--accent-color)'
      },
    },
    stroke: theme => theme('colors')
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [
    plugin(spacing)
  ],
}
