import React, {useState, useEffect} from "react";
import axios from 'axios'

const Weather = ({city}) => {

  const [weatherData, setWeatherData] = useState({})

  const getData = () => {
    const apiUrl =
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_KEY}&query=${city}`
    axios.get(apiUrl)
      .then( result => {
        setWeatherData(result.data)
      });
  }

  useEffect(getData, []);

  if(weatherData.current !== undefined){
    return(
      <div>
        <h2>Weather</h2>
        <p>Temp: {weatherData.current.temperature}</p>
        <img src={weatherData.current.weather_icons[0]} alt={'icon'}/>
        <p>Wind Speed: {weatherData.current.wind_speed} Wind Dir: {weatherData.current.wind_dir}</p>
      </div>
    )
   }
   else{
    return(
      <div>
        Weather Data...
      </div>
    )
   }
}


export default Weather