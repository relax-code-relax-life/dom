const TerserPlugin = require("terser-webpack-plugin");


const banner = '/*! http://wangwl.net */';

module.exports = {
    mode: 'production',
    // mode: 'development',
    entry: {
        index: './index.ts'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        library: 'relaxUtils',
        libraryTarget: 'umd',
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {format: {preamble: banner}}
            }),
        ]
    }
}