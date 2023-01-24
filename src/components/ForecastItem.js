import { Fragment, useEffect, useState } from 'react'
import './ForecastItem.css'
import { useSelector } from 'react-redux'

const ForecastItem = props =>{
    const [tempHigh, setTempHIgh] = useState('')
    const [tempLow , setTempLow] = useState('')
const [imageSrc, setImageSrc] = useState('')
const condition = props.weatherCondition
const measurement = useSelector((state) => state.weather.measurement);

    useEffect(() =>{
        if(measurement){
            setTempHIgh((props.tempHigh * 9/5 + 32).toFixed(0))
            setTempLow((props.tempLow * 9/5 + 32).toFixed(0))

            
        }else{
            setTempHIgh(props.tempHigh)
            setTempLow(props.tempLow)
            
        }
        if(condition){
            if(condition == 'clear'){
                setImageSrc('clear-day')
                return;
            }
            if(condition == 'clouds'){
                setImageSrc('cloudy')
                return;
            }else{
                setImageSrc(condition)
                return;
            }
        }
       
    }, [condition, measurement])
    
    return <Fragment>

        <section className='forecast-item'>
        <div className='forecast-day'>
            {props.dayName}
        </div>
        <div className='forecast-icon'>
            <img src={`https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/line/svg/${imageSrc}.svg`} />
        </div>
        <div className='forecast-condition'>
            {props.weatherCondition}
        </div>
        <section className='forecast-temp'>
            <div className='forecast-max-temp'>
                {tempHigh}&deg;
            </div>
            <div className='forecast-min-temp'>
                {tempLow}&deg;
            </div>
        </section>
        </section>
    </Fragment>
}

export default ForecastItem;