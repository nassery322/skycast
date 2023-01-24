import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
    name:'weather',
    initialState:{
        todayTemp: 0,
        humidity: null,
        wind:null,
        date:null,
        location:null,
        todayWeather:null,
        sunrise:null,
        sunset:null,
        time: null,
        forecast:null,
        cityInputDisplay:false,
        cityInput:'1',
        hours: null,
        measurement:false,
        darkMode:false    
    },
    reducers:{
        getTodayWeather(state, action){
           
            state.todayTemp = (action.payload.main.temp -272.15).toFixed(0)
            state.humidity = action.payload.main.humidity;
            state.wind = action.payload.wind.speed;
            state.date = action.payload.date;
            state.time = action.payload.time;
            state.todayWeather = action.payload.weather[0].main.toLowerCase();
            state.sunrise = action.payload.sunrise;
            state.sunset = action.payload.sunset;
            state.hours = action.payload.hour;

    },
    getUserLocation(state, action){
        state.location = action.payload.name
    },
    getForecastData(state, action){
        state.forecast = action.payload
        .reduce((acc, curr) => {
            const todayDate = new Date().toLocaleString('default', { weekday: 'long' });
            const date = new Date(curr.dt * 1000);
            let dayName = date.toLocaleString('default', { weekday: 'long' });
            if(dayName == todayDate){
            dayName = 'Today'    
            }
            const day = acc.find(item => item.dayName === dayName);
            if (!day) {
              acc.push({
                dayName,
                tempHigh: (curr.main.temp_max - 273.15).toFixed(0),
                tempLow: (curr.main.temp_min - 273.15).toFixed(0),
                weatherCondition: curr.weather[0].main.toLowerCase(),
                forecastData: []
              });
            
            }
            else {
              day.forecastData.push({
                time: date.toLocaleString('default', { hour: 'numeric', minute: 'numeric' }),
                temp: (curr.main.temp - 273.15).toFixed(0),
                weatherCondition: curr.weather[0].main.toLowerCase()
              });
              day.tempHigh = Math.max(day.tempHigh, (curr.main.temp_max - 273.15).toFixed(0));
              day.tempLow = Math.min(day.tempLow, (curr.
                main.temp_min - 273.15).toFixed(0));
}
if(acc.length > 5){
 return acc.slice(1);
}else{
  return acc;
}

}, []);
 },
 getCity(state, action){
    state.cityInput = action.payload
 },
 toggleInput(state, action){
    return {
        ...state,
        cityInputDisplay: !state.cityInputDisplay
      }
 },
 toggleMeasurments(state, action){
    state.measurement = !state.measurement
  },
  toggleDarkMode(state, action){
    state.darkMode = !state.darkMode
  }

}}) 

export const weatherActions = weatherSlice.actions
export default weatherSlice;
