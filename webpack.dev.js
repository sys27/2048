const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        hot: true,
        host: "0.0.0.0"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});