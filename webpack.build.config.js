const merge = require('webpack-merge')
const baseWebpackConf = require('./webpack.base.config')

const buildWebpackConf = merge(baseWebpackConf, {
    mode: 'production',
    plugins: []
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConf)
})
