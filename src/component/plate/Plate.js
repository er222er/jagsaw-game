import React from 'react'

import './plate.css'


const Plate = ({ patchs, handleTouchStart, handleTouchMove, handleTouchEnd }) => {
    return (
        <div className='plate'>
            {
                patchs.map((patch, index) =>
                    <div key={index}
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
