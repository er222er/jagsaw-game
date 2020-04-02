import React, { useState, useEffect } from 'react'
import './timer.css'


const gap = 100 // 间隔刷新

var count,
    conter

const Timer = ({ flag, seconds, overtime }) => {

    console.log('time render')
    let [time, setTime] = useState()

    function countDown() {
        setTime(count -= gap)
        if (0 >= count) {
            overtime()
            clearInterval(conter)
        }
    }


    useEffect(() => {
        count = seconds * 1000
        if (0 === flag) {
            setTime(count)
        } else if (1 === flag) {
            clearInterval(conter)
            conter = setInterval(countDown, gap)
        }
    }, [flag])

    return (
        <div className='timer'>
            <div className='line'
                style={1 !== flag ? {} :
                    { animationName: 'reduce', animationDuration: `${seconds}s` }}></div>
            <div className='time'>{(time / 1000).toFixed(1)}s</div>
        </div>
    )
}

export default Timer