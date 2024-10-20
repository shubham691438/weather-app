import { useState,useEffect } from 'react'
import bgVideo from './assets/bgVideo.mp4'
import icon from './assets/icon.png'
import thermometerIcon from './assets/thermometer.png'
import windIcon from './assets/wind.png'
import humidityIcon from './assets/humidity.png'
import rainIcon from './assets/rain.png'
import './App.css'
import HomeCityCard from './components/homeCityCard'
import CurrentWeatherDetailCard from './components/CurrentWeatherDetailCard'
import WeatherSummary from './components/WeatherSummary'

function App() {
  const [city, setCity] = useState('bangalore');
  const [searchCity, setSearchCity] = useState('');

  const [currTemperature, setCurrTemperature] = useState(25);
  const [currWindSpeed, setCurrWindSpeed] = useState(12);
  const [currHumidity, setCurrHumidity] = useState(65);
  const [currFeelsLike, setCurrFeelsLike] = useState(25);
  const [currMainCondition, setCurrMainCondition] = useState("Rain");
  const [currUnit, setCurrUnit] = useState('C');

  const [avgTemperature, setAvgTemperature] = useState(25);
  const [minTemperature, setMinTemperature] = useState(15);
  const [maxTemperature, setMaxTemperature] = useState(30);
  const [avgWindSpeed, setAvgWindSpeed] = useState(12);
  const [avgHumidity, setAvgHumidity] = useState(65);
  const [dominantCondition, setDominantCondition] = useState('rain');
  const [currDate, setCurrDate] = useState(new Date());

  const handleChange = (e) => {
    e.preventDefault();
    setSearchCity(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchCity);
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchWeatherData = async (city) => {
      try {
        const response = await fetch(`${backendUrl}/api/weather/latestWeather/${city}`);
        const data = await response.json();
        setCurrTemperature(data.temperature);
        setCurrFeelsLike(data.feelsLike);
        setCurrMainCondition(data.mainCondition);
        setCurrHumidity(data.humidity);
        setCurrWindSpeed(data.windSpeed);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData(city);
  }, [city]);

  useEffect(() => {
    const fetchWeatherSummary = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/weather/weatherSummary/${city}/${currDate.toISOString().split('T')[0]}`);
        const data = await response.json();
        setAvgTemperature(data.avgTemperature);
        setMinTemperature(data.minTemperature);
        setMaxTemperature(data.maxTemperature);
        setAvgWindSpeed(data.avgWindSpeed);
        setAvgHumidity(data.avgHumidity);
        setDominantCondition(data.dominantCondition);
      } catch (error) {
        console.error('Error fetching weather summary:', error);
      }
    };

    fetchWeatherSummary();
  }, [city,currDate]); 

  function convertTemperature(value, fromUnit, toUnit) {
    let celsius;

    // Convert input temperature to Celsius
    if (fromUnit === 'C') {
        celsius = value; // No conversion needed
    } else if (fromUnit === 'F') {
        celsius = (value - 32) * (5 / 9); // Fahrenheit to Celsius
    } else if (fromUnit === 'K') {
        celsius = value - 273.15; // Kelvin to Celsius
    } else {
        throw new Error('Invalid fromUnit. Use "C", "F", or "K".');
    }

    // Convert Celsius to the desired unit
    if (toUnit === 'C') {
        return celsius; // Return Celsius
    } else if (toUnit === 'F') {
        return (celsius * (9 / 5)) + 32; // Celsius to Fahrenheit
    } else if (toUnit === 'K') {
        return celsius + 273.15; // Celsius to Kelvin
    } else {
        throw new Error('Invalid toUnit. Use "C", "F", or "K".');
    }
}

const handleUnitSelect = (e) => {
  e.preventDefault();
  const selectedUnit = e.target.value;
  if(selectedUnit === 'Select Unit of Temp'|| selectedUnit===currUnit) return;

  // Convert temperature to the selected unit
  setCurrTemperature(convertTemperature(currTemperature, currUnit, selectedUnit));
  setCurrFeelsLike(convertTemperature(currFeelsLike, currUnit, selectedUnit));
  setAvgTemperature(convertTemperature(avgTemperature, currUnit, selectedUnit));
  setMinTemperature(convertTemperature(minTemperature, currUnit, selectedUnit));
  setMaxTemperature(convertTemperature(maxTemperature, currUnit, selectedUnit));

  setCurrUnit(selectedUnit);
}

 
  return (
    <div>
       {/* Background Video */}
       <video autoPlay muted loop id="backgroundVideo">
          <source src={bgVideo} type="video/mp4" />
        </video>

      <div>
        <div class="flex max-w-md mx-auto items-center justify-center">
          <h1 class="text-white font-bold text-2xl">Weather Me</h1>
          <img src={icon} alt="" class="w-14 h-14" srcset="" />
        </div>

        
        
        <form
          class="flex max-w-md mx-auto items-center justify-center gap-2"
        >
          <input
            type="text"
            name="city"
            placeholder="Enter a city..."
            value={searchCity}
            onChange={handleChange}
            required
            class="py-2 px-3 w-full rounded-full bg-white text-black text-lg outline outline-2 backdrop-blur-lg ease-in-out duration-300 outline-white/70 focus:bg-white/20"
          />
          
          <button onClick={handleSearch} class=" p-2.5  font-black h-full text-2xl text-white bg-white/50  hover:bg-slate-200   rounded-full hover:border-sky-100">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
        </form> 
        
      </div>

      <div>
        
        <form class="max-w-[200px] mt-5">
            <select onChange={handleUnitSelect} id="countries" class="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>Select Unit of Temp</option>
              <option value="F">Fahrenheit</option>
              <option value="K">Kelvin</option>
              <option value="C">Celsius</option>
            </select>
          </form>

          <div className='flex justify-between mt-2'>
            <HomeCityCard currUnit={currUnit} city={city} currTemperature={currTemperature} currFeelsLike={currFeelsLike}/>
            <CurrentWeatherDetailCard currUnit={currUnit} city={city} currTemperature={currTemperature} currWindSpeed={currWindSpeed} currHumidity={currHumidity} currFeelsLike={currFeelsLike} currMainCondition={currMainCondition}/>
          </div>

      </div>
   
      <WeatherSummary currUnit={currUnit} city={city} avgTemperature={avgTemperature} minTemperature={minTemperature} maxTemperature={maxTemperature} avgWindSpeed={avgWindSpeed} avgHumidity={avgHumidity} dominantCondition={dominantCondition}/>
    
    </div>
    
  )
}

export default App
