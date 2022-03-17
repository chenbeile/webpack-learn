function insertImgElem(imgFile) {
    const img = new Image()
    img.src = imgFile
    document.body.appendChild(img)
}
import imgFile1 from './img/onePunchMan.png'
insertImgElem(imgFile1)
import imgFile2 from './img/cartoon.png'
insertImgElem(imgFile2)
import imgFile3 from './img/1.png'
insertImgElem(imgFile3)
import './style/style1.css'
import './style/style2.less'
// 引入第三方模块
import _ from 'lodash'
console.log(_.each)