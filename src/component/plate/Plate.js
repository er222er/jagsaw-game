import React from 'react'

import './plate.css'



const Plate = ({ url, xnum, ynum, handleTouchStart, handleTouchMove }) => {
    var index = 0



    return (
        <div className='plate'>
            {
                Array(xnum).fill().map((xitem, x) =>
                    Array(ynum).fill().map((yitem, y) => {

                        let tempStyle = {
                            width: `${96 / xnum}%`, // 100 - 4个border
                            height: `${96 / ynum}%`,
                            backgroundImage: `url(${url})`,
                            backgroundPosition: `${-y * 79.6 / xnum}vw ${-x * 79.6 / ynum}vw` // 80 - 0.4的border
                        }

                        return (
                            <div key={++index}
                                className='patch'
                                style={tempStyle}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
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



export default Plate
