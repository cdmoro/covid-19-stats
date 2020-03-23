module.exports = {
  theme: {
    extend: {
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
      }
    }
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [],
}
