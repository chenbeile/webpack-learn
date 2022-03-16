const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./paths')
module.exports = {
    // webpack配置多入口，入口需要设置多个文件
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
            // 处理es6
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: srcPath,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // 单入口生成
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            tempalte: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 标识该页面要引用那些chunk（即上面的index和other）
            chunks: ['index'] // 只引用index.js
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            tempalte: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            // chunks 标识该页面要引用那些chunk（即上面的index和other）
            chunks: ['other'] // 只引用other.js
        })
    ]
}