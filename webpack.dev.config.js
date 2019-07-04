const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConf = require('./webpack.base.config')

const devWebpackConf = merge(baseWebpackConf, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConf.externals.paths.dist,
        port: 8081,
        overlay: true
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })

    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConf)
})