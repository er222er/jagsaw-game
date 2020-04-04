import React, { useMemo } from 'react'
import Plate from '../plate/Plate'
import Layer from '../layer/Layer'
import Timer from '../timer/Timer'
import './game.css'

const GameUI = ({
    level, levelNum, flag, classes,
    seconds, overtime, patchs,
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
    />, [flag, seconds, overtime])

    return (
        <div className={`warp trans ${classes}`}>
            <div className='header'>
                <div className='level'>{level} / {levelNum}</div>
            </div>
            {plate}
            {layer}
            {timer}
        </div>
    )
}

export default GameUI