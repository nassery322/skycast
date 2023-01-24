import { Fragment, useState } from 'react'
import './Options.css'
import Weather from './Weather';
import { weatherActions } from '../store/weather-slice';
import { useDispatch, useSelector } from 'react-redux';
import InputForm from './InputButton';
const Options = props =>{
    const dispatch = useDispatch()
    const [inputIsVisible, setInputIsVisible] = useState(false)
    const measurement = useSelector((state) => state.weather.measurement)
function searchHandler(x){
    setInputIsVisible(e => !e)
    props.onInput(x)
}
function locateHandler(){
props.onLocate()
}
function toggleMeasurments(){
    dispatch(weatherActions.toggleMeasurments())
}
function toggleDarkMode(){
    dispatch(weatherActions.toggleDarkMode())
}
    return <Fragment>
        
        <section className='options-section'>
        <button onClick={toggleMeasurments}>{measurement? "F" : 'C'}&deg;</button>
        <br/>
        <button onClick={locateHandler}><i class="fa-solid fa-location-dot"></i></button>
        <button onClick={searchHandler}><i class="fa-solid fa-magnifying-glass" ></i></button>
        <button onClick={toggleDarkMode}><i class="fa-solid fa-circle-half-stroke"></i></button>
        </section>
        <section className='input-section'>
            {inputIsVisible && <InputForm onClose={searchHandler} />}
        </section>
        </Fragment>
}

export default Options;