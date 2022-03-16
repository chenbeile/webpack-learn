const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcpath, distpath } = require('./paths')
module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contenthash:8].js',
        path: distpath
    },
    module: {
        rules: [
            // 图片 -考虑base64编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        //小于5kb的图片用base64格式产出
                        // 否则， 依然延用 file-loader的形式，产出url
                        limit: 5*1024,
                        // 打包到img目录下
                        outputPath: '/img1/',
                        //设置图片的cdn地址（也可以统一在外面的outputpath）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            }
        ]
    }
})