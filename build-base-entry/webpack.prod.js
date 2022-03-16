const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcpath, distpath } = require('./paths')
module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        // contenthash是为了能命中缓存，访问更快，如果js内容没改变，重新打包生成的文件不会更改hash值
        // filename: 'bundle.[contenthash:8].js',
        // webpack配置多入口，打包输出的文件名，需要接受变量，避免重名
        // name是入口设置的属性名，如index，other
        filename: '[name].[contenthash:8].js',
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
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        })
    ]
})