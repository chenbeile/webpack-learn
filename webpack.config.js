const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
console.log('process.env.NODE_ENV=', process.env.NODE_ENV)
const config = {
    mode: 'development',
    // entry: './src/index.js',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        // contentBase: path.resolve(__dirname, 'public'),
        compress: true, //是否启动压缩gzip
        port: 8080,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // 将各种资源引入html中
        }),
        new CleanWebpackPlugin() //清理之前打的包
    ]
}
module.exports = (env, argv) => {
    console.log('argv.mode=', argv.mode)
    return config
}