const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./paths')
module.exports = {
    entry: path.join(srcPath, 'index'),
    module: {
        rules: [
            // 处理es6
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: srcPath,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    // loader的执行顺序是从后往前
                    // [style-loader](/loaders/style-loader)
                    { loader: 'style-loader' },
                    // [css-loader](/loaders/css-loader)
                    {
                        loader: 'css-loader',
                        options: {
                        modules: true
                        }
                    },
                    // 浏览器兼容的处理
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // [style-loader](/loaders/style-loader)
                    { loader: 'style-loader' },
                    // [css-loader](/loaders/css-loader)
                    {
                        loader: 'css-loader',
                        options: {
                        modules: true
                        }
                    },
                    // [sass-loader](/loaders/sass-loader)
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}