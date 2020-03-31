import React, { useState } from 'react'
import './jagsaw.css'

const Jagsaw = () => {
    var index = 0,       // 的索引
        xstart, ystart  // 点击开始位置

    const xnum = 3, ynum = 3
    const url = "http://www.zhousb.cn/upload/jagsaw/1.jpg"

    // 浮层样式
    const [layerStyle, setLayerStyle] = useState()

    function touchstart({ target, changedTouches }) {

        // 只有一根手指
        if (1 !== changedTouches.length) {
            return false
        }

        xstart = changedTouches[0].pageX
        ystart = changedTouches[0].pageY

        let { top, left, width, height } = target.getBoundingClientRect()


        const { backgroundImage, backgroundPosition, } = target.style
        setLayerStyle({
            top,
            left,
            width,
            height,
            backgroundImage,
            backgroundPosition,
        })
    }
    function touchMove({ target, changedTouches }) {
        if (1 !== changedTouches.length) {
            return false
        }
        let { pageX, pageY } = changedTouches
        if (layerStyle) {

        }
    }

    // console.log(layerStyle)
    return (
        <div className='plate'>
            {layerStyle && <div className="layer" style={layerStyle}>LAYER</div>}
            {
                Array(xnum).fill().map((xitem, x) =>
                    Array(ynum).fill().map((yitem, y) => {

                        let style = {
                            width: `${96 / xnum}%`, // 100 - 4个border
                            height: `${96 / ynum}%`,
                            backgroundImage: `url(${url})`,
                            backgroundPosition: `${-y * 79.6 / xnum}vw ${-x * 79.6 / ynum}vw` // 80 - 0.4的border
                        }

                        return (
                            <div key={++index}
                                className='patch'
                                style={style}
                                onTouchStart={touchstart}
                                onTouchMove={touchMove}
                            >
                                {index}
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default Jagsaw
