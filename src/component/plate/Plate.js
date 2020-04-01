import React from 'react'

import './plate.css'


const Plate = ({ patchs, handleTouchStart, handleTouchMove, handleTouchEnd }) => {
    console.log('plate render')
    return (
        <div className='plate'>
            {
                patchs.map((patch, index) =>
                    <div key={index}
                        index={index}
                        sort={patch.sort}
                        className='patch'
                        style={patch.style}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {index}
                    </div>)
            }
        </div>
    )
}



export default Plate
