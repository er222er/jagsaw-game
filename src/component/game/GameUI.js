import React, { useState, useMemo } from 'react'
import Plate from '../plate/Plate'
import Layer from '../layer/Layer'
import Timer from '../timer/Timer'
import './game.css'

const GameUI = ({ 
    level, levelNum,
    flag, seconds, overtime, patchs,
    layerStyle, handleTouchStart, handleTouchMove, handleTouchEnd }) => {

    console.log('gameui render')
    const plate = useMemo(() => {
        return (
            <Plate
                patchs={patchs}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
            />)
    }, [patchs])

    const layer = useMemo(() =>
        layerStyle && <Layer style={layerStyle} />
        , [layerStyle])

    const timer = useMemo(() => <Timer
        flag={flag}
        seconds={seconds}
        overtime={overtime}
    />, [flag])

    return (
        <>
            <div className='header'>
                <div className='level'>{level} / {levelNum}</div>
            </div>
            {plate}
            {layer}
            {timer}
        </>
    )


}

export default GameUI