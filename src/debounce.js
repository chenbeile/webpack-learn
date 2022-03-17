/**
 * 
 * @param {Function} fn 
 * @param {Number} delay 延迟时间
 * @returns 
 */
function debounce(fn, delay = 500) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}