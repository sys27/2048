const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        https: false,
        hot: true,
        host: "0.0.0.0"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});