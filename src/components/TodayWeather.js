import { Fragment, useEffect, useState } from 'react'
import './TodayWeather.css'
import skyblue from '../assets/cloud-sky-blue.jpg'
import { useSelector } from 'react-redux';
const TodayWeather = props =>{
    const [imageSrc, setImageSrc] = useState('')
    const [tempreture, setTempreture] = useState('')
    const [speedWind, setSpeedWind] = useState('');
    const [tempretureFormat , setTempretureFormat] = useState('')
    const [windSpeedFormat, setWindSpeedFormat] = useState('')
    const location = useSelector((state) => state.weather.location)
    const temp = useSelector((state) => state.weather.todayTemp)
    const humidity = useSelector((state) => state.weather.humidity)
    const windSpeed = useSelector((state) => state.weather.wind)
    const date = useSelector((state) => state.weather.date);
    const time = useSelector((state) => state.weather.time)
    const weather = useSelector((state) => state.weather.todayWeather);
    const measurement = useSelector((state) => state.weather.measurement);
        useEffect(()=>{
        if(measurement){
            setTempreture((temp * 9/5 + 32).toFixed())
            setTempretureFormat('F')
            setWindSpeedFormat('MPH')
            setSpeedWind(windSpeed)
            
        }else{
            setTempreture(temp)
            setSpeedWind((windSpeed * 1.609).toFixed(0))
            setWindSpeedFormat('KPH')
            setTempretureFormat('C')
        }
        if(weather){
           if(weather == 'clear'){
            setImageSrc('clear-day')
            return;
           }
           if(weather == 'clouds'){
            setImageSrc('cloudy')
            return;
           }else{
            setImageSrc(weather)
            return;
           }
           
           
        }

    }, [weather, measurement])
   
    return <Fragment>
        <div className='today-weather'>
          <div className='location'>{location}</div>
          <div className='date-time'>{date}&nbsp; &nbsp;{time && time}</div>
         <div className='weather-icon'><img src={`https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/line/svg/${imageSrc}.svg`}  /></div>
         <section className='weather-description'>
          <section className='section1'>
          <div className='weather-temp'>{tempreture}&deg;{tempretureFormat}</div>
          <div className='condition'>{weather}</div>
          </section>
         <section className='section2'>
          <div className='weather-humidity'><i class="fa-solid fa-droplet"></i> : {humidity}%</div>
          <div className='weather-wind-speed'><i class="fa-solid fa-wind"></i> : {speedWind}{windSpeedFormat}</div>
         </section>
         </section>
            
        
           </div>
        
    </Fragment>
}

export default TodayWeather;