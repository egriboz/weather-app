import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('İstanbul')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`)
        setWeatherData(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = () => (e) => {
    setLocation(e.target.value)
    // console.log(e.target.value)
  }
  // console.log('weatherData', weatherData)
  return (
    <>
      <div>
        <h1>Weather App</h1>
        <div className='input-container'>
          <input
            type="text"
            value={location}
            // onChange={(e) => setLocation(e.target.value)}
            onChange={handleLocationChange()}
          />
        </div>
      </div>
      {/* <div>
        {weatherData && (
          <div>
            <h2>{weatherData.location.name}</h2>
            <h3>{weatherData.current.temp_c}°C</h3>
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
            <p>{weatherData.current.condition.text}</p>
          </div>
        )}
      </div> */}
      <div><h2>{location}</h2></div>
      <div className='grid-contanier'>

        {weatherData && weatherData.forecast.forecastday.map((day) => (
          <div className='grid-contanier__inner' key={day.date}>
            <h3>{day.date}</h3>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <p>{day.day.condition.text}</p>
            <p>{day.day.maxtemp_c}°C</p>
            <p>{day.day.mintemp_c}°C</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
