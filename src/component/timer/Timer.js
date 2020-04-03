import React, { useState, useEffect } from 'react'
import { FLAG_INIT, FLAG_START } from '../game/Game'
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

        console.log(`time count ${flag}`)


        switch (flag) {
            case FLAG_INIT:

                setTime(count)
                setStyle({})
                return
            case FLAG_START:
                clearInterval(conter)
                conter = setInterval(() => {
                    setTime(count -= gap)
                    if (0 >= count) {
                        overtime()
                        clearInterval(conter)
                    }
                }, gap)
                setStyle({
                    animationName: 'reduce',
                    animationDuration: `${seconds}s`
                })
                return
            default:
                return
        }


    }, [flag, overtime, seconds])


    return (
        <div className='timer'>
            <div className='line' style={style}></div>
            <div className='time'>{(time / 1000).toFixed(1)}s</div>
        </div>
    )
}

export default Timer