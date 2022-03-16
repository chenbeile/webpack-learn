const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
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
            },
            // 抽离 css
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                        modules: true
                        }
                    },
                    { loader: 'postcss-loader' }
                ]
            },
            // 抽离 less  --> css
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                        modules: true
                        }
                    },
                    { loader: 'less-loader' },
                    { loader: 'postcss-loader' }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        }),
        // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contenthash:8].css'
        })
    ],
    optimization: {
        // 压缩css
        minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
        // 分割代码块
        splitChunks: {
            chunks: 'all',
            /**
             * initial 入口chunk，对于异步导入的文件不处理
             * async  异步chunk，只对异步导入的文件处理
             *  all 全部 chunk
             */
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk名称
                    priority: 1, // 权限更高，优先抽离，重要！！
                    test: /node_modules/,
                    minSize: 0, // 大小限制
                    minChunks: 1 // 最少复用过几次
                },
                // 公共模块
                common: {
                    name: 'common', // chunk 名称
                    priority: 0, // 优先级
                    minSize: 0, // 公共模块的大小限制
                    minChunks: 2 // 公共模块最少复用过几次
                }
            }
        }
    }
})