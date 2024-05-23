import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')

  useEffect(() => {
    // Kullanıcının konumunu al ve varsayılan konumu güncelle
    const getLocation = async () => {
      try {
        // const response = await axios.get('https://ipapi.co/8.8.8.8/json/');
        const response = await axios.get('https://ipapi.co/json/');
        setLocation(response.data.city || 'İstanbul');
      } catch (error) {
        console.error('Konum bulunamadı:', error);
        setLocation('İstanbul'); // Varsayılan konum İstanbul olarak ayarlandı
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes`)

        setWeatherData(response.data)
        console.log("response", response)
      } catch (err) {
        console.error(err)
        console.log("error code", err.request.response.message)
      }
    }
    const timeout = setTimeout(() => {
      if (location) {
        fetchData();
      }
    }, 900);
    return () => {
      clearTimeout(timeout);
    };
  }, [location]);

  const handleLocationChange = () => (e) => {
    setLocation(e.target.value)
    // console.log(e.target.value)
  }
  // console.log('weatherData', weatherData)
  return (
    <>
      {weatherData && (
        <header className='flex p-10 bg-blue-50'>
          <div className='flex-1'>
            <h1 className='text-3xl font-bold'>{weatherData.location.name}</h1>
          </div>
          <div className='flex-2'>
            <input
              className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

              type="text"
              value={location}
              // onChange={(e) => setLocation(e.target.value)}
              onChange={handleLocationChange()}
            />
          </div>
        </header>
      )}
      {weatherData && (
        <section className='flex flex-col m-20'>

          <div className='w-auto m-auto text-center'>
            <h3 className='flex'><span className='text-8xl font-bold'>{weatherData.current.temp_c}</span><span className='text-xl'>°C</span></h3>
            <img className='m-auto' src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
            <p>{weatherData.current.condition.text}</p>
          </div>

        </section >

      )
      }
      {weatherData && (
        <div className='text-center text-2xl mt-20 mb-5'>
          <h3>Weekly</h3>
        </div>
      )}
      <div className='grid grid-cols-weekly gap-2'>
        {weatherData && weatherData.forecast.forecastday.map((day) => {
          // Tarihi al
          const date = new Date(day.date);
          // Tarihi haftanın gün ismine dönüştür
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          return (
            <div className='bg-blue-50 flex flex-col items-center gap-2 p-8' key={day.date}>
              {/* Gün ismini ekle */}
              <h3>{dayName}</h3>
              {/* Geri kalan hava raporu bilgileri */}
              <img className='m-auto' src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>{day.day.condition.text}</p>
              <p>{day.day.maxtemp_c}°C</p>
              <p>{day.day.mintemp_c}°C</p>
            </div>
          );
        })}

      </div>
    </>
  )
}

export default App
