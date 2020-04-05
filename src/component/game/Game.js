import React, { useState, useEffect, useMemo } from 'react'
import GameUI from './GameUI'
import Mask from '../mask/Mask'


const plateWidth = 79.6, //减去碎片边框
    hide = 'hide'



export const
    FLAG_MIXTUS = -1,
    FLAG_INIT = 0,
    FLAG_SHOW = 1,
    FLAG_START = 2,
    FLAG_END = 10,
    FLAG_OVER_TIME = 11


// 关卡组
const levels = [
    {
        xnum: 2,
        ynum: 1,
        url: 'http://www.zhousb.cn/upload/jagsaw/1.jpg',
        seconds: 1000
    }, {
        xnum: 4,
        ynum: 4,
        url: 'http://www.zhousb.cn/upload/jagsaw/1.jpg',
        seconds: 25
    }
]


// 临时变量
var _flag = 0, _layerStyle,
    xstart, ystart,     // 点击开始位置
    layerPatch,
    patchsField,        // 碎片位置
    transDuration = 100 // 过渡时间

const Game = () => {

    console.log('game render')

    const [flag, setFlag] = useState(FLAG_INIT),
        [classes, setClasses] = useState(hide),
        [level, setLevel] = useState(1),
        [layerStyle, setLayerStyle] = useState(null),
        [patchs, setPatchs] = useState(null)

    // 选择关卡
    let { xnum, ynum, url, seconds } = levels[level - 1]




    function handleTouchStart(e) {

        const { target, changedTouches } = e
        
        // 未开始 || 只有一根手指
        if (FLAG_START !== _flag || 1 !== changedTouches.length) {
            return false
        }



        // 初始化碎片位置
        if (!patchsField) {
            patchsField = []
            for (var patch of target.parentNode.children) {
                let { top, left, width, height } = patch.getBoundingClientRect()
                patchsField.push({
                    top,
                    left,
                    width,
                    height
                })
            }
        }



        xstart = changedTouches[0].pageX
        ystart = changedTouches[0].pageY

        let { top, left, width, height } = target.getBoundingClientRect()
        let { backgroundImage, backgroundPosition } = target.style

        layerPatch = {
            sort: target.getAttribute('sort'),
            index: target.getAttribute('index'),
            style: _layerStyle = {
                top,
                left,
                width,
                height,
                backgroundImage,
                backgroundPosition,
            }
        }
        setLayerStyle(_layerStyle)
    }

    function handleTouchMove(e) {


        const { changedTouches } = e

        if (FLAG_START !== _flag || 1 !== changedTouches.length) {
            return false
        }

        let { pageX: xnow, pageY: ynow } = changedTouches[0]
        _layerStyle = copy(_layerStyle)
        _layerStyle.top = ynow - (ystart - layerPatch.style.top)
        _layerStyle.left = xnow - (xstart - layerPatch.style.left)
        setLayerStyle(_layerStyle)
    }

    function handleTouchEnd(e) {

        if (FLAG_START !== _flag) {
            return false
        }

        // 元素中间轴
        let { top: y, left: x } = _layerStyle
        x += _layerStyle.width / 2
        y += _layerStyle.height / 2


        // 移除浮层
        setLayerStyle(null)
        let newPatchs


        // 交换碎片
        for (var i = 0; i < patchsField.length; i++) {
            let patch = patchsField[i],
                { top, left } = patch,
                bottom = top + patch.height,
                right = left + patch.width

            if (left < x && right > x && top < y & bottom > y) {

                let index = parseInt(layerPatch.index)
                if (i === index) {
                    return
                }

                newPatchs = copy(patchs)


                newPatchs[index].style.backgroundPosition = newPatchs[i].style.backgroundPosition
                newPatchs[i].style.backgroundPosition = layerPatch.style.backgroundPosition

                newPatchs[index].sort = newPatchs[i].sort
                newPatchs[i].sort = parseInt(layerPatch.sort)

                setPatchs(newPatchs)
                break
            }
        }


        // 没有交换
        if (!newPatchs) {
            return
        }


        // 校验排序
        let sorted = 0
        for (let patch of newPatchs) {
            if (sorted !== patch.sort) {
                return
            }
            sorted++
        }

        // 通过
        if (level === levels.length) {
            console.log('通关')
            syncSetFlag(FLAG_END)
        } else {
            patchsField = null
            _flag = FLAG_MIXTUS
            transDuration = 1000
            setClasses(hide)
            setTimeout(() => {
                setLevel(1 + level)
                syncSetFlag(FLAG_INIT)
            }, transDuration)
        }

    }


    const overtime = () => {
        console.log('over time')
        setLayerStyle(null)
        syncSetFlag(FLAG_OVER_TIME)
    }

    function syncSetFlag(f) {
        setFlag(_flag = f)
    }


    useMemo(() => {
        if (FLAG_INIT === flag) {
            let sort = 0,
                tmpactchs = [],
                width = `${plateWidth / xnum}vw`, // 100 - 4个border
                height = `${plateWidth / ynum}vw`,
                backgroundImage = `url(${url})`

            Array(ynum).fill().map((yitem, y) =>
                Array(xnum).fill().map((xitem, x) => {
                    tmpactchs.push({
                        sort,
                        style: {
                            width,
                            height,
                            backgroundImage,
                            backgroundPosition: `${-x * plateWidth / xnum}vw ${-y * plateWidth / ynum}vw` // 80 - 0.4的border
                        }
                    })
                    return sort++
                })
            )

            setPatchs(tmpactchs)
            setTimeout(() => {
                setClasses('')
                syncSetFlag(FLAG_SHOW)
            }, transDuration)
        }
    }, [flag])


    const mask = useMemo(() =>
        flag === FLAG_SHOW && < Mask
            hideTime={3}
            hiddencb={() => {

                let tmpactchs = copy(patchs)
                shuffle(tmpactchs)
                setPatchs(tmpactchs)

                setTimeout(() => {
                    syncSetFlag(FLAG_START)
                }, 1000)

            }}
        />
        , [flag])

    useEffect(() => {

        // 阻止浏览默认
        document.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
    }, [])

    return (
        <>
            {mask}
            <GameUI
                level={level}
                levelNum={levels.length}
                flag={flag}
                classes={classes}

                seconds={seconds}
                overtime={overtime}
                patchs={patchs}

                layerStyle={layerStyle}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
            />
        </>
    )
}


function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}


function shuffle(arr) {
    let i = arr.length;
    while (--i) {
        let j = Math.floor(Math.random() * i);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}


export default Game
