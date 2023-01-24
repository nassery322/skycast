import React, {useState, useRef} from 'react';
import { weatherActions } from '../store/weather-slice';
import { useDispatch } from 'react-redux';
import './InputButton.css'
import Weather from './Weather';
const InputForm = (props) => {
    const [cityName, setCityName] = useState(null)
const cityRef = useRef()
    function submitHandler(event){
        event.preventDefault();
        if(cityRef.current.value.trim().length > 0){
            setCityName(cityRef.current.value)
            props.onClose(cityRef.current.value);
        }else{
            return;
        }
        
    }


  return (
    <form className="container">
        <div>
        
        <div className="group">      
          <input className='location-input' type="text" ref={cityRef} required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>City Name</label>
        </div>

        </div>
        <div>
        <button className='search-btn' onClick={submitHandler}><i class="fa-solid fa-magnifying-glass" ></i></button>
        </div>
       
    </form>
  );
}

export default InputForm;
