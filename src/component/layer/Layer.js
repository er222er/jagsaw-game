import React from 'react'
import './layer.css'


const Layer = (props) => {

    
    console.log('Layer render')

    return (
        <div className="layer" style={props.style}>LAYER</div>
    )

}


export default Layer