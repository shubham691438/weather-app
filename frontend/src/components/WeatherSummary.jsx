import React, { useState, useEffect } from 'react';
import thermometerIcon from '../assets/thermometer.png';
import windIcon from '../assets/wind.png';
import humidityIcon from '../assets/humidity.png';
import rainIcon from '../assets/rain.png';

const WeatherSummary = ({ city }) => {
  const [avgTemperature, setAvgTemperature] = useState(25);
  const [minTemperature, setMinTemperature] = useState(15);
  const [maxTemperature, setMaxTemperature] = useState(30);
  const [avgWindSpeed, setAvgWindSpeed] = useState(12);
  const [avgHumidity, setAvgHumidity] = useState(65);
  const [dominantCondition, setDominantCondition] = useState('rain');
  const [currDate, setCurrDate] = useState(new Date()); // You might not need this if you're just fetching current data

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
  }, [city, currDate, backendUrl]); // Add necessary dependencies

  return (
    <div className="flex justify-between bg-[#0198afb6] p-3 backdrop-blur-2xl ease-in-out duration-500 rounded-xl w-[800px] mt-5">
      <div className="flex flex-col">
        <p className="max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-white">
          Yesterday's Weather Report for {city}
        </p>
        <div id="left" className="mt-6 flex justify-center">
          <img className="w-12 h-12" src={rainIcon} alt="weather icon" />
          <div>
            <p className="font-bold text-4xl text-white">{dominantCondition}</p>
            <p className="font-semibold text-white">Dominant Condition</p>
          </div>
        </div>
      </div>

      <div id="right" className="w-1/2 flex-col space-y-2">
        {/* Temperature */}
        <div className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6">
          <img className="w-8 h-8" src={thermometerIcon} alt="temperature icon" />
          <div>
            <div className="flex justify-end">
              <span className="font-bold text-2xl text-right text-[#ff5a00]">{avgTemperature.toFixed(2)} °C</span>
              <div className="flex flex-col text-right ml-2">
                <span className="text-sm text-white">Min: {minTemperature.toFixed(2)} °C</span>
                <span className="text-sm text-white">Max: {maxTemperature.toFixed(2)} °C</span>
              </div>
            </div>
            <p className="text-sm text-white text-right">Average Temperature</p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6">
          <img className="w-8 h-8" src={windIcon} alt="wind icon" />
          <div>
            <p className="font-bold text-2xl text-right text-[#ff5a00]">{avgWindSpeed.toFixed(2)} m/s</p>
            <p className="text-sm text-white text-right">Average Wind</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex w-full justify-around items-center bg-white/30 rounded-lg p-1 gap-6">
          <img className="w-8 h-8" src={humidityIcon} alt="humidity icon" />
          <div>
            <p className="font-bold text-2xl text-right text-[#ff5a00]">{avgHumidity.toFixed(2)} %</p>
            <p className="text-sm text-white text-right">Average Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;
