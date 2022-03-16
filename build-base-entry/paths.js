/**
 * @description: 常用文件夹路径
 */

//webpack的多入口配置
//1.dev文件入口处引入多个文件
// 2.prod文件输出处使用name变量，避免重名
// 3.公共文件引入htmlwebpackplugin，要配置多个，标识哪个页面引入哪个chunk
const path = require('path')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')

module.exports = {
    srcPath,
    distPath
}