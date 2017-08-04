module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    watch: true,
    module: {
        loaders: [{
                test: /\.scss$/,
                loader: "style!css!sass"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};