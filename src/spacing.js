module.exports = function ({ e, addUtilities, config }) {
    let newUtilities = {}
    const margins = config('theme.margin', {})

    for (const key in margins) {
        let sx = 'sx-'
        let sy = 'sy-'
        
        if (key.indexOf('-') === 0) {
            sx = '-sx'
            sy = '-sy'
        }
        
        sx = `.${e(`${sx}${key}`)} > * + *`
        sy = `.${e(`${sy}${key}`)} > * + *`
        let marginTop = margins[key]
        let marginLeft = margins[key]

        if (marginTop === 'auto') {
            continue
        }

        newUtilities[sx] = { marginLeft }
        newUtilities[sy] = { marginTop }
    }

    addUtilities(newUtilities, {
        variants: ['responsive']
    })
}