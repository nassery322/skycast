import { Fragment, useEffect, useState } from 'react'
import './Forecast.css'
import { useSelector } from 'react-redux'
import ForecastItem from './ForecastItem'

const Forecast = props =>{
const [forecast, setForecast] = useState();
    const forecastData = useSelector( (state) => state.weather.forecast)
    useEffect(  () =>{
    setForecast(forecastData);
    }, [forecastData])
    return <Fragment>
        <section className='forecast-section'>
            <div className='forecast-header'>5-day Forecast :</div>
            {forecast && forecast.map((item) => <ForecastItem dayName={item.dayName} tempHigh={item.tempHigh} tempLow={item.tempLow} weatherCondition={item.weatherCondition} /> )}
        </section>
    </Fragment>
}

export default Forecast;