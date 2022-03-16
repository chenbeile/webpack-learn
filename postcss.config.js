module.exports = {
    plugins: [require('autoprefixer')({
        //这里需要设置浏览器版本，否则css3兼容不会生效
        overrideBrowserslist:[
            "defaults",
            "Android 4.1",
            "iOS 7.1",
            "Chrome>31",
            "ff>31",
            "ie>=8",
            "last 2 versions",
            ">0%"
        ]
    })]
}