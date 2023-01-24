import { Fragment, useEffect, useState } from 'react'
import './HomePage.css'
import Options from './Options';
import TodayWeather from './TodayWeather';
import Weather from './Weather';
import CityFinder from './Weather';
import MyComponent from './Weather';
import { useSelector } from 'react-redux';
import cloudySky from '../assets/cloud-sky-blue.jpg'
import clearsky from '../assets/clearsky.jpg'
import darkSky from '../assets/darkskyclean.jpg'
import nightCloudy from '../assets/nightcloudy1.jpg'
import rainynight from '../assets/rainynight.jpg'
import snownight from '../assets/snowynight.jpg'
import thunderstorm from '../assets/thunderstorm.jpg'
import snowyday from '../assets/snowyday.jpg'
import rainyday from '../assets/rainyday.jpg'
import cloudyday from '../assets/cloudyday.jpg'
import Forecast from './Forecast';
import InputForm from './InputButton';
import LoadingSpinner from '../UI/LoadingSpinner';
const HomePage = props =>{
    const [style, setStyle] = useState();
    const [input, setInput] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const sunrise = useSelector((state) => state.weather.sunrise);
    const sunset = useSelector((state) => state.weather.sunset);
    const weatherCondition = useSelector( (state) => state.weather.todayWeather)
    const inputIsVisible = useSelector((state) => state.weather.cityInputDisplay);
    const currentHour = useSelector((state) => state.weather.hours);
    const darkMode = useSelector((state) => state.weather.darkMode)
    useEffect( () =>{
        document.getElementById('home-page').style.backgroundSize = '100vw';
        if(darkMode){
            setStyle({'background': 'black'});
            return;
        }
     if(currentHour > sunset || currentHour < sunrise){
        
        if(weatherCondition == 'clouds'){
            setStyle({ 'background' : `url(${nightCloudy})`})
            return;
        }
       if(weatherCondition == 'snow'){
        setStyle({ 'background' : `url(${snownight})`})
        return;
       }
       if(weatherCondition == 'rain'){
        setStyle({ 'background' : `url(${rainynight})`})
        return;
       }
       if(weatherCondition == 'thunderstorm'){
        setStyle({ 'background' : `url(${thunderstorm})`})
        return;
       }
       else{
        setStyle({ 'background' : `url(${darkSky})`})
        return;
       }
     }else{
        if(weatherCondition == 'clouds'){
            setStyle({ 'background' : `url(${cloudyday})`})
            return;
        }
       if(weatherCondition == 'snow'){
        setStyle({ 'background' : `url(${snowyday})`})
        return;
       }
    
       if(weatherCondition == 'rain'){
        setStyle({ 'background' : `url(${rainyday})`})
        return;
       }
       if(weatherCondition == 'thunderstorm'){
        setStyle({ 'background' : `url(${thunderstorm})`})
        return;
       }
       else{
        setStyle({ 'background' : `url(${clearsky})`})
        return;
       }
     }
     
       
    }, [sunrise, sunset, weatherCondition, inputIsVisible, currentHour, darkMode])
    function inputHandler(input){
setInput(input)
    }
    function loadingHandler(e){
        setIsLoading(e)
    }
    
    return <Fragment>
        <div className='home-page' id='home-page' style={style}>
            <Options onInput={inputHandler} onLocate={inputHandler} />
            {isLoading && <LoadingSpinner/>}
            <Weather isLoading={loadingHandler} input={input}/>
            <TodayWeather />
            <Forecast />
        </div>
    </Fragment>
}

export default HomePage;