/**
 * @description: 常用文件夹路径
 */

//webpack的多入口配置
//1.dev文件入口处引入多个文件
// 2.prod文件输出处使用name变量，避免重名
// 3.公共文件引入htmlwebpackplugin，要配置多个，标识哪个页面引入哪个chunk
// 抽离压缩代码生产环境和测试环境不同，测试环境可以不用配置，但是生产环境要配置，css先浏览器兼容、解析css（不经过将解析的css放入html，区别于测试环境），再抽离到指定带有hash名的css文件中，然后经过两个插件压缩
const path = require('path')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')

module.exports = {
    srcPath,
    distPath
}