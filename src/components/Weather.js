import React, { useEffect, useState } from 'react';
import { weatherActions } from '../store/weather-slice';
import {useDispatch, useSelector} from 'react-redux';

function Weather(props) {
  

const dispatch = useDispatch();
  
const success = (position) => {
}


async function fetchWeather(position){
 
  const API_KEY = '3f61f40a6098f78f8f572a5ea2fc22ec';
  const API_URL_CORDS = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=128&appid=${API_KEY}`;  
  const API_URL_CITY = `http://api.openweathermap.org/data/2.5/forecast?q=${props.input}&cnt=128&appid=${API_KEY}`;
  let API_URL
  if(props.input){
    if(props.input.length > 0){
      API_URL = API_URL_CITY;

    }

  }else{
    API_URL = API_URL_CORDS
  }

  const response = await fetch(API_URL)
 API_URL && props.isLoading(true) 

  const data = await response.json();

  let date = new Date();

const sunriseTimestamp = data.city.sunrise;
const sunsetTimestamp = data.city.sunset;
const timezone = data.city.timezone
const offset = date.getTimezoneOffset()
const sunriseDate = new Date(sunriseTimestamp * 1000 + offset * 60 * 1000 + timezone * 1000);
const sunsetDate = new Date(sunsetTimestamp * 1000 + offset * 60 * 1000 + timezone * 1000);

const sunriseHour = sunriseDate.getHours()
const sunsetHour = sunsetDate.getHours()
const requestDate = `${date.toLocaleDateString('default', { month: 'long', day: 'numeric' })}`

  if(props.input){
    const time = data.city.timezone * 100  * 60

const offset = date.getTimezoneOffset() * 60 * 1000  ;

const currentTime = new Date(date.getTime()  + ( time  + offset ) );
let hours = currentTime.getHours()
let minutes = currentTime.getMinutes() 
let am_pm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
const requestTime = `${ hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} ${am_pm}`;
const currentTimeHour = currentTime.getHours()
dispatch(weatherActions.getTodayWeather({...data.list[0], date:requestDate, hour:currentTimeHour, sunset:sunsetHour, sunrise:sunriseHour}))
props.isLoading(false)

  }else{

let hours = date.getHours()
let minutes = date.getMinutes() 
let am_pm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
const requestTime = `${ hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} ${am_pm}`;
const currentTimeHour = date.getHours()
dispatch(weatherActions.getTodayWeather({...data.list[0], date:requestDate, hour:currentTimeHour, time:requestTime,  sunset:sunsetHour, sunrise:sunriseHour}));
props.isLoading(false)

  }

  dispatch(weatherActions.getUserLocation(data.city));
  dispatch(weatherActions.getForecastData([...data.list]))
props.isLoading(false)
 
}
  const checkPermission = async () => {
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'geolocation' });

      permission.onchange = function() {
        checkPermission();
      }
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
  }
  const getLocation = () => {navigator.geolocation.getCurrentPosition(fetchWeather)}

  useEffect(()=>{
   getLocation(fetchWeather()) 
  }, [props.input])

}

export default Weather;
