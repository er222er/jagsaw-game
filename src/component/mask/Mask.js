import React, { useState, useEffect } from 'react'
import './mask.css'



const hideDuration = 1

var count,
    counter

const Mask = ({ hideTime, hiddencb }) => {

    console.log('mask render')

    const [time, setTime] = useState(),
        [style, setStyle] = useState()

    useEffect(() => {
        setTime(count = hideTime)
        counter = setInterval(() => {

            count -= 1

            if (0 >= count) {
                count = 'start'

                setTimeout(() => {
                    hiddencb()
                }, hideDuration * 1000)

                setStyle({
                    opacity: 0,
                    transition: `opacity ${hideDuration}s`
                })

                clearInterval(counter)
            }

            setTime(count)
        }, 1000)

    }, [hideTime, hiddencb])

    return (
        <div id='mask' style={style}>
            <div className='time'>{time}</div>
        </div>
    )
}

export default Mask