import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=London&days=4&aqi=yes&alerts=yes`)
        console.log(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData();
  }, []);

  return (
    <>
      hhh

    </>
  )
}

export default App
