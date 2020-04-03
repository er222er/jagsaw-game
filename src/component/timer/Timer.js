import React, { useState, useEffect } from 'react'
import { FLAG_START, FLAG_INIT } from '../game/Game'
import './timer.css'


const gap = 100 // 间隔刷新

var count,
    conter

const Timer = ({ flag, seconds, overtime }) => {

    console.log('time render')
    let [time, setTime] = useState(),
        [style, setStyle] = useState()

    useEffect(() => {
        count = seconds * 1000


        if (FLAG_INIT === flag) {
            setTime(count)
            setStyle({})
            return
        } else if (FLAG_START === flag) {
            clearInterval(conter)
            conter = setInterval(() => {
                setTime(count -= gap)
                if (0 >= count) {
                    overtime()
                    clearInterval(conter)
                }
            }, gap)
        }
        setStyle({
            animationName: 'reduce',
            animationDuration: `${seconds}s`
        })
    }, [flag, overtime, seconds])


    return (
        <div className='timer'>
            <div className='line' style={style}></div>
            <div className='time'>{(time / 1000).toFixed(1)}s</div>
        </div>
    )
}

export default Timer