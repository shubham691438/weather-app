import React,{useState,useEffect} from 'react'
import HomeCityCard from '../components/HomeCityCard'
import CurrentWeatherDetailCard from '../components/CurrentWeatherDetailCard'
import WeatherSummary from '../components/WeatherSummary'
import { useOutletContext } from 'react-router-dom'

const Home = () => {
    const city = useOutletContext()
    

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

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchWeatherData = async (city) => {
          try {
            const response = await fetch(`${backendUrl}/api/weather/latestWeather/${city}`);
            const data = await response.json();
            
            // Fetch current weather data
            setCurrMainCondition(data.mainCondition);
            setCurrHumidity(data.humidity);
            setCurrWindSpeed(data.windSpeed);
      
            // Convert temperature to the selected unit
            let fetchedTemperature = data.temperature;
            let fetchedFeelsLike = data.feelsLike;
      
            if(currUnit !== 'C') {
              fetchedTemperature = convertTemperature(data.temperature, 'C', currUnit);
              fetchedFeelsLike = convertTemperature(data.feelsLike, 'C', currUnit);
            }
      
            setCurrTemperature(fetchedTemperature);
            setCurrFeelsLike(fetchedFeelsLike);
            
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
      
        fetchWeatherData(city);
      }, [city, currUnit]); // Notice currUnit dependency here to fetch the temperature in the selected unit
      
  
      useEffect(() => {
        const fetchWeatherSummary = async () => {
          try {
            const response = await fetch(`${backendUrl}/api/weather/weatherSummary/${city}/${currDate.toISOString().split('T')[0]}`);
            const data = await response.json();
      
            if (data && data.message && data.message.includes('not found')) {
              return;
            }
      
            // Set weather summary data
            setAvgWindSpeed(data.avgWindSpeed);
            setAvgHumidity(data.avgHumidity);
            setDominantCondition(data.dominantCondition);
      
            // Convert temperature to the selected unit
            let avgTemp = data.avgTemperature;
            let minTemp = data.minTemperature;
            let maxTemp = data.maxTemperature;
      
            if(currUnit !== 'C') {
              avgTemp = convertTemperature(data.avgTemperature, 'C', currUnit);
              minTemp = convertTemperature(data.minTemperature, 'C', currUnit);
              maxTemp = convertTemperature(data.maxTemperature, 'C', currUnit);
            }
      
            setAvgTemperature(avgTemp);
            setMinTemperature(minTemp);
            setMaxTemperature(maxTemp);
            
          } catch (error) {
            console.error('Error fetching weather summary:', error);
          }
        };
      
        fetchWeatherSummary();
      }, [city, currDate, currUnit]); // Notice currUnit dependency here as well
      

  
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
    if(selectedUnit === 'Select Unit of Temp' || selectedUnit === currUnit) return;
  
    // Convert temperature to the selected unit
    setCurrTemperature(convertTemperature(currTemperature, currUnit, selectedUnit));
    setCurrFeelsLike(convertTemperature(currFeelsLike, currUnit, selectedUnit));
    setAvgTemperature(convertTemperature(avgTemperature, currUnit, selectedUnit));
    setMinTemperature(convertTemperature(minTemperature, currUnit, selectedUnit));
    setMaxTemperature(convertTemperature(maxTemperature, currUnit, selectedUnit));
  
    // Update the current unit
    setCurrUnit(selectedUnit);
  }
  

  
  return (
    <div className='max-w-3xl mx-auto'>
        <div >
        
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

export default Home