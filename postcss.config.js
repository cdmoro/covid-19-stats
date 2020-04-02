module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
            whitelist: ['data-theme'],
            whitelistPatternsChildren: [/frappe-chart/],
            content: [
                './src/**/*.tsx',
                './public/index.html'
            ],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        })
    ]
}