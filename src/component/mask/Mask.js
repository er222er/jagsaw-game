import React, { useState, useEffect } from 'react'
import './mask.css'


var count,
    counter

const Mask = ({ hideTime, hiddencb }) => {

    console.log('mask render')

    const [time, setTime] = useState(),
        [classes, setClasses] = useState()

    useEffect(() => {
        setTime(count = hideTime)
        counter = setInterval(() => {
            count -= 1
            if (0 >= count) {
                count = 'start'

                hiddencb()
                setClasses('hide')
                clearInterval(counter)
            }

            setTime(count)
        }, 1000)

    }, [hideTime, hiddencb])

    return (
        <div id='mask' className={`trans ${classes}`}>
            <div className='time'>{time}</div>
        </div>
    )
}

export default Mask