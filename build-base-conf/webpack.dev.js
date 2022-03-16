const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
const webpackCommonConf = require('./webpack.common.js')
// merge 的作用是在一个公用配置文件的基础下，添加额外配置
module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],
    // 启动本地服务，只能在dev环境下
    devServer: {
        port: 8080,
        progress: true, //显示打包的进度条
        contentBase: distPath, //根目录
        open: true,  //自动打开浏览器
        compress: true, //启动gzip压缩
        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到localhost:3000/api/xxx
            './api': 'http://localhost:3000',
            './api2': {
                target: 'http: localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }
})