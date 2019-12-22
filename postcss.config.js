module.exports = {
    plugins: [
        require('autoprefixer')({browsers: [ 'last 3 version', 'ie>=8']}),
        // require('cssnano')
    ]
}