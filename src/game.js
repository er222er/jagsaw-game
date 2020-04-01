import React, { useState, useMemo } from 'react'
import Plate from './component/plate/Plate'
import Layer from './component/layer/Layer'


var xstart, ystart  // 点击开始位置
var _style

const Game = () => {

    console.log('game render')

    const xnum = 3, ynum = 3
    const url = "http://www.zhousb.cn/upload/jagsaw/1.jpg"

    const [style, setStyle] = useState(null)

    function handleTouchStart({ target, changedTouches }) {

        // 只有一根手指
        if (1 !== changedTouches.length) {
            return false
        }
        xstart = changedTouches[0].pageX
        ystart = changedTouches[0].pageY

        let { top, left, width, height } = target.getBoundingClientRect()
        const { backgroundImage, backgroundPosition } = target.style

        setStyle(_style = {
            top,
            left,
            width,
            height,
            backgroundImage,
            backgroundPosition,
        })
    }

    function handleTouchMove({ target, changedTouches }) {
        if (1 !== changedTouches.length) {
            return false
        }

        let { pageX: xnow, pageY: ynow } = changedTouches[0]
        let newStyle = copy(_style)
        newStyle.top = ynow - (ystart - _style.top)
        newStyle.left = xnow - (xstart - _style.left)
        setStyle(newStyle)
    }

    const plate = useMemo(() =>
        <Plate
            xnum={xnum}
            ynum={ynum}
            url={url}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
        />, [xnum, ynum, url])


    return (
        <>
            {plate}
            <Layer style={style} />
        </>
    )


}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}


export default Game